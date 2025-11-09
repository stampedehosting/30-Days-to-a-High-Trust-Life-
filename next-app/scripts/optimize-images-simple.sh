#!/bin/bash

# Simple Image Optimization using macOS built-in tools
# Optimizes large PNG and JPG images

echo "🖼️  Simple Image Optimization"
echo "=============================="
echo ""

# Directories
ASSETS_DIR="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/assets"
NEXT_ASSETS_DIR="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/next-app/public/assets"

# Counter
total_saved=0
files_optimized=0

echo "📸 Optimizing large images (>200KB)..."
echo ""

# Function to optimize a single file
optimize_image() {
    local file="$1"
    local filename=$(basename "$file")
    local size_before=$(stat -f%z "$file")
    
    if [ $size_before -gt 204800 ]; then  # > 200KB
        echo "📷 $filename"
        echo "   Size before: $(($size_before / 1024))KB"
        
        # For PNG: reduce quality to 80%
        if [[ "$file" == *.png ]]; then
            sips -s format jpeg -s formatOptions 80 "$file" --out "${file%.png}.jpg" > /dev/null 2>&1
            if [ -f "${file%.png}.jpg" ]; then
                size_after=$(stat -f%z "${file%.png}.jpg")
                if [ $size_after -lt $size_before ]; then
                    mv "${file%.png}.jpg" "$file.bak"
                    sips -s format png "$file" -s formatOptions best --out "$file.tmp" > /dev/null 2>&1
                    if [ -f "$file.tmp" ]; then
                        mv "$file.tmp" "$file"
                        size_after=$(stat -f%z "$file")
                        saved=$(($size_before - $size_after))
                        total_saved=$(($total_saved + $saved))
                        files_optimized=$(($files_optimized + 1))
                        echo "   Size after: $(($size_after / 1024))KB (saved $(($saved / 1024))KB)"
                    fi
                    rm -f "$file.bak"
                else
                    rm -f "${file%.png}.jpg"
                fi
            fi
        # For JPG: recompress at 80% quality
        elif [[ "$file" == *.jpg ]] || [[ "$file" == *.jpeg ]]; then
            cp "$file" "$file.bak"
            sips -s format jpeg -s formatOptions 80 "$file" --out "$file.tmp" > /dev/null 2>&1
            if [ -f "$file.tmp" ]; then
                mv "$file.tmp" "$file"
                size_after=$(stat -f%z "$file")
                saved=$(($size_before - $size_after))
                total_saved=$(($total_saved + $saved))
                files_optimized=$(($files_optimized + 1))
                echo "   Size after: $(($size_after / 1024))KB (saved $(($saved / 1024))KB)"
            fi
            rm -f "$file.bak"
        fi
        echo ""
    fi
}

# Process main assets directory
if [ -d "$ASSETS_DIR" ]; then
    for file in "$ASSETS_DIR"/*.{png,jpg,jpeg}; do
        [ -f "$file" ] && optimize_image "$file"
    done
fi

# Process Next.js assets directory
if [ -d "$NEXT_ASSETS_DIR" ]; then
    for file in "$NEXT_ASSETS_DIR"/*.{png,jpg,jpeg}; do
        [ -f "$file" ] && optimize_image "$file"
    done
fi

echo "📊 Summary"
echo "=========="
echo "Files optimized: $files_optimized"
echo "Total saved: $(($total_saved / 1024))KB"
echo ""
echo "✅ Optimization complete!"
