import glob
import json
import os
import sys
import re

filenames = glob.glob('./data/v1/**/Monster.json', recursive=True)

for filename in filenames:
    try:
        print(f'Linting {filename}')
        with open(filename, 'r') as f:
            file = f.read()

        js = json.loads(file)
        new_js = json.dumps(js, indent=2, ensure_ascii=False)

        lines = new_js.split('\n')
        lines = [re.sub(r'^  ','', line) for line in lines]  # Remove two spaces from the start of each line

        new_js = '\n'.join(lines)
        with open(filename, 'w') as f:
            f.write(new_js)
    except Exception as e:
        print(f'Error linting {filename}')
        print(e)
