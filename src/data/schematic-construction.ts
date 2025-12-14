export const constructionLines = [
  // Scarborough Subway Extension
  {
    id: "line2-extension",
    name: "Line 2 East Extension",
    color: "#34a853",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: 500, y: -100 }, // Kennedy 
      { cmd: "L", x: 500, y: -110 },
      { cmd: "L", x: 575, y: -175 }, 
      { cmd: "L", x: 575, y: -235 }
    ],
    stations: [
      { id: "kennedy", name: "Kennedy", x: 500, y: -100, type: "interchange" },
      { id: "lawrenceEast", name: "Lawrence East", x: 537.5, y: -142.5, type: "normal" },
      { id: "scarboroughCentre", name: "Scarborough Centre", x: 575, y: -200, type: "normal" },
      { id: "sheppardEast", name: "Sheppard East", x: 575, y: -235, type: "normal" }
    ],
  },
  // Yonge North Subway Extension
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
  // Ontario Line
  {
    id: "ontarioLine",
    name: "Ontario Line",
    color: "#189cdb",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -187.5, y: 232.5}, // Exhibition
      { cmd: "L", x: -155, y: 232.5 },
      { cmd: "L", x: -112.5, y: 190 },
      { cmd: "L", x: -112.5, y: 152.5 },
      { cmd: "L", x: -100, y: 137.5},
      { cmd: "L", x: 100, y: 137.5},
      { cmd: "L", x: 112.5, y: 150 },
      { cmd: "L", x: 112.5, y: 213.5 },
      { cmd: "L", x: 125, y: 225 },
      { cmd: "L", x: 175, y: 225 },
      { cmd: "L", x: 200, y: 205 },
      { cmd: "L", x: 200, y: -40 },
      { cmd: "L", x: 225, y: -70 },
      { cmd: "L", x: 225, y: -100 },
      
    ],
    stations: [
      { id: "exhibition", name: "Exhibition", x: -187.5, y: 232.5, type: "interchange" },
      { id: "kingBathurst", name: "King-Bathurst", x: -112.5, y: 170, type: "normal" },
      { id: "queenSpadina", name: "Queen-Spadina", x: -60, y: 137.5, type: "normal" },
      { id: "osgoode", name: "Osgoode", x: -25, y: 137.5, type: "interchange" },
      { id: "queen", name: "Queen", x: 25, y: 137.5, type: "interchange" },
      { id: "mossPark", name: "Moss Park", x: 75, y: 137.5, type: "normal" },
      { id: "corktown", name: "Corktown", x: 112.5, y: 170, type: "normal" },
      { id: "eastHarbour", name: "East Harbour", x: 165, y: 225, type: "normal" },
      { id: "riverside", name: "Riverside-Leslieville", x: 200, y: 160, type: "normal" },
      { id: "gerrard", name: "Gerrard", x: 200, y: 100, type: "normal" },
      { id: "pape", name: "Pape", x: 200, y: 25, type: "interchange" },
      { id: "cosburn", name: "Cosburn", x: 200, y: -15, type: "normal" },
      { id: "thorncliffe", name: "Thorncliffe Park", x: 212.5, y: -55, type: "normal" },
      { id: "flemingdon", name: "Flemingdon Park", x: 225, y: -80, type: "normal" },
      { id: "donValley", name: "Don Valley", x: 225, y: -100, type: "interchange" }
    ],
  },
  // Eglinton Crosstown
  {
    id: "line5-west",
    name: "Eglinton Crosstown LRT West",
    color: "#f27f30",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -500, y: -100 }, // Renforth
      { cmd: "L", x: -300, y: -100 }
      
    ],
    stations: [
      { id: "renforth", name: "Renforth", x: -500, y: -100, type: "normal" },
      { id: "martinGrove", name: "Martin Grove", x: -475, y: -100, type: "normal" },
      { id: "kipling", name: "Kipling", x: -450, y: -100, type: "normal" },
      { id: "islington", name: "Islington", x: -425, y: -100, type: "normal" },
      { id: "royalYork", name: "Royal York", x: -400, y: -100, type: "normal" },
      { id: "scarlett", name: "Scarlett", x: -375, y: -100, type: "normal" }, 
      { id: "jane", name: "Jane", x: -350, y: -100, type: "normal" },
      { id: "mountDennis", name: "Mount Dennis", x: -300, y: -100, type: "normal" },
    ],
  },
  {
    id: "hurontario",
    name: "Hurrontario LRT",
    color: "#0fbd9a",
    thickness: 5,
    pathPoints: [
      { cmd: "M", x: -675, y: -187.5  },
      { cmd: "L", x: -675, y: 235 }
      
    ],
    stations: [
      { id: "brampton", name: "Brampton Gateway", x: -675, y: -187.5, type: "interchange-sm" },
      // { id: "martinGrove", name: "Martin Grove", x: -487.5, y: -100, type: "normal" },
     
    ],
  },
];
