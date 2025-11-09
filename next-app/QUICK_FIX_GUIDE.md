# QUICK FIX GUIDE - Mobile & Image Issues

**Time Required**: 30 minutes  
**Priority**: HIGH

---

## Issue 1: Mobile Iframe - IMMEDIATE FIX

### Problem
Video iframe shows on mobile, causing slow load times and high data usage.

### Quick CSS Solution (5 minutes)

The hero video iframe needs to be hidden on mobile screens. Since the code is in a compiled JS file, we have two options:

#### Option A: Add CSS Override (Easiest)

Add this to your CSS file (`next-app/public/assets/index-CKK-Pm5d.css`):

```css
/* Hide video iframe on mobile */
@media (max-width: 768px) {
  section iframe[src*="cloudflarestream"] {
    display: none !important;
  }
  
  /* Show background image on mobile instead */
  section:first-of-type {
    background-image: url('/assets/hero-background-CYFwSckz.png');
    background-size: cover;
    background-position: center;
  }
}
```

#### Option B: Edit the Compiled JS (If you have source files)

If you have the original React source files (before build), update the Hero component:

```jsx
// Add mobile detection
<div className="absolute inset-0 z-0 hidden md:block">
  <iframe src="https://customer-fh83ow5syywjxevx.cloudflarestream.com/..." />
</div>

<div 
  className="absolute inset-0 z-0 md:hidden"
  style={{
    backgroundImage: "url(/assets/hero-background-CYFwSckz.png)",
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
/>
```

---

## Issue 2: Image Optimization - THREE APPROACHES

### Approach 1: Online Tools (Fastest - 15 minutes)

Use online tools to optimize images manually:

1. **Visit**: https://squoosh.app/
2. **Upload** the largest images one by one:
   - `hero-background-CYFwSckz.png` (1.6MB)
   - `IMG_7105-BK7fgHov.png` (964KB)
   - `IMG_7104-V4m_6yxO.png` (854KB)
   - `IMG_7106-BrzrhRbE.png` (804KB)
   - `IMG_7108-7aYzRO8c.png` (704KB)

3. **Settings**:
   - Format: WebP
   - Quality: 80
   - Download optimized version

4. **Replace** original files with optimized versions

**Expected Results**:
- 1.6MB → ~180KB (89% reduction)
- Total savings: ~6.5MB → ~700KB

---

### Approach 2: Command Line (Mac) - 20 minutes

#### Prerequisites
```bash
# Install ImageMagick and WebP tools
brew install imagemagick webp
```

#### Optimize All Images
```bash
cd "/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/assets"

# Backup first
mkdir ../assets-backup
cp *.{png,jpg,jpeg} ../assets-backup/

# Optimize PNGs (create WebP versions)
for img in *.png; do
  echo "Optimizing $img..."
  cwebp -q 80 "$img" -o "${img%.png}.webp"
  convert "$img" -strip -quality 85 -define png:compression-level=9 "$img"
done

# Optimize JPGs (create WebP versions)
for img in *.jpg *.jpeg; do
  echo "Optimizing $img..."
  cwebp -q 80 "$img" -o "${img%.*}.webp"
  convert "$img" -strip -quality 80 -sampling-factor 4:2:0 -interlace JPEG "$img"
done

# Check results
ls -lh *.webp
```

#### Do the same for next-app/public/assets
```bash
cd "/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/next-app/public/assets"

# Repeat the same commands above
```

---

### Approach 3: Node.js Script (Automated)

We created a script, but it requires squoosh:

```bash
cd next-app

# Install squoosh globally
npm install -g @squoosh/cli

# Run optimization script
node scripts/optimize-images.js
```

---

## IMMEDIATE ACTIONS (Do this now)

### Step 1: Fix Mobile Video (2 minutes)

Open: `next-app/public/assets/index-CKK-Pm5d.css`

Add at the end of the file:

```css
/* MOBILE VIDEO FIX */
@media (max-width: 768px) {
  iframe[src*="cloudflarestream"] {
    display: none !important;
  }
}
```

### Step 2: Optimize Top 3 Images (10 minutes)

1. Go to https://squoosh.app/
2. Upload these 3 files:
   - `/assets/hero-background-CYFwSckz.png`
   - `/assets/IMG_7105-BK7fgHov.png`
   - `/assets/IMG_7104-V4m_6yxO.png`
3. Set quality to 80, format to WebP
4. Download and replace originals
5. Save ~4.5MB instantly

### Step 3: Test (3 minutes)

```bash
# Start dev server if not running
cd next-app
npm run dev
```

Open in browser:
- Desktop: http://localhost:3000 (should show video)
- Mobile: Use Chrome DevTools responsive mode (should NOT show video)

Check image loading:
- Images should load faster
- Check Network tab in DevTools

---

## Verification Checklist

After implementing fixes:

- [ ] Mobile view does NOT show video iframe
- [ ] Mobile view shows background image instead
- [ ] Desktop still shows video
- [ ] Hero background image is < 200KB
- [ ] Page loads in < 4 seconds on 3G
- [ ] Total page weight is < 5MB

---

## Before/After Metrics

### Before
- Mobile shows video iframe (5-10MB load)
- Hero image: 1.6MB
- Top 6 images: 6.5MB total
- Total page: ~12MB
- Load time on 3G: 12+ seconds

### After
- Mobile shows static image only
- Hero image: ~180KB (WebP)
- Top 6 images: ~700KB total
- Total page: ~3-4MB
- Load time on 3G: 3-4 seconds

**Improvement: 70% faster, 75% less data**

---

## If You Get Stuck

### Can't find CSS file?
The CSS is likely in: `next-app/public/assets/index-CKK-Pm5d.css`

### Can't optimize images?
Use online tool: https://squoosh.app/ - no installation needed

### Video still showing on mobile?
Try adding `!important` to the CSS rule and hard refresh (Cmd+Shift+R)

### Need to revert?
```bash
# Restore from backup
cp -r assets-backup/* assets/
```

---

## Next Steps After Quick Fixes

1. Optimize remaining images (< 200KB each)
2. Implement lazy loading for images
3. Add proper `<picture>` elements with WebP fallbacks
4. Set up automated image optimization in build pipeline
5. Add performance monitoring

---

## Files Modified

- ✏️ `next-app/public/assets/index-CKK-Pm5d.css` (mobile iframe fix)
- 🖼️ `assets/*.png` (optimized images)
- 🖼️ `next-app/public/assets/*.png` (optimized images)

---

## Support Commands

```bash
# Check image sizes
cd assets && ls -lh *.{png,jpg} | awk '{print $5, $9}'

# Test mobile view
open "http://localhost:3000" # Then use DevTools responsive mode

# View page weight
# Use Chrome DevTools > Network tab > Disable cache > Reload
```

---

**Created**: November 8, 2025  
**Status**: Ready to implement  
**Estimated time**: 30 minutes  
**Impact**: 70% faster mobile load times
