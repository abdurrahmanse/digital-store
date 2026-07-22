import os
import re

directories = [
    '/Volumes/Fullstack/Github Clone/digital-store/app',
    '/Volumes/Fullstack/Github Clone/digital-store/components',
    '/Volumes/Fullstack/Github Clone/digital-store/features'
]

tsx_files = []
for directory in directories:
    if os.path.exists(directory):
        for root, _, files in os.walk(directory):
            for f in files:
                if f.endswith('.tsx'):
                    tsx_files.append(os.path.join(root, f))

pattern = re.compile(r'(<h[1-6][^>]*?className=["\'])(.*?)(["\'][^>]*?>)')
gradient_classes = "bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400"

def replacer(match):
    prefix = match.group(1)
    classes = match.group(2)
    suffix = match.group(3)
    
    if "bg-clip-text" in classes and "from-slate-900" in classes:
        return match.group(0) # Already has the gradient
    
    # Remove existing text color classes and old gradients
    classes = re.sub(r'\btext-slate-\d+\b', '', classes)
    classes = re.sub(r'\bdark:text-white\b', '', classes)
    classes = re.sub(r'\btext-foreground\b', '', classes)
    classes = re.sub(r'\btext-transparent\b', '', classes)
    classes = re.sub(r'\bbg-clip-text\b', '', classes)
    classes = re.sub(r'\bbg-gradient-to-r\b', '', classes)
    classes = re.sub(r'\bfrom-blue-\d+\b', '', classes)
    classes = re.sub(r'\bto-indigo-\d+\b', '', classes)
    classes = re.sub(r'\bdark:from-blue-\d+\b', '', classes)
    classes = re.sub(r'\bdark:to-indigo-\d+\b', '', classes)
    classes = re.sub(r'\bfrom-slate-\d+\b', '', classes)
    classes = re.sub(r'\bto-slate-\d+\b', '', classes)
    classes = re.sub(r'\bdark:from-white\b', '', classes)
    classes = re.sub(r'\bdark:to-slate-\d+\b', '', classes)
    
    # Add gradient classes
    classes = f"{classes.strip()} {gradient_classes}"
    
    # Clean up spaces
    classes = re.sub(r'\s+', ' ', classes).strip()
    
    return f"{prefix}{classes}{suffix}"

count = 0
for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
        count += 1

print(f"Done. Updated {count} files.")
