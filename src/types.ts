
// type.ts hold definition of all data types used in BeatmapMaker

export type Bubble = {
    beatIndex: number | null// unique identifier
    sectionID: string | null // bubble should only belong to 0 or 1 sections
    time: number // in sec
    pitch: number // in... ?  0-127, where 60 is middle C
    duration: number // in sec
    x: number | null // x position, normalized from 0-1 as percentage of screen
    y: number | null// y position, normalized from 0-1 as percentage of screen
    state: 'grid' | 'placed' // indicate if it's still on the time grid or is it placed onto the canvas
    // if trashed delete from memory
}

export type Section = {
    id: string // unique identifier
    name: string // non-unique, can be repeated to indicate they are same section
    start_beat: number // beat index from bubble array
    end_beat: number // beat index from bubble array
}







    
//     constructor(x, y) {
//         // create bubble container
//         this.element = document.createElement("div");
//         this.element.classList.add("bubble");

//         // create flame
//         this.flame = document.createElement("div");
//         this.flame.classList.add("flame");

//         // create sparkler
//         this.sparkler = document.createElement("div");
//         this.sparkler.classList.add("sparkler")

//         // append into container
//         this.element.appendChild(this.flame);
//         this.element.appendChild(this.sparkler);

//         // set position
//         this.setPosition(x, y);
//     }

//     setPosition(x, y) {
//         this.element.style.left = `${x}px`;
//         this.element.style.top =   `${y}px`;
//     }
// }

