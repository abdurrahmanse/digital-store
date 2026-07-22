import os

directory = '/Volumes/Fullstack/Github Clone/digital-store/app'

old_str = "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
new_str = "bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400"

for root, _, files in os.walk(directory):
    for f in files:
        if f.endswith('.tsx'):
            filepath = os.path.join(root, f)
            with open(filepath, 'r') as file:
                content = file.read()
            
            if old_str in content:
                new_content = content.replace(old_str, new_str)
                with open(filepath, 'w') as file:
                    file.write(new_content)
                print(f"Updated {filepath}")

print("Done")
