
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
    // update bubbles
    updateAllBubbleSections()
}

export function editSection(section: Section, changes: {name?: string, start_beat?: number, end_beat?: number}) {
    if (changes.name !== undefined) { // if new name is provided
        section.name = changes.name
    } if (changes.start_beat !== undefined) { // if new start beat is provided
        section.start_beat = changes.start_beat
    } if (changes.end_beat !== undefined) { // if new end beat is provided
        section.end_beat = changes.end_beat
    }
    if ((changes.start_beat !== undefined) || (changes.end_beat !== undefined)) { 
        // if start or end beat is provided, one of them must have changed
        updateAllBubbleSections()
    }
}

export function setActiveSection(section: Section) {
    activeSectionID = section.id
}  

export function deleteSection(section: Section) {
    sections = sections.filter(s => s !== section) // make a new section without the target delete section
    updateAllBubbleSections()
}


// Helper functions for updating bubble sections

function updateBubbleSection(bubble: Bubble) {
    if (bubble.beatIndex === null) return
    // if unassigned (such as copied bubbles), skip

    for (const section of sections) {
        if ((bubble.beatIndex >= section.start_beat) && (bubble.beatIndex <= section.end_beat)) {
            bubble.sectionID = section.id // use new section's id as this bubble's id
            return 
            // each bubble can only belong to one section, 
            // so return after finding which section bubble belongs to
        }
    }

    bubble.sectionID = null // else, bubble doesn't belong to any section, change it to null
}

function updateAllBubbleSections() {
    for (const bubble of bubbles) {
        updateBubbleSection(bubble)
    }
}