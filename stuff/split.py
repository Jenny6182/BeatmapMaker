import json

with open("level2_mid.json", "r") as f:
    data = json.load(f)

track = data["tracks"][0]
notes = track["notes"]

SECTION_LENGTH = 14  # seconds (adjust to your A-1 style)

sections = {}

for note in notes:
    section_id = int(note["time"] // SECTION_LENGTH)

    if section_id not in sections:
        sections[section_id] = []

    sections[section_id].append(note)