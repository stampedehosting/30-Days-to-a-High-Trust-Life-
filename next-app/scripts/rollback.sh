#!/bin/bash

# ROLLBACK SCRIPT
# 30 Days to High Trust Life - Restore from Backup
# Created: November 8, 2025

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
PROJECT_ROOT="/Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-"
BACKUP_ROOT="${PROJECT_ROOT}/backups"

echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${RED}║   ROLLBACK SCRIPT - RESTORE FROM BACKUP                  ║${NC}"
echo -e "${RED}╔════════════════════════════════════════════════════════════╗${NC}"
echo ""

# Check if backup ID provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Available backups:${NC}"
    echo ""
    
    if [ -f "${BACKUP_ROOT}/.backup_registry" ]; then
        cat -n "${BACKUP_ROOT}/.backup_registry"
        echo ""
        echo -e "${YELLOW}Usage: ./rollback.sh <backup_id>${NC}"
        echo -e "Example: ./rollback.sh 20251108_143022"
        echo ""
        echo -e "${BLUE}Or use 'latest' to restore the most recent backup:${NC}"
        echo -e "./rollback.sh latest"
    else
        echo -e "${RED}No backups found!${NC}"
        exit 1
    fi
    exit 0
fi

# Determine backup to restore
if [ "$1" == "latest" ]; then
    BACKUP_ID=$(tail -1 "${BACKUP_ROOT}/.backup_registry")
    echo -e "${BLUE}Restoring latest backup: ${BACKUP_ID}${NC}"
else
    BACKUP_ID="$1"
fi

BACKUP_DIR="${BACKUP_ROOT}/backup_${BACKUP_ID}"

# Verify backup exists
if [ ! -d "${BACKUP_DIR}" ]; then
    echo -e "${RED}Error: Backup not found!${NC}"
    echo -e "Looking for: ${BACKUP_DIR}"
    echo ""
    echo -e "${YELLOW}Available backups:${NC}"
    ls -1 "${BACKUP_ROOT}" | grep "backup_"
    exit 1
fi

# Display backup information
if [ -f "${BACKUP_DIR}/metadata/backup_info.txt" ]; then
    echo ""
    echo -e "${BLUE}Backup Information:${NC}"
    cat "${BACKUP_DIR}/metadata/backup_info.txt" | head -15
    echo ""
fi

# Confirmation prompt
echo -e "${YELLOW}⚠️  WARNING: This will restore files from the backup!${NC}"
echo -e "${YELLOW}   Current files will be overwritten.${NC}"
echo ""
read -p "Are you sure you want to proceed? (yes/no): " confirmation

if [ "$confirmation" != "yes" ]; then
    echo -e "${RED}Rollback cancelled.${NC}"
    exit 0
fi

echo ""
echo -e "${GREEN}Starting rollback...${NC}"
echo ""

# Create a safety backup of current state
SAFETY_BACKUP="${BACKUP_ROOT}/pre_rollback_${BACKUP_ID}_$(date +%Y%m%d_%H%M%S)"
mkdir -p "${SAFETY_BACKUP}"
echo -e "${BLUE}[Safety] Creating backup of current state...${NC}"
cp -R "${PROJECT_ROOT}/assets" "${SAFETY_BACKUP}/" 2>/dev/null
cp -R "${PROJECT_ROOT}/next-app/public/assets" "${SAFETY_BACKUP}/" 2>/dev/null
echo "      ✓ Safety backup created at: ${SAFETY_BACKUP}"
echo ""

# Restore assets directory
echo -e "${GREEN}[1/4] Restoring main assets directory...${NC}"
if [ -d "${BACKUP_DIR}/assets" ]; then
    rm -rf "${PROJECT_ROOT}/assets"
    cp -R "${BACKUP_DIR}/assets" "${PROJECT_ROOT}/"
    RESTORED_COUNT=$(find "${PROJECT_ROOT}/assets" -type f | wc -l | tr -d ' ')
    echo "      ✓ Restored ${RESTORED_COUNT} files"
else
    echo "      ⚠ No assets backup found, skipping"
fi

# Restore Next.js public assets
echo -e "${GREEN}[2/4] Restoring Next.js public assets...${NC}"
if [ -d "${BACKUP_DIR}/next-app/public/assets" ]; then
    rm -rf "${PROJECT_ROOT}/next-app/public/assets"
    mkdir -p "${PROJECT_ROOT}/next-app/public"
    cp -R "${BACKUP_DIR}/next-app/public/assets" "${PROJECT_ROOT}/next-app/public/"
    RESTORED_COUNT=$(find "${PROJECT_ROOT}/next-app/public/assets" -type f | wc -l | tr -d ' ')
    echo "      ✓ Restored ${RESTORED_COUNT} files"
else
    echo "      ⚠ No Next.js assets backup found, skipping"
fi

# Restore CSS files
echo -e "${GREEN}[3/4] Restoring CSS files...${NC}"
if [ -f "${BACKUP_DIR}/metadata/css_files.txt" ]; then
    CSS_RESTORED=0
    while IFS= read -r css_file; do
        backup_css="${BACKUP_DIR}/${css_file#${PROJECT_ROOT}/}"
        if [ -f "${backup_css}" ]; then
            cp "${backup_css}" "${css_file}"
            ((CSS_RESTORED++))
        fi
    done < "${BACKUP_DIR}/metadata/css_files.txt"
    echo "      ✓ Restored ${CSS_RESTORED} CSS files"
else
    echo "      ⚠ No CSS backup metadata found"
fi

# Restore JavaScript files
echo -e "${GREEN}[4/4] Restoring JavaScript bundles...${NC}"
if [ -f "${BACKUP_DIR}/metadata/js_files.txt" ]; then
    JS_RESTORED=0
    while IFS= read -r js_file; do
        backup_js="${BACKUP_DIR}/${js_file#${PROJECT_ROOT}/}"
        if [ -f "${backup_js}" ]; then
            cp "${backup_js}" "${js_file}"
            ((JS_RESTORED++))
        fi
    done < "${BACKUP_DIR}/metadata/js_files.txt"
    echo "      ✓ Restored ${JS_RESTORED} JavaScript files"
else
    echo "      ⚠ No JavaScript backup metadata found"
fi

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ ROLLBACK COMPLETED SUCCESSFULLY${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${GREEN}All files have been restored from backup:${NC}"
echo -e "  Backup ID: ${YELLOW}${BACKUP_ID}${NC}"
echo -e "  Backup Location: ${BACKUP_DIR}"
echo ""
echo -e "${BLUE}Safety backup of pre-rollback state saved at:${NC}"
echo -e "  ${SAFETY_BACKUP}"
echo ""
echo -e "${GREEN}Next steps:${NC}"
echo -e "  1. Verify the restoration by checking key files"
echo -e "  2. Test the application: npm run dev"
echo -e "  3. If issues persist, contact support"
echo ""
