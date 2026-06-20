



/**
midi_parser.ts is responsible for taking json midi tone.js format and giving an initialized bubble array
1. Take the JSON as input
2. Return beatTimes[] — just the time of every note in order
Return Bubble[] — one bubble per note 
*/


import type {Bubble} from './types'

export function parseMidi(midiJson: any): Bubble[] {
    // Precondition: midiJson is an already parsed json object

    let bubbles: Bubble[] = []

    for (const track of midiJson.tracks) {
        for (const note of track.notes) {
            // create new bubble
            const newBubble: Bubble = {
                beatIndex: null, // placeholder
                sectionID: null,
                time: note.time,
                pitch: note.midi,
                duration: note.duration,
                x: null,
                y: null,
                state: 'grid'
            }
            // add new bubble into bubbles array
            bubbles.push(newBubble)
        }
    }

    // sort the bubbles by time
    bubbles.sort((a, b) => a.time - b.time)

    // change placeholder value for beatIndex into index in the bubbles array
    bubbles.forEach((bubble, index) => {
        bubble.beatIndex = index
    })
    
    return bubbles
}