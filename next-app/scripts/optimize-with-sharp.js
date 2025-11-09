const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

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

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const basename = path.basename(filePath, ext);
  const webpPath = path.join(dir, basename + '.webp');
  
  try {
    if (ext === '.png') {
      // Optimize PNG and create WebP
      await sharp(filePath)
        .png({ quality: 80, compressionLevel: 9, adaptiveFiltering: true })
        .toFile(filePath + '.tmp');
      
      // Replace original if smaller
      const originalSize = getFileSize(filePath);
      const optimizedSize = getFileSize(filePath + '.tmp');
      
      if (optimizedSize < originalSize && optimizedSize > 0) {
        fs.renameSync(filePath + '.tmp', filePath);
      } else {
        fs.unlinkSync(filePath + '.tmp');
      }
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      
      console.log(`    ✅ Created WebP version`);
      
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Optimize JPEG and create WebP
      await sharp(filePath)
        .jpeg({ quality: 80, progressive: true, optimizeScans: true })
        .toFile(filePath + '.tmp');
      
      // Replace original if smaller
      const originalSize = getFileSize(filePath);
      const optimizedSize = getFileSize(filePath + '.tmp');
      
      if (optimizedSize < originalSize && optimizedSize > 0) {
        fs.renameSync(filePath + '.tmp', filePath);
      } else {
        fs.unlinkSync(filePath + '.tmp');
      }
      
      // Create WebP version
      await sharp(filePath)
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);
      
      console.log(`    ✅ Optimized and created WebP version`);
    }
  } catch (error) {
    console.log(`    ⚠️  Error: ${error.message}`);
    // Clean up any temporary files
    try {
      if (fs.existsSync(filePath + '.tmp')) fs.unlinkSync(filePath + '.tmp');
    } catch {}
  }
}

async function main() {
  console.log('🖼️  Image Optimization with Sharp');
  console.log('===================================\n');
  
  let totalBefore = 0;
  let totalAfter = 0;
  let webpSaved = 0;
  
  console.log('🎨 Optimizing priority images...\n');
  
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
        
        await optimizeImage(imagePath);
        
        const sizeAfter = getFileSize(imagePath);
        const ext = path.extname(imagePath).toLowerCase();
        const webpPath = path.join(path.dirname(imagePath), path.basename(imagePath, ext) + '.webp');
        const webpSize = getFileSize(webpPath);
        
        totalAfter += sizeAfter;
        
        const savings = sizeBefore - sizeAfter;
        const savingsPercent = sizeBefore > 0 ? ((savings / sizeBefore) * 100).toFixed(1) : 0;
        
        console.log(`   Size after: ${formatBytes(sizeAfter)} (saved ${formatBytes(savings)} / ${savingsPercent}%)`);
        
        if (webpSize > 0) {
          const webpSavings = sizeBefore - webpSize;
          webpSaved += webpSavings;
          console.log(`   WebP size: ${formatBytes(webpSize)} (${formatBytes(webpSavings)} smaller than original)`);
        }
        
        console.log('');
      }
    }
  }
  
  console.log('\n📊 Summary');
  console.log('==========');
  console.log(`Original total: ${formatBytes(totalBefore)}`);
  console.log(`Optimized total: ${formatBytes(totalAfter)}`);
  console.log(`Direct savings: ${formatBytes(totalBefore - totalAfter)} (${((totalBefore - totalAfter) / totalBefore * 100).toFixed(1)}%)`);
  console.log(`WebP savings: ${formatBytes(webpSaved)} (${(webpSaved / totalBefore * 100).toFixed(1)}%)`);
  console.log('\n✅ Optimization complete!');
  console.log('\n💡 Next.js will automatically serve WebP images to supported browsers.');
}

main().catch(console.error);
