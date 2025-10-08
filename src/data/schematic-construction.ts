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
      { cmd: "L", x: 575, y: -150 }, 
      { cmd: "L", x: 575, y: -235 }
    ],
    stations: [
      { id: "kennedy", name: "Kennedy", x: 500, y: -100, type: "interchange" },
      { id: "lawrenceEast", name: "Lawrence East", x: 537.5, y: -130, type: "normal" },
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
      { cmd: "M", x: -200, y: 225}, // Exhibition
      { cmd: "L", x: -150, y: 225 },
      { cmd: "L", x: -125, y: 200 },
      { cmd: "L", x: -125, y: 150 },
      { cmd: "L", x: -100, y: 125},
      { cmd: "L", x: 100, y: 125},
      { cmd: "L", x: 112.5, y: 137.5 },
      { cmd: "L", x: 112.5, y: 187.5 },
      { cmd: "L", x: 125, y: 200 },
      { cmd: "L", x: 175, y: 200 },
      { cmd: "L", x: 200, y: 180 },
      { cmd: "L", x: 200, y: -40 },
      { cmd: "L", x: 225, y: -70 },
      { cmd: "L", x: 225, y: -100 },
      
    ],
    stations: [
      { id: "exhibition", name: "Exhibition", x: -200, y: 225, type: "interchange" },
      { id: "kingBathurst", name: "King-Bathurst", x: -125, y: 162.5, type: "normal" },
      { id: "queenSpadina", name: "Queen-Spadina", x: -75, y: 125, type: "normal" },
      { id: "osgoode", name: "Osgoode", x: -25, y: 125, type: "interchange" },
      { id: "queen", name: "Queen", x: 25, y: 125, type: "interchange" },
      { id: "mossPark", name: "Moss Park", x: 75, y: 125, type: "normal" },
      { id: "corktown", name: "Corktown", x: 112.5, y: 162.5, type: "normal" },
      { id: "eastHarbour", name: "East Harbour", x: 165, y: 200, type: "normal" },
      { id: "riverside", name: "Riverside-Leslieville", x: 200, y: 135, type: "normal" },
      { id: "gerrard", name: "Gerrard", x: 200, y: 87.5, type: "normal" },
      { id: "pape", name: "Pape", x: 200, y: 25, type: "interchange" },
    ],
  },
  // Eglinton Crosstown
  {
    id: "line5",
    name: "Eglinton Crosstown LRT",
    color: "#f27f30",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -600, y: -100 }, // Renforth
      { cmd: "L", x: 160, y: -100 }
      
    ],
    stations: [
      { id: "renforth", name: "Renforth", x: -600, y: -100, type: "normal" },
      { id: "martinGrove", name: "Martin Grove", x: -575, y: -100, type: "normal" },
      { id: "kipling", name: "Kipling", x: -550, y: -100, type: "normal" },
      { id: "islington", name: "Islington", x: -525, y: -100, type: "normal" },
      { id: "royalYork", name: "Royal York", x: -500, y: -100, type: "normal" },
      { id: "scarlett", name: "Scarlett", x: -475, y: -100, type: "normal" }, 
      { id: "jane", name: "Jane", x: -450, y: -100, type: "normal" },
      { id: "mountDennis", name: "Mount Dennis", x: -400, y: -100, type: "interchange" },
      { id: "keelesdale", name: "Keelesdale", x: -350, y: -100, type: "normal" },
      { id: "caledonia", name: "Caledonia", x: -200, y: -100, type: "normal" },
      { id: "fairbank", name: "Fairbank", x: -175, y: -100, type: "normal" },
      { id: "oakwood", name: "Oakwood", x: -150, y: -100, type: "normal" },

      { id: "cedarvale", name: "Cedarvale", x: -125, y: -100, type: "interchange" },
      { id: "forestHill", name: "Forest Hill", x: -87.5, y: -100, type: "normal" },
      { id: "chaplin", name: "Chaplin", x: -50, y: -100, type: "normal" },
      { id: "avenue", name: "Avenue", x: -12.5, y: -100, type: "normal" },
      { id: "eglinton", name: "Eglinton", x: 25, y: -100, type: "interchange" },
      { id: "mountPleasant", name: "Mount Pleasant", x: 75, y: -100, type: "normal" },
      { id: "leaside", name: "Leaside", x: 100, y: -100, type: "normal" },
      { id: "laird", name: "Laird", x: 125, y: -100, type: "normal" },
    ],
  },
  {
    id: "line5-surface",
    name: "Eglinton Crosstown LRT (Surface)",
    color: "#f27f30",
    thickness: 4,
    pathPoints: [
      { cmd: "M", x: 160, y: -100 }, // continues from underground
      { cmd: "L", x: 500, y: -100 },
    ],
    stations: [
      { id: "sunnybrookPark", name: "Sunnybrook Park", x: 175, y: -100, type: "normal" },
      { id: "donValley", name: "Don Valley", x: 225, y: -100, type: "interchange" },
      { id: "agaKhan", name: "Aga Khan Park & Museum ", x: 250, y: -100, type: "normal" },
      { id: "wynford", name: "Wynford", x: 275, y: -100, type: "normal" },
      { id: "sloane", name: "Sloane", x: 300, y: -100, type: "normal" },
      { id: "oConnor", name: "O'Connor", x: 350, y: -100, type: "normal" },
      { id: "pharmacy", name: "Pharmacy", x: 375, y: -100, type: "normal" },
      { id: "hakimiLebovic", name: "Hakimi Lebovic", x: 400, y: -100, type: "normal" },
      { id: "goldenMile", name: "Golden Mile", x: 425, y: -100, type: "normal" },
      { id: "birchmount", name: "Birchmount", x: 450, y: -100, type: "normal" },
      { id: "ionview", name: "Ionview", x: 475, y: -100, type: "normal" },
      { id: "kennedy", name: "Kennedy", x: 500, y: -100, type: "interchange" }
    ],
  },
  {
    id: "temp",
    name: "temp",
    color: "#f27f30",
    thickness: 8,
    pathPoints: [
      { cmd: "M", x: -10, y: 208 },
      { cmd: "L", x: 10, y: 208 },

      { cmd: "L", x: 10, y: 216 },
      { cmd: "L", x: -10, y: 216 },

      { cmd: "L", x: -10, y: 224 },
      { cmd: "L", x: 10, y: 224 },

      { cmd: "L", x: 10, y: 232 },
      { cmd: "L", x: -10, y: 232 },
    ],
    stations: [
      { id: "union", name: "Union", x: 0, y: 208, type: "interchange" },
      { id: "union", name: "Union", x: 0, y: 216, type: "interchange" },
      { id: "union", name: "Union", x: 0, y: 224, type: "interchange" },
      { id: "union", name: "Union", x: 0, y: 232, type: "interchange" },
      { id: "union", name: "Union", x: 0, y: 240, type: "interchange" },
      
    ],
  },
];
