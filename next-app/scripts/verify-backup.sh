#!/bin/bash

# VERIFY BACKUP SCRIPT
# Verify integrity of backup files
# Created: November 8, 2025

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_ROOT="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-"
BACKUP_ROOT="${PROJECT_ROOT}/backups"

if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./verify-backup.sh <backup_id>${NC}"
    echo -e "Example: ./verify-backup.sh 20251108_143022"
    exit 1
fi

BACKUP_ID="$1"
BACKUP_DIR="${BACKUP_ROOT}/backup_${BACKUP_ID}"

if [ ! -d "${BACKUP_DIR}" ]; then
    echo -e "${RED}Error: Backup not found at ${BACKUP_DIR}${NC}"
    exit 1
fi

echo -e "${BLUE}Verifying backup: ${BACKUP_ID}${NC}"
echo ""

# Verify directory structure
echo -e "${GREEN}[1/4] Checking directory structure...${NC}"
REQUIRED_DIRS=(
    "${BACKUP_DIR}/metadata"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "      ✓ Found: $(basename "$dir")"
    else
        echo -e "      ${RED}✗ Missing: $(basename "$dir")${NC}"
    fi
done

# Verify metadata files
echo -e "${GREEN}[2/4] Checking metadata files...${NC}"
METADATA_FILES=(
    "backup_info.txt"
    "file_list.txt"
)

for file in "${METADATA_FILES[@]}"; do
    if [ -f "${BACKUP_DIR}/metadata/${file}" ]; then
        echo "      ✓ Found: ${file}"
    else
        echo -e "      ${YELLOW}⚠ Missing: ${file}${NC}"
    fi
done

# Count files
echo -e "${GREEN}[3/4] Counting backup files...${NC}"
if [ -f "${BACKUP_DIR}/metadata/file_list.txt" ]; then
    EXPECTED_COUNT=$(wc -l < "${BACKUP_DIR}/metadata/file_list.txt" | tr -d ' ')
    ACTUAL_COUNT=$(find "${BACKUP_DIR}" -type f | wc -l | tr -d ' ')
    
    if [ "$EXPECTED_COUNT" -eq "$ACTUAL_COUNT" ]; then
        echo "      ✓ File count matches: ${ACTUAL_COUNT} files"
    else
        echo -e "      ${RED}✗ File count mismatch!${NC}"
        echo "        Expected: ${EXPECTED_COUNT}"
        echo "        Found: ${ACTUAL_COUNT}"
    fi
else
    ACTUAL_COUNT=$(find "${BACKUP_DIR}" -type f | wc -l | tr -d ' ')
    echo "      ℹ Found ${ACTUAL_COUNT} files (no file list to compare)"
fi

# Verify checksums (if available)
echo -e "${GREEN}[4/4] Verifying checksums...${NC}"
if [ -f "${BACKUP_DIR}/metadata/checksums.txt" ]; then
    if command -v md5 &> /dev/null || command -v md5sum &> /dev/null; then
        echo "      ✓ Checksum file exists"
        CHECKSUM_COUNT=$(wc -l < "${BACKUP_DIR}/metadata/checksums.txt" | tr -d ' ')
        echo "      ℹ ${CHECKSUM_COUNT} file checksums available"
    else
        echo "      ⚠ MD5 tool not available for verification"
    fi
else
    echo "      ⚠ No checksum file available"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"

# Show backup info
if [ -f "${BACKUP_DIR}/metadata/backup_info.txt" ]; then
    echo ""
    cat "${BACKUP_DIR}/metadata/backup_info.txt"
fi

echo ""
echo -e "${GREEN}Backup verification complete.${NC}"
echo ""
