export const constructionLines = [
  {
    id: "line2-extension",
    name: "Line 2 East Extension",
    color: "#34a853",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: 650, y: -100 }, // Kennedy 
      { cmd: "L", x: 650, y: -110 },
      { cmd: "L", x: 725, y: -150 }, 
      { cmd: "L", x: 725, y: -235 }
    ],
    stations: [
      { id: "kennedy", name: "Kennedy", x: 650, y: -100, type: "interchange" },
      { id: "lawrenceEast", name: "Lawrence East", x: 687.5, y: -130, type: "normal" },
      { id: "scarboroughCentre", name: "Scarborough Centre", x: 725, y: -200, type: "normal" },
      { id: "sheppardEast", name: "Sheppard East", x: 725, y: -235, type: "normal" }
    ],
  },
  {
    id: "line1-extension",
    name: "Line 1 North Extension",
    color: "#FFD700",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: 25, y: -285 }, // Finch 
      { cmd: "L", x: 25, y: -350 },
      { cmd: "L", x: 75, y: -400 },
      { cmd: "L", x: 75, y: -425 }
  
    ],
    stations: [
      { id: "steeles", name: "Steeles", x: 25, y: -315, type: "normal" },
      { id: "clark", name: "Clark", x: 25, y: -340, type: "normal" },
      { id: "royalOrchard", name: "Royal Orchard", x: 50, y: -375, type: "normal" },
      { id: "bridge", name: "Bridge", x: 75, y: -400, type: "normal" },
      { id: "highTech", name: "High Tech", x: 75, y: -425, type: "normal" }
    ],
  },
];
