
import {parseMidi} from './midi_parser'
import level2Midi from './level2_mid.json'

const bubbles = parseMidi(level2Midi)
const real_note_length = level2Midi.tracks[0].notes.length

console.assert(bubbles.length === real_note_length)
console.assert(bubbles[0].time === 0)