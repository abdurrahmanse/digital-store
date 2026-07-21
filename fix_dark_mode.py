import os
import re

directories = ['app/dashboard', 'features/dashboard', 'features/admin']

mappings = {
    r'(?<!dark:)bg-slate-50(?!/)': 'bg-slate-50 dark:bg-slate-950',
    r'(?<!dark:)bg-white': 'bg-white dark:bg-slate-950',
    r'(?<!dark:)text-slate-900': 'text-slate-900 dark:text-white',
    r'(?<!dark:)text-slate-800': 'text-slate-800 dark:text-slate-200',
    r'(?<!dark:)text-slate-700': 'text-slate-700 dark:text-slate-300',
    r'(?<!dark:)text-slate-600': 'text-slate-600 dark:text-slate-400',
    r'(?<!dark:)text-slate-500': 'text-slate-500 dark:text-slate-400',
    r'(?<!dark:)border-slate-200': 'border-slate-200 dark:border-slate-800',
    r'(?<!dark:)border-slate-100': 'border-slate-100 dark:border-slate-800',
    r'(?<!dark:)bg-slate-100': 'bg-slate-100 dark:bg-slate-800',
    r'(?<!dark:)bg-slate-200': 'bg-slate-200 dark:bg-slate-800',
    r'(?<!dark:)divide-slate-200': 'divide-slate-200 dark:divide-slate-800',
    r'(?<!dark:)divide-slate-100': 'divide-slate-100 dark:divide-slate-800',
    r'(?<!dark:)hover:bg-slate-50(?!/)': 'hover:bg-slate-50 dark:hover:bg-slate-800',
    r'(?<!dark:)hover:bg-slate-100': 'hover:bg-slate-100 dark:hover:bg-slate-800',
}

# specific tweaks for bg-slate-50/50 etc
mappings_extras = {
    r'(?<!dark:)bg-slate-50/50': 'bg-slate-50/50 dark:bg-slate-900/50',
    r'(?<!dark:)hover:bg-slate-50/50': 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50',
}

for d in directories:
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.tsx') or f.endswith('.ts'):
                path = os.path.join(root, f)
                with open(path, 'r') as file:
                    content = file.read()
                
                new_content = content
                for pattern, replacement in mappings_extras.items():
                    new_content = re.sub(pattern, replacement, new_content)
                for pattern, replacement in mappings.items():
                    new_content = re.sub(pattern, replacement, new_content)
                
                if new_content != content:
                    with open(path, 'w') as file:
                        file.write(new_content)
                    print(f"Updated {path}")
print("Done!")
