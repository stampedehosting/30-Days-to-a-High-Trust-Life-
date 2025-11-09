#!/bin/bash

# TEST BACKUP SYSTEM
# Quick test to verify backup/rollback functionality
# Created: November 8, 2025

echo "🧪 Testing Backup and Rollback System"
echo "======================================"
echo ""

cd "$(dirname "$0")"

# Test 1: Create a backup
echo "Test 1: Creating backup..."
./backup.sh > /tmp/backup_test.log 2>&1

if [ $? -eq 0 ]; then
    echo "✓ Backup script executed successfully"
    
    # Get the backup ID
    BACKUP_ID=$(tail -1 ../backups/.backup_registry 2>/dev/null)
    
    if [ -n "$BACKUP_ID" ]; then
        echo "✓ Backup ID created: $BACKUP_ID"
        
        # Test 2: Verify backup
        echo ""
        echo "Test 2: Verifying backup..."
        ./verify-backup.sh "$BACKUP_ID" > /tmp/verify_test.log 2>&1
        
        if [ $? -eq 0 ]; then
            echo "✓ Backup verification passed"
        else
            echo "✗ Backup verification failed"
            exit 1
        fi
        
        # Test 3: List backups
        echo ""
        echo "Test 3: Listing backups..."
        ./rollback.sh > /tmp/list_test.log 2>&1
        
        if [ $? -eq 0 ]; then
            echo "✓ Backup listing works"
        else
            echo "✗ Backup listing failed"
            exit 1
        fi
        
        echo ""
        echo "════════════════════════════════════════"
        echo "✅ All tests passed!"
        echo "════════════════════════════════════════"
        echo ""
        echo "Backup system is ready to use."
        echo ""
        echo "Next steps:"
        echo "  1. Create a backup before any changes: ./backup.sh"
        echo "  2. Make your changes"
        echo "  3. If needed, rollback: ./rollback.sh latest"
        echo ""
        echo "Test backup ID: $BACKUP_ID"
        echo "Test backup location: ../backups/backup_$BACKUP_ID"
        echo ""
        
    else
        echo "✗ Could not get backup ID"
        exit 1
    fi
else
    echo "✗ Backup script failed"
    cat /tmp/backup_test.log
    exit 1
fi
