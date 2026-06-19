// import * as Tone from "tone";
// import { Midi } from "@tonejs/midi";
// if not using node, don't use module syntax
// u should llink the source of the library

async function parseMidiFile(path: string) {
  // Load and parse a midi file from a URL
  const midi = await Midi.fromUrl(path);

  // Read top-level metadata
  console.log("Song Name:", midi.name);
  console.log("BPM:", midi.header.setTempo);
  console.log("Time Signature:", midi.header.timeSignatures);

  // Iterate over each instrument track
  midi.tracks.forEach((track) => {
    console.log("Track Name:", track.name);
    console.log("Instrument:", track.instrument.name);

    // Loop through the notes in this track
    track.notes.forEach((note) => {
      console.log("Note ID:", note.ticks)
      console.log("Note Name:", note.name);       // e.g., "C4"
      console.log("MIDI Number:", note.midi);     // e.g., 60
      console.log("Start Time (s):", note.time);  // Absolute time in seconds
      console.log("Duration (s):", note.duration);
      console.log("Velocity:", note.velocity);    // 0 to 1 float
    });
  });
}


// 1. Find the button element on the page
const button = document.getElementById("parse-btn");

// 2. Define what should happen when clicked
button.addEventListener("click", function() {
    alert("The button was clicked!");
    parseMidiFile("level_2_midi.mid")
});
