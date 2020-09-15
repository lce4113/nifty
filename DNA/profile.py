# python3 profile.py data.csv sequence1.txt
# python3 profile.py data.csv sequence2.txt
# python3 profile.py data.csv sequence3.txt
# python3 profile.py data.csv sequence4.txt

import sys
import csv

args = sys.argv[1:]
data = list(csv.reader(open(args[0])))
sequence = open(args[1]).read()

all_patterns = {}
for person in data[1:]:
    person_patterns = {}
    for j, num_patterns in enumerate(person[1:]):
        person_patterns[data[0][j + 1]] = int(num_patterns)
    all_patterns[person[0]] = person_patterns

sequence_patterns = {}
for i in range(len(sequence)):
    for pattern in data[0][1:]:
        j = 0
        while sequence[i + 4 * j:i + 4 * (j + 1)] == pattern:
            j += 1
        if not pattern in sequence_patterns or j > sequence_patterns[pattern]:
            sequence_patterns[pattern] = j

for person, person_patterns in all_patterns.items():
    if sequence_patterns == person_patterns:
        print(
            f"The sequence most likely belongs to\n{person}")
        quit()
print("The sequence most likely doesn't belong to anyone.")
