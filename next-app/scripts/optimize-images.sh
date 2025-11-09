#!/bin/bash

# Image Optimization Script for 30 Days to High Trust Life
# This script optimizes all images in the assets directory

echo "🖼️  Image Optimization Script"
echo "================================"
echo ""

# Define directories
SOURCE_DIR="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/assets"
NEXT_SOURCE_DIR="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/next-app/public/assets"
BACKUP_DIR="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/assets-backup-$(date +%Y%m%d_%H%M%S)"

echo "📂 Source directories:"
echo "   - $SOURCE_DIR"
echo "   - $NEXT_SOURCE_DIR"
echo ""
echo "💾 Backup directory: $BACKUP_DIR"
echo ""

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    echo "   Run: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed
if ! command -v cwebp &> /dev/null; then
    echo "❌ WebP tools not found. Installing..."
    echo "   Run: brew install webp"
    exit 1
fi

echo "✅ Required tools found"
echo ""

# Create backup
echo "📦 Creating backup..."
mkdir -p "$BACKUP_DIR"
cp -r "$SOURCE_DIR"/* "$BACKUP_DIR/" 2>/dev/null || true
echo "✅ Backup created at $BACKUP_DIR"
echo ""

# Function to optimize PNG
optimize_png() {
    local file="$1"
    local filename=$(basename "$file")
    local dir=$(dirname "$file")
    
    echo "  🔧 Optimizing PNG: $filename"
    
    # Create WebP version (80% quality)
    cwebp -q 80 "$file" -o "${file%.png}.webp" 2>/dev/null
    
    # Optimize PNG (keep original format as fallback)
    convert "$file" -strip -quality 85 -define png:compression-level=9 "${file%.png}-optimized.png"
    
    # Check if optimization worked
    original_size=$(stat -f%z "$file")
    optimized_size=$(stat -f%z "${file%.png}-optimized.png" 2>/dev/null || echo $original_size)
    
    if [ $optimized_size -lt $original_size ]; then
        mv "${file%.png}-optimized.png" "$file"
        echo "    ✅ Reduced from $(numfmt --to=iec $original_size) to $(numfmt --to=iec $optimized_size)"
    else
        rm "${file%.png}-optimized.png" 2>/dev/null || true
        echo "    ℹ️  Original was already optimized"
    fi
}

# Function to optimize JPG
optimize_jpg() {
    local file="$1"
    local filename=$(basename "$file")
    
    echo "  🔧 Optimizing JPG: $filename"
    
    # Create WebP version (80% quality)
    cwebp -q 80 "$file" -o "${file%.*}.webp" 2>/dev/null
    
    # Optimize JPG
    convert "$file" -strip -quality 80 -sampling-factor 4:2:0 -interlace JPEG "${file%.*}-optimized.jpg"
    
    # Check if optimization worked
    original_size=$(stat -f%z "$file")
    optimized_size=$(stat -f%z "${file%.*}-optimized.jpg" 2>/dev/null || echo $original_size)
    
    if [ $optimized_size -lt $original_size ]; then
        mv "${file%.*}-optimized.jpg" "$file"
        echo "    ✅ Reduced from $(numfmt --to=iec $original_size) to $(numfmt --to=iec $optimized_size)"
    else
        rm "${file%.*}-optimized.jpg" 2>/dev/null || true
        echo "    ℹ️  Original was already optimized"
    fi
}

# Optimize images in main assets directory
echo "🎨 Optimizing images in $SOURCE_DIR"
echo ""

if [ -d "$SOURCE_DIR" ]; then
    # Optimize PNGs
    for file in "$SOURCE_DIR"/*.png "$SOURCE_DIR"/*.PNG; do
        [ -f "$file" ] && optimize_png "$file"
    done
    
    # Optimize JPGs
    for file in "$SOURCE_DIR"/*.jpg "$SOURCE_DIR"/*.jpeg "$SOURCE_DIR"/*.JPG "$SOURCE_DIR"/*.JPEG; do
        [ -f "$file" ] && optimize_jpg "$file"
    done
fi

echo ""
echo "🎨 Optimizing images in $NEXT_SOURCE_DIR"
echo ""

if [ -d "$NEXT_SOURCE_DIR" ]; then
    # Optimize PNGs
    for file in "$NEXT_SOURCE_DIR"/*.png "$NEXT_SOURCE_DIR"/*.PNG; do
        [ -f "$file" ] && optimize_png "$file"
    done
    
    # Optimize JPGs
    for file in "$NEXT_SOURCE_DIR"/*.jpg "$NEXT_SOURCE_DIR"/*.jpeg "$NEXT_SOURCE_DIR"/*.JPG "$NEXT_SOURCE_DIR"/*.JPEG; do
        [ -f "$file" ] && optimize_jpg "$file"
    done
fi

echo ""
echo "📊 Size Comparison:"
echo "===================="
du -sh "$BACKUP_DIR" 2>/dev/null | awk '{print "Before: " $1}'
du -sh "$SOURCE_DIR" 2>/dev/null | awk '{print "After:  " $1}'

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📋 Next steps:"
echo "   1. Test images on the website"
echo "   2. If everything looks good, delete backup: rm -rf \"$BACKUP_DIR\""
echo "   3. If issues occur, restore: cp -r \"$BACKUP_DIR\"/* \"$SOURCE_DIR/\""
echo ""
