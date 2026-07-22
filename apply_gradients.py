import os
import re

directory = '/Volumes/Fullstack/Github Clone/digital-store/app'

# Find all tsx files
tsx_files = []
for root, _, files in os.walk(directory):
    for f in files:
        if f.endswith('.tsx'):
            tsx_files.append(os.path.join(root, f))

# Regex to match className attributes inside h1 and h2
pattern = re.compile(r'(<h[12][^>]*?className=["\'])(.*?)(["\'][^>]*?>)')

gradient_classes = "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"

def replacer(match):
    prefix = match.group(1)
    classes = match.group(2)
    suffix = match.group(3)
    
    # Remove existing text color classes
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
    
    # Add gradient classes
    classes = f"{classes.strip()} {gradient_classes}"
    
    # Clean up double spaces
    classes = re.sub(r'\s+', ' ', classes)
    
    return f"{prefix}{classes}{suffix}"

for filepath in tsx_files:
    with open(filepath, 'r') as f:
        content = f.read()
    
    new_content = pattern.sub(replacer, content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

print("Done")
