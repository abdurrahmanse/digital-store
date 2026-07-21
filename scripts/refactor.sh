#!/bin/bash
set -e

echo "1. Deleting 0-byte files..."
find . -type f -size 0 -not -name "*.gitkeep" -not -path "*/node_modules*" -not -path "*/.next*" -not -path "*/.git*" -delete

echo "2. Cleaning up empty folders..."
find . -type d -empty -not -path "*/node_modules*" -not -path "*/.next*" -not -path "*/.git*" -delete

echo "3. Creating target directories..."
mkdir -p features/auth/actions
mkdir -p features/auth/validations
mkdir -p features/contact/actions
mkdir -p features/contact/validations
mkdir -p features/admin/actions

echo "4. Moving files..."
[ -f "actions/auth.ts" ] && mv actions/auth.ts features/auth/actions/
[ -f "actions/otp.ts" ] && mv actions/otp.ts features/auth/actions/
[ -f "actions/user.ts" ] && mv actions/user.ts features/auth/actions/
[ -f "validations/auth.ts" ] && mv validations/auth.ts features/auth/validations/

[ -f "actions/contact.ts" ] && mv actions/contact.ts features/contact/actions/
[ -f "actions/contact-dashboard.ts" ] && mv actions/contact-dashboard.ts features/contact/actions/
[ -f "validations/contact.ts" ] && mv validations/contact.ts features/contact/validations/

[ -f "actions/admin/customers.ts" ] && mv actions/admin/customers.ts features/admin/actions/
[ -f "actions/admin/orders.ts" ] && mv actions/admin/orders.ts features/admin/actions/

echo "5. Cleaning up old directories if empty..."
rm -rf actions/admin || true
rm -rf actions || true
rm -rf validations || true
rm -rf constants || true
rm -rf hooks || true
rm -rf services || true
rm -rf utils || true

echo "6. Fixing imports..."
# Function to replace imports across the codebase
replace_import() {
  local old=$1
  local new=$2
  echo "Replacing $old with $new..."
  find . -type f \( -name "*.ts" -o -name "*.tsx" \) -not -path "*/node_modules*" -not -path "*/.next*" -not -path "*/.git*" -print0 | xargs -0 perl -pi -e "s|${old}|${new}|g"
}

# The order matters slightly. For example, replace `@/actions/contact-dashboard` before `@/actions/contact`.

replace_import '@/actions/auth' '@/features/auth/actions/auth'
replace_import '@/actions/otp' '@/features/auth/actions/otp'
replace_import '@/actions/user' '@/features/auth/actions/user'

replace_import '@/actions/contact-dashboard' '@/features/contact/actions/contact-dashboard'
replace_import '@/actions/contact' '@/features/contact/actions/contact'

replace_import '@/actions/admin/customers' '@/features/admin/actions/customers'
replace_import '@/actions/admin/orders' '@/features/admin/actions/orders'

replace_import '@/validations/auth' '@/features/auth/validations/auth'
replace_import '@/validations/contact' '@/features/contact/validations/contact'

echo "Done!"
