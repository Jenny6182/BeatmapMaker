document.getElementById('play-btn').addEventListener('click', async () => {
    // 1. Start the Tone.js audio context (required by browsers)
    await Tone.start();

    // 2. Load and parse the MIDI file
    const midi = await Midi.fromUrl("level_2_midi.mid");

    // 3. Create a synthesizer to play the notes
    const synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // 4. Get the exact current time to align playback
    const now = Tone.now();

    // 5. Loop through tracks and schedule each note
    midi.tracks.forEach(track => {
        track.notes.forEach(note => {
            synth.triggerAttackRelease(
                note.name, 
                note.duration, 
                note.time + now, 
                note.velocity
            );
        });
    });
});
