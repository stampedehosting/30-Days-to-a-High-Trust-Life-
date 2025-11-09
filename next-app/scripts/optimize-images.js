const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Directories
const ASSETS_DIR = path.join(__dirname, '../../assets');
const NEXT_ASSETS_DIR = path.join(__dirname, '../public/assets');

// Large images that need optimization (>200KB)
const PRIORITY_IMAGES = [
  'hero-background-CYFwSckz.png',
  'IMG_7105-BK7fgHov.png',
  'IMG_7104-V4m_6yxO.png',
  'IMG_7106-BrzrhRbE.png',
  'IMG_7108-7aYzRO8c.png',
  'IMG_7107-CxA34MQM.png',
  'Becky-Norwood_AOL_Vol_6-DOIHTIiL.png',
  'BookCover-30HTL-TZ9u7x_i.png',
  'BenefitsPageImage-C1cmphw3.jpg',
  'PageSample-41RTk4qT.png',
  'high_trust_guy_3d_cartoon.png'
];

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(0) + 'KB';
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

async function optimizeWithSquoosh(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, ext);
  
  try {
    if (ext === '.png') {
      // Convert PNG to WebP
      await execPromise(`npx @squoosh/cli --webp '{"quality":80}' "${filePath}"`);
      console.log(`    ✅ Created WebP version`);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPG and create WebP
      await execPromise(`npx @squoosh/cli --mozjpeg '{"quality":80}' --webp '{"quality":80}' "${filePath}"`);
      console.log(`    ✅ Optimized and created WebP version`);
    }
  } catch (error) {
    console.log(`    ⚠️  Error: ${error.message}`);
  }
}

async function main() {
  console.log('🖼️  Image Optimization Script');
  console.log('================================\n');
  
  // Check if squoosh is available
  console.log('📦 Installing @squoosh/cli if needed...');
  try {
    await execPromise('npm list @squoosh/cli || npm install -g @squoosh/cli');
  } catch {
    console.log('⚠️  Could not install @squoosh/cli automatically');
    console.log('   Please run: npm install -g @squoosh/cli');
    process.exit(1);
  }
  
  let totalBefore = 0;
  let totalAfter = 0;
  
  console.log('\n🎨 Optimizing priority images...\n');
  
  for (const imageName of PRIORITY_IMAGES) {
    // Check both directories
    const paths = [
      path.join(ASSETS_DIR, imageName),
      path.join(NEXT_ASSETS_DIR, imageName)
    ];
    
    for (const imagePath of paths) {
      if (fs.existsSync(imagePath)) {
        const sizeBefore = getFileSize(imagePath);
        totalBefore += sizeBefore;
        
        console.log(`📷 ${imageName}`);
        console.log(`   Location: ${path.dirname(imagePath)}`);
        console.log(`   Size before: ${formatBytes(sizeBefore)}`);
        
        await optimizeWithSquoosh(imagePath);
        
        const sizeAfter = getFileSize(imagePath);
        totalAfter += sizeAfter;
        const savings = sizeBefore - sizeAfter;
        const savingsPercent = ((savings / sizeBefore) * 100).toFixed(1);
        
        if (savings > 0) {
          console.log(`   Size after: ${formatBytes(sizeAfter)} (saved ${formatBytes(savings)} / ${savingsPercent}%)`);
        }
        console.log('');
      }
    }
  }
  
  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Total before: ${formatBytes(totalBefore)}`);
  console.log(`Total after:  ${formatBytes(totalAfter)}`);
  console.log(`Total saved:  ${formatBytes(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
  console.log('\n✅ Optimization complete!');
}

main().catch(console.error);
