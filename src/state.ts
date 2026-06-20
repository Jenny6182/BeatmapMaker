
// state.ts holds all the live data during editing
// it contains all the functions that mutate existing datatypes

import type {Bubble, Section} from './types'

export let bubbles: Bubble[] = [] // array of all bubbles, including ones on time grid AND ones on canvas
export let sections: Section[] = [] // array of all sections
export let activeSectionID: string | null = null 
// initialize activeSectionID as null, when user works on a section we will temporarily store it here

// Global counter to assign each section an unique id, if there's multiple users will need to change approach
let sectionCounter = 0

export function loadBubbles(newBubbles: Bubble[]) {
    // Takes bubbles array parsed by midi parser, store it into bubbles array in the state data
    bubbles = newBubbles
}

export function placeBubble(bubble: Bubble, x: number, y: number) {
    // When bubble is placed, change its state and x, y position
    bubble.state = 'placed'
    moveBubble(bubble, x, y)
}

export function moveBubble(bubble: Bubble, x: number, y: number) {
    // When bubble is moved, change its x, y position
    bubble.x = x
    bubble.y = y
}

export function deleteBubble(bubble: Bubble) {
    // When bubble is deleted, change its state back to grid (so state returns to unplaced)
    if (bubble.state !== 'placed') return // only placed bubbles on canvas can be deleted
    bubbles = bubbles.filter(b => b !== bubble) // else it's placed
    // replace bubbles array with new array that only contains bubble that is not the target deletion bubble
}

export function assignIndexBubble(unassigned_bubble: Bubble, target_bubble: Bubble) {
    // When a bubble has unassigned index and is assigned an index by selecting itself and a target bubble
    if (unassigned_bubble.state !== 'placed') return // only placed bubbles on canvas 
    if (unassigned_bubble.beatIndex === null) { // that has no beat index assigned (was copied) can be assigned a beatindex
        unassigned_bubble.beatIndex = target_bubble.beatIndex // assign the target's beat index to unassigned bubble
        unassigned_bubble.sectionID = target_bubble.sectionID // change section id to be consistent
    }
    // else, do nothing
}

export function addSection(name: string, start_beat: number, end_beat: number) {
    // need to modify bubble section ids, checking if each bubble's time is within the section?
    // start_beat and end_beat should be beatIndex of the corresponding bubbles selected

    // increment counter for new sectionID
    sectionCounter++

    // create new section
    const newSection: Section = {
        id: sectionCounter.toString(),
        name: name,
        start_beat: start_beat,
        end_beat: end_beat
    }

    // push new section into sections array
    sections.push(newSection)

    // check if there's any bubbles we need to change sectionID for
    for (const bubble of bubbles) {
        if (bubble.beatIndex === null) { // if unassigned (such as copied bubbles), skip
            continue
        }
        else if ((bubble.beatIndex >= start_beat) && (bubble.beatIndex <= end_beat)) {
            bubble.sectionID = newSection.id // use new section's id as this bubble's id
        }
    }
}

export function editSection(section: Section, changes: {name?: string, start_beat?: number, end_beat?: number}) {

}

export function setActiveSection() {

}

export function deleteSection() {

}