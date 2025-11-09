# BACKUP AND ROLLBACK PLAN
## 30 Days to High Trust Life - Safety Protocol

**Created:** November 8, 2025  
**Purpose:** Ensure safe implementation of mobile iframe and image optimization fixes

---

## 🎯 Overview

This plan provides a comprehensive safety net for all optimization work. Every change is backed up, versioned, and can be rolled back instantly if issues arise.

---

## 📋 Quick Reference

### Before Making Any Changes
```bash
cd /Users/j-nmb/current_projects/backup/30-Days-to-a-High-Trust-Life-/next-app/scripts
chmod +x backup.sh rollback.sh verify-backup.sh
./backup.sh
```

### If Something Goes Wrong
```bash
# Restore from most recent backup
./rollback.sh latest

# Or restore from specific backup
./rollback.sh 20251108_143022
```

### Verify Backup Integrity
```bash
./verify-backup.sh 20251108_143022
```

---

## 📁 What Gets Backed Up

### 1. Asset Files
- `/assets/*.{png,jpg,jpeg,webp}` - All images in main assets directory
- `/next-app/public/assets/*.{png,jpg,jpeg,webp}` - All Next.js public images

### 2. Code Files
- `/next-app/public/assets/*.css` - All CSS files
- `/next-app/public/assets/*.js` - All JavaScript bundles

### 3. Metadata
- File lists
- MD5 checksums
- Backup timestamps
- Directory structure

**Total Typical Backup Size:** ~50-100MB (before optimization)

---

## 🔧 Backup Script Usage

### Create a Backup

```bash
cd next-app/scripts
./backup.sh
```

**Output Example:**
```
╔════════════════════════════════════════════════════════════╗
║   BACKUP SCRIPT - 30 Days to High Trust Life             ║
╔════════════════════════════════════════════════════════════╗

Creating comprehensive backup before making changes...

[1/6] Backing up main assets directory...
      ✓ Backed up 45 files (8.2MB)
[2/6] Backing up Next.js public assets...
      ✓ Backed up 38 files (7.5MB)
[3/6] Backing up CSS files...
      ✓ Backed up 2 CSS files
[4/6] Backing up JavaScript bundles...
      ✓ Backed up 5 JavaScript files
[5/6] Creating backup metadata...
      ✓ Metadata created
[6/6] Creating checksums for verification...
      ✓ Created MD5 checksums

✓ BACKUP COMPLETED SUCCESSFULLY

Backup Location: /Users/.../backups/backup_20251108_143022
Total Files:     90
Total Size:      15.8MB
Backup ID:       20251108_143022

To rollback these changes, run:
  ./rollback.sh 20251108_143022
```

### What Happens During Backup

1. **Creates backup directory** with timestamp
2. **Copies all assets** to backup location
3. **Generates metadata** (file lists, sizes, counts)
4. **Creates checksums** for integrity verification
5. **Registers backup** in backup registry
6. **Displays summary** with rollback instructions

---

## ↩️ Rollback Script Usage

### List Available Backups

```bash
./rollback.sh
```

**Output:**
```
Available backups:

  1  20251108_143022
  2  20251108_145530
  3  20251108_150745

Usage: ./rollback.sh <backup_id>
Example: ./rollback.sh 20251108_143022

Or use 'latest' to restore the most recent backup:
./rollback.sh latest
```

### Restore from Backup

```bash
# Restore latest
./rollback.sh latest

# Or restore specific backup
./rollback.sh 20251108_143022
```

**Interactive Process:**
```
╔════════════════════════════════════════════════════════════╗
║   ROLLBACK SCRIPT - RESTORE FROM BACKUP                  ║
╔════════════════════════════════════════════════════════════╗

Restoring latest backup: 20251108_143022

Backup Information:
BACKUP INFORMATION
==================
Created: 2025-11-08 14:30:22
Purpose: Pre-optimization backup (mobile iframe & image optimization)
...

⚠️  WARNING: This will restore files from the backup!
   Current files will be overwritten.

Are you sure you want to proceed? (yes/no): yes

Starting rollback...

[Safety] Creating backup of current state...
      ✓ Safety backup created at: .../pre_rollback_20251108_143022_...

[1/4] Restoring main assets directory...
      ✓ Restored 45 files
[2/4] Restoring Next.js public assets...
      ✓ Restored 38 files
[3/4] Restoring CSS files...
      ✓ Restored 2 CSS files
[4/4] Restoring JavaScript bundles...
      ✓ Restored 5 JavaScript files

✓ ROLLBACK COMPLETED SUCCESSFULLY
```

### Safety Features

1. **Pre-rollback safety backup** - Current state is backed up before rollback
2. **Confirmation prompt** - Prevents accidental restoration
3. **Detailed logging** - Shows exactly what's being restored
4. **Non-destructive** - Original backup remains intact

---

## ✅ Verify Backup Integrity

```bash
./verify-backup.sh 20251108_143022
```

**Output:**
```
Verifying backup: 20251108_143022

[1/4] Checking directory structure...
      ✓ Found: metadata
[2/4] Checking metadata files...
      ✓ Found: backup_info.txt
      ✓ Found: file_list.txt
[3/4] Counting backup files...
      ✓ File count matches: 90 files
[4/4] Verifying checksums...
      ✓ Checksum file exists
      ℹ 90 file checksums available

✓ Backup verification complete.
```

---

## 🚨 Emergency Recovery Procedures

### Scenario 1: Optimized Images Look Wrong

**Problem:** Images appear blurry, colors are off, or quality is poor

**Solution:**
```bash
cd next-app/scripts
./rollback.sh latest
```

**Verify:**
```bash
# Check image sizes are back to original
ls -lh ../public/assets/*.png
```

---

### Scenario 2: Mobile Iframe Still Showing

**Problem:** Video still plays on mobile after CSS fix

**Solution:**
```bash
# Restore CSS file only
LATEST_BACKUP=$(tail -1 ../backups/.backup_registry)
cp "../backups/backup_${LATEST_BACKUP}/next-app/public/assets/index-CKK-Pm5d.css" \
   "../public/assets/index-CKK-Pm5d.css"
```

**Then reapply fix correctly**

---

### Scenario 3: Site Not Loading at All

**Problem:** White screen, errors in console, or 404s

**Solution:**
```bash
# Full rollback
./rollback.sh latest

# Restart dev server
cd ..
npm run dev
```

---

### Scenario 4: Need to Compare Current vs Backup

**Problem:** Want to see what changed

**Solution:**
```bash
LATEST_BACKUP=$(tail -1 ../backups/.backup_registry)
BACKUP_DIR="../backups/backup_${LATEST_BACKUP}"

# Compare specific file
diff "${BACKUP_DIR}/next-app/public/assets/index-CKK-Pm5d.css" \
     "../public/assets/index-CKK-Pm5d.css"

# Or compare directory
diff -r "${BACKUP_DIR}/assets" "../assets"
```

---

### Scenario 5: Accidental File Deletion

**Problem:** Accidentally deleted important file

**Solution:**
```bash
LATEST_BACKUP=$(tail -1 ../backups/.backup_registry)
BACKUP_DIR="../backups/backup_${LATEST_BACKUP}"

# Restore single file
cp "${BACKUP_DIR}/path/to/deleted/file.png" "../path/to/deleted/file.png"
```

---

## 📊 Backup Directory Structure

```
backups/
├── .backup_registry                    # List of all backup IDs
├── backup_20251108_143022/             # Individual backup
│   ├── assets/                         # Main assets backup
│   │   ├── hero-background-CYFwSckz.png
│   │   ├── IMG_7105-BK7fgHov.png
│   │   └── ...
│   ├── next-app/
│   │   └── public/
│   │       └── assets/                 # Next.js assets backup
│   │           ├── index-0QNlH1ZJ.js
│   │           ├── index-CKK-Pm5d.css
│   │           └── ...
│   └── metadata/
│       ├── backup_info.txt             # Backup details
│       ├── checksums.txt               # MD5 checksums
│       ├── file_list.txt               # All files in backup
│       ├── css_files.txt               # CSS file paths
│       └── js_files.txt                # JS file paths
└── backup_20251108_145530/             # Another backup
    └── ...
```

