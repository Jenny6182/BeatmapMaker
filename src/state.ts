
// state.ts holds all the live data during editing

import {Bubble, Section} from './types'

export let bubbles: Bubble[] = [] // array of all bubbles, including ones on time grid AND ones on canvas
export let sections: Section[] = [] // array of all sections
export let activeSectionId: string | null = null 
// initialize activeSectionId as null, when user works on a section we will temporarily store it here