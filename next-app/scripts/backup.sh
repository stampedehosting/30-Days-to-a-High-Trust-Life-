#!/bin/bash

# BACKUP AND ROLLBACK PLAN
# 30 Days to High Trust Life - Mobile & Performance Fixes
# Created: November 8, 2025

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-"
BACKUP_ROOT="${PROJECT_ROOT}/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="${BACKUP_ROOT}/backup_${TIMESTAMP}"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   BACKUP SCRIPT - 30 Days to High Trust Life             ║${NC}"
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo ""
echo -e "${YELLOW}Creating comprehensive backup before making changes...${NC}"
echo ""

# Create backup directory structure
mkdir -p "${BACKUP_DIR}/assets"
mkdir -p "${BACKUP_DIR}/next-app/public/assets"
mkdir -p "${BACKUP_DIR}/metadata"

# Function to calculate directory size
calc_size() {
    du -sh "$1" 2>/dev/null | awk '{print $1}'
}

# Function to count files
count_files() {
    find "$1" -type f 2>/dev/null | wc -l | tr -d ' '
}

# 1. Backup Assets Directory
echo -e "${GREEN}[1/6] Backing up main assets directory...${NC}"
if [ -d "${PROJECT_ROOT}/assets" ]; then
    cp -R "${PROJECT_ROOT}/assets" "${BACKUP_DIR}/"
    ASSETS_SIZE=$(calc_size "${PROJECT_ROOT}/assets")
    ASSETS_COUNT=$(count_files "${PROJECT_ROOT}/assets")
    echo "      ✓ Backed up ${ASSETS_COUNT} files (${ASSETS_SIZE})"
else
    echo "      ⚠ Assets directory not found, skipping"
fi

# 2. Backup Next.js Public Assets
echo -e "${GREEN}[2/6] Backing up Next.js public assets...${NC}"
if [ -d "${PROJECT_ROOT}/next-app/public/assets" ]; then
    cp -R "${PROJECT_ROOT}/next-app/public/assets" "${BACKUP_DIR}/next-app/public/"
    NEXT_ASSETS_SIZE=$(calc_size "${PROJECT_ROOT}/next-app/public/assets")
    NEXT_ASSETS_COUNT=$(count_files "${PROJECT_ROOT}/next-app/public/assets")
    echo "      ✓ Backed up ${NEXT_ASSETS_COUNT} files (${NEXT_ASSETS_SIZE})"
else
    echo "      ⚠ Next.js assets directory not found, skipping"
fi

# 3. Backup CSS Files
echo -e "${GREEN}[3/6] Backing up CSS files...${NC}"
find "${PROJECT_ROOT}" -name "*.css" -type f > "${BACKUP_DIR}/metadata/css_files.txt"
while IFS= read -r css_file; do
    rel_path=$(echo "$css_file" | sed "s|${PROJECT_ROOT}/||")
    mkdir -p "${BACKUP_DIR}/$(dirname "$rel_path")"
    cp "$css_file" "${BACKUP_DIR}/${rel_path}"
done < "${BACKUP_DIR}/metadata/css_files.txt"
CSS_COUNT=$(wc -l < "${BACKUP_DIR}/metadata/css_files.txt" | tr -d ' ')
echo "      ✓ Backed up ${CSS_COUNT} CSS files"

# 4. Backup JavaScript Files (main bundles)
echo -e "${GREEN}[4/6] Backing up JavaScript bundles...${NC}"
find "${PROJECT_ROOT}/next-app/public/assets" -name "*.js" -type f 2>/dev/null > "${BACKUP_DIR}/metadata/js_files.txt"
while IFS= read -r js_file; do
    if [ -f "$js_file" ]; then
        rel_path=$(echo "$js_file" | sed "s|${PROJECT_ROOT}/||")
        mkdir -p "${BACKUP_DIR}/$(dirname "$rel_path")"
        cp "$js_file" "${BACKUP_DIR}/${rel_path}"
    fi
done < "${BACKUP_DIR}/metadata/js_files.txt"
JS_COUNT=$(wc -l < "${BACKUP_DIR}/metadata/js_files.txt" | tr -d ' ')
echo "      ✓ Backed up ${JS_COUNT} JavaScript files"

# 5. Create Metadata File
echo -e "${GREEN}[5/6] Creating backup metadata...${NC}"
cat > "${BACKUP_DIR}/metadata/backup_info.txt" << EOF
BACKUP INFORMATION
==================
Created: $(date '+%Y-%m-%d %H:%M:%S')
Hostname: $(hostname)
User: $(whoami)
Project: 30 Days to High Trust Life
Purpose: Pre-optimization backup (mobile iframe & image optimization)

BACKUP CONTENTS
===============
Assets Directory: ${ASSETS_COUNT} files (${ASSETS_SIZE})
Next.js Assets: ${NEXT_ASSETS_COUNT} files (${NEXT_ASSETS_SIZE})
CSS Files: ${CSS_COUNT} files
JavaScript Files: ${JS_COUNT} files

DIRECTORIES BACKED UP
=====================
- ${PROJECT_ROOT}/assets
- ${PROJECT_ROOT}/next-app/public/assets
- All CSS files
- All JavaScript bundles

RESTORE INSTRUCTIONS
====================
To restore this backup, run:
  ./rollback.sh ${TIMESTAMP}

Or manually:
  rsync -av "${BACKUP_DIR}/" "${PROJECT_ROOT}/"

VERIFICATION
============
Backup integrity can be verified with:
  ./verify-backup.sh ${TIMESTAMP}
EOF

# 6. Create file checksums for verification
echo -e "${GREEN}[6/6] Creating checksums for verification...${NC}"
if command -v md5 &> /dev/null; then
    find "${BACKUP_DIR}" -type f ! -path "*/metadata/*" -exec md5 {} \; > "${BACKUP_DIR}/metadata/checksums.txt"
    echo "      ✓ Created MD5 checksums"
elif command -v md5sum &> /dev/null; then
    find "${BACKUP_DIR}" -type f ! -path "*/metadata/*" -exec md5sum {} \; > "${BACKUP_DIR}/metadata/checksums.txt"
    echo "      ✓ Created MD5 checksums"
else
    echo "      ⚠ MD5 tool not available, skipping checksums"
fi

# Create file list
find "${BACKUP_DIR}" -type f > "${BACKUP_DIR}/metadata/file_list.txt"
TOTAL_FILES=$(wc -l < "${BACKUP_DIR}/metadata/file_list.txt" | tr -d ' ')

# Calculate total backup size
BACKUP_SIZE=$(calc_size "${BACKUP_DIR}")

# Save backup timestamp to registry
echo "${TIMESTAMP}" >> "${BACKUP_ROOT}/.backup_registry"

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ BACKUP COMPLETED SUCCESSFULLY${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Backup Location: ${YELLOW}${BACKUP_DIR}${NC}"
echo -e "Total Files:     ${YELLOW}${TOTAL_FILES}${NC}"
echo -e "Total Size:      ${YELLOW}${BACKUP_SIZE}${NC}"
echo -e "Backup ID:       ${YELLOW}${TIMESTAMP}${NC}"
echo ""
echo -e "${GREEN}Backup metadata saved to:${NC}"
echo -e "  - ${BACKUP_DIR}/metadata/backup_info.txt"
echo -e "  - ${BACKUP_DIR}/metadata/checksums.txt"
echo ""
echo -e "${YELLOW}To rollback these changes, run:${NC}"
echo -e "  ${BLUE}./rollback.sh ${TIMESTAMP}${NC}"
echo ""
echo -e "${GREEN}You can now safely proceed with optimizations!${NC}"
echo ""