---

## 🔄 Step-by-Step Safe Optimization Process

### Phase 1: Initial Backup
```bash
cd next-app/scripts
./backup.sh
# Note the backup ID: 20251108_143022
```

### Phase 2: Make CSS Changes
```bash
# Apply mobile iframe fix
# Edit: next-app/public/assets/index-CKK-Pm5d.css
```

### Phase 3: Test Changes
```bash
cd ..
npm run dev
# Test on mobile (Chrome DevTools responsive mode)
```

### Phase 4a: If Changes Work ✅
```bash
# Create new backup of working state
cd scripts
./backup.sh
# Note new backup ID: 20251108_145530
```

### Phase 4b: If Changes Don't Work ❌
```bash
# Rollback to previous state
cd scripts
./rollback.sh 20251108_143022
```

### Phase 5: Optimize Images
```bash
# Create backup before image optimization
./backup.sh
# Note backup ID: 20251108_150745

# Run optimization
node optimize-images.js
```

### Phase 6: Test Image Optimization
```bash
cd ..
npm run dev
# Verify images load correctly
```

### Phase 7a: If Optimization Works ✅
```bash
# Keep current state, backup is safe in backups/
# Can delete old backups after 7 days if needed
```

### Phase 7b: If Optimization Fails ❌
```bash
cd scripts
./rollback.sh 20251108_150745
```

---

## 🗑️ Backup Maintenance

### List All Backups
```bash
ls -lh backups/
```

### Check Backup Sizes
```bash
du -sh backups/backup_*/
```

### Delete Old Backups (After Verification)
```bash
# Delete backups older than 7 days
find backups/ -name "backup_*" -type d -mtime +7 -exec rm -rf {} \;
```

### Keep Only Last 5 Backups
```bash
cd backups
ls -t | grep backup_ | tail -n +6 | xargs rm -rf
```

---

## ⚡ Quick Command Reference

| Action | Command |
|--------|---------|
| Create backup | `./backup.sh` |
| List backups | `./rollback.sh` |
| Restore latest | `./rollback.sh latest` |
| Restore specific | `./rollback.sh 20251108_143022` |
| Verify backup | `./verify-backup.sh 20251108_143022` |
| Check backup size | `du -sh backups/backup_*` |

---

## 📝 Backup Checklist

Before making changes:
- [ ] Run `./backup.sh`
- [ ] Note backup ID
- [ ] Verify backup completed successfully

After making changes:
- [ ] Test thoroughly in browser
- [ ] Test on mobile (responsive mode)
- [ ] Check console for errors
- [ ] Verify images load correctly
- [ ] Create new backup if changes work

If problems occur:
- [ ] Note the issue
- [ ] Run `./rollback.sh latest`
- [ ] Verify rollback worked
- [ ] Document what went wrong

---

## 🎓 Best Practices

1. **Always backup before making changes**
2. **Test changes thoroughly before creating a new backup**
3. **Keep at least 3-5 recent backups**
4. **Document why rollback was needed**
5. **Verify backup integrity after creation**
6. **Don't delete the most recent backup**
7. **Test rollback process before you need it**

---

## 📞 Support

If rollback fails or issues persist:

1. Check backup integrity: `./verify-backup.sh <backup_id>`
2. Try previous backup: `./rollback.sh <older_backup_id>`
3. Manual restore from `backups/` directory
4. Contact development team with backup ID and error messages

---

## ✅ Success Indicators

After rollback, verify:
- [ ] Site loads without errors
- [ ] Images display correctly
- [ ] Mobile view works properly
- [ ] No console errors
- [ ] File sizes match expectations

---

**Last Updated:** November 8, 2025  
**Version:** 1.0  
**Status:** Ready for use
