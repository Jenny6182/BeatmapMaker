import {parseMidi} from './midi_parser'
import midiData from './level2_mid.json'  // this already parses the json file into a json object

console.log("hi")
const bubbles = parseMidi(midiData)
console.log("bye")

console.log(bubbles)