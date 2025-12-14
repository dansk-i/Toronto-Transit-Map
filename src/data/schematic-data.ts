// src/data/schematic-data.ts
export const subwayLines = [
  // LINE 2 — Bloor–Danforth
  {
    id: "line2",
    name: "Bloor–Danforth",
    color: "#34a853",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -485, y: 50 },
      //{ cmd: "L", x: -645, y: 30 },
      { cmd: "L", x: -460, y: 25 },
      { cmd: "L", x: 400, y: 25 },
      { cmd: "L", x: 500, y: -90 },
      { cmd: "L", x: 500, y: -100 }
    ],
    stations: [
      { id: "kipling", name: "Kipling", x: -485, y: 50, type: "normal" },
      { id: "islington", name: "Islington", x: -450, y: 25, type: "normal" },
      { id: "royalYork", name: "Royal York", x: -425, y: 25, type: "normal" },
      { id: "oldMill", name: "Old Mill", x: -400, y: 25, type: "normal" },
      { id: "jane", name: "Jane", x: -375, y: 25, type: "normal" },
      { id: "runnymede", name: "Runnymede", x: -350, y: 25, type: "normal" },
      { id: "highPark", name: "High Park", x: -325, y: 25, type: "normal" },
      { id: "keele", name: "Keele", x: -300, y: 25, type: "normal" },

      { id: "dundasWest", name: "Dundas West", x: -260, y: 25, type: "normal" },
      { id: "lansdowne", name: "Lansdowne", x: -225, y: 25, type: "normal" },
      { id: "dufferin", name: "Dufferin", x: -187.5, y: 25, type: "normal" },
      { id: "ossington", name: "Ossington", x: -162.5, y: 25, type: "normal" },
      { id: "christie", name: "Christie", x: -137.5, y: 25, type: "normal" },
      { id: "bathurst", name: "Bathurst", x: -112.5, y: 25, type: "normal" },

      { id: "spadina", name: "Spadina", x: -60, y: 25, type: "interchange" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" },
      { id: "bay", name: "Bay", x: 0, y: 25, type: "normal" },
      { id: "bloorYonge", name: "Bloor–Yonge", x: 25, y: 25, type: "interchange" },

      { id: "sherbourne", name: "Sherbourne", x: 75, y: 25, type: "normal" },
      { id: "castleFrank", name: "Castle Frank", x: 100, y: 25, type: "normal" },
      { id: "broadview", name: "Broadview", x: 125, y: 25, type: "normal" },
      { id: "chester", name: "Chester", x: 150, y: 25, type: "normal" },
      { id: "pape", name: "Pape", x: 200, y: 25, type: "normal" },

      { id: "donlands", name: "Donlands", x: 250, y: 25, type: "normal" },
      { id: "greenwood", name: "Greenwood", x: 275, y: 25, type: "normal" },
      { id: "coxwell", name: "Coxwell", x: 300, y: 25, type: "normal" },
      { id: "woodbine", name: "Woodbine", x: 325, y: 25, type: "normal" },
      { id: "mainStreet", name: "Main Street", x: 375, y: 25, type: "normal" },
      { id: "vicPark", name: "Victoria Park", x: 430.5, y: -10, type: "normal" },
      { id: "warden", name: "Warden", x: 469.5, y: -55, type: "normal" },
      { id: "kennedy", name: "Kennedy", x: 500, y: -100, type: "normal" }
    ]
  },

  // LINE 1 — Yonge–University
  {
    id: "line1",
    name: "Yonge–University",
    color: "#FFD700",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: 25, y: -285 },
      { cmd: "L", x: 25, y: 175 },
      { cmd: "Q", x: 0, y: 200, cx: 25, cy: 200 }, // curve around Union
      { cmd: "Q", x: -25, y: 175, cx: -25, cy: 200 }, // curve around Union
      { cmd: "L", x: -25, y: 15 },
      { cmd: "L", x: -70, y: 15 },
      { cmd: "L", x: -85, y: 0 },
      { cmd: "L", x: -85, y: -35 },
      { cmd: "L", x: -125, y: -65 },
      { cmd: "L", x: -125, y: -250 },
      { cmd: "L", x: -225, y: -350},
      { cmd: "L", x: -225, y: -400 }
    ],
    stations: [
      { id: "finch", name: "Finch", x: 25, y: -285, type: "normal" },
      { id: "northYorkCentre", name: "North York Centre", x: 25, y: -260, type: "normal" },
      { id: "sheppardYonge", name: "Sheppard–Yonge", x: 25, y: -235, type: "interchange" },
      { id: "yorkMills", name: "York Mills", x: 25, y: -190, type: "normal" },
      { id: "lawrence", name: "Lawrence", x: 25, y: -145, type: "normal" },
      { id: "eglinton", name: "Eglinton", x: 25, y: -100, type: "normal" },
      { id: "davisville", name: "Davisville", x: 25, y: -75, type: "normal" },
      { id: "stClair", name: "St. Clair", x: 25, y: -50, type: "normal" },
      { id: "summerhill", name: "Summerhill", x: 25, y: -25, type: "normal" },
      { id: "rosedale", name: "Rosedale", x: 25, y: 0, type: "normal" },
      
      { id: "bloorYonge", name: "Bloor–Yonge", x: 25, y: 25, type: "interchange" },
      { id: "wellesley", name: "Wellesley", x: 25, y: 55.5, type: "normal" },
      { id: "college", name: "College", x: 25, y: 80.5, type: "normal" },
      { id: "dundas", name: "Dundas", x: 25, y: 105.5, type: "normal" },
      { id: "queen", name: "Queen", x: 25, y: 137.5, type: "normal" },
      { id: "king", name: "King", x: 25, y: 170, type: "normal" },


      { id: "union", name: "Union", x: 0, y: 200, type: "interchange" },


      { id: "stAndrew", name: "St. Andrew", x: -25, y: 170, type: "normal" },
      { id: "osgoode", name: "Osgoode", x: -25, y: 137.5, type: "normal" },
      { id: "stPatrick", name: "St. Patrick", x: -25, y: 105.5, type: "normal" },
      { id: "queensPark", name: "Queen's Park", x: -25, y: 80.5, type: "normal" },
      { id: "museum", name: "Museum", x: -25, y: 55.5, type: "normal" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" },
      { id: "spadina", name: "Spadina", x: -60, y: 15, type: "interchange" },

      { id: "dupont", name: "Dupont", x: -85, y: -15, type: "normal" },
      { id: "stClairWest", name: "St. Clair West", x: -105, y: -50, type: "normal" },
      { id: "eglintonWest", name: "Eglinton West", x: -125, y: -100, type: "normal" },
      { id: "glencairn", name: "Glencairn", x: -125, y: -125, type: "normal" },
      { id: "lawrenceWest", name: "Lawrence West", x: -125, y: -160, type: "normal" },
      { id: "yorkdale", name: "Yorkdale", x: -125, y: -185, type: "normal" },
      { id: "wilson", name: "Wilson", x: -125, y: -210, type: "normal" },
      { id: "sheppardWest", name: "Sheppard West", x: -125, y: -235, type: "normal" },
      { id: "downsviewPark", name: "Downsview Park", x: -145, y: -270, type: "normal" },
      { id: "finchWest", name: "Finch West", x: -170, y: -295, type: "normal" },
      { id: "yorkU", name: "York University", x: -195, y: -320, type: "normal" },
      { id: "pioneerVillage", name: "Pioneer Village", x: -212.5, y: -337.5, type: "normal" },
      { id: "highway407", name: "Highway 407", x: -225, y: -370, type: "normal" },
      { id: "vaughan", name: "Vaughan Metropolitan Centre", x: -225, y: -400, type: "normal" }
    ]
  },
  // LINE 4 — Sheppard
  {
    id: "line4",
    name: "Sheppard",
    color: "#b10072",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: 25, y: -235 },
      { cmd: "L", x: 225, y: -235 }
    ],
    stations: [
      { id: "sheppardYonge", name: "Sheppard–Yonge", x: 25, y: -235, type: "interchange" },
      { id: "bayview", name: "Bayview", x: 75, y: -235, type: "normal" },
      { id: "bessarion", name: "Bessarion", x: 125, y: -235, type: "normal" },
      { id: "leslie", name: "Leslie", x: 175, y: -235, type: "interchange" },
      { id: "donMills", name: "Don Mills", x: 225, y: -235, type: "normal" }
    ]
  },
  // Eglinton Crosstown
  {
    id: "line5",
    name: "Eglinton Crosstown LRT",
    color: "#f27f30",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -300, y: -100 }, // mount Dennis
      { cmd: "L", x: 160, y: -100 }
      
    ],
    stations: [
      { id: "mountDennis", name: "Mount Dennis", x: -300, y: -100, type: "normal" },
      { id: "keelesdale", name: "Keelesdale", x: -262.5, y: -100, type: "normal" },
      { id: "caledonia", name: "Caledonia", x: -225, y: -100, type: "normal" },
      { id: "fairbank", name: "Fairbank", x: -187.5, y: -100, type: "normal" },
      { id: "oakwood", name: "Oakwood", x: -162.5, y: -100, type: "normal" },

      { id: "cedarvale", name: "Cedarvale", x: -125, y: -100, type: "interchange" },
      { id: "forestHill", name: "Forest Hill", x: -87.5, y: -100, type: "normal" },
      { id: "chaplin", name: "Chaplin", x: -50, y: -100, type: "normal" },
      { id: "avenue", name: "Avenue", x: -12.5, y: -100, type: "normal" },
      { id: "eglinton", name: "Eglinton", x: 25, y: -100, type: "interchange" },
      { id: "mountPleasant", name: "Mount Pleasant", x: 87.5, y: -100, type: "normal" },
      { id: "leaside", name: "Leaside", x: 112.5, y: -100, type: "normal" },
      { id: "laird", name: "Laird", x: 137.5, y: -100, type: "normal" },
    ],
  },
  {
    id: "line5-surface",
    name: "Eglinton Crosstown LRT (Surface)",
    color: "#f27f30",
    thickness: 5,
    pathPoints: [
      { cmd: "M", x: 160, y: -100 }, // continues from underground
      { cmd: "L", x: 175, y: -100 },
      { cmd: "L", x: 163, y: -102 },
      { cmd: "L", x: 163, y: -98},
      { cmd: "L", x: 175, y: -100 },
      { cmd: "L", x: 500, y: -100 },
      
    ],
    stations: [
      { id: "sunnybrookPark", name: "Sunnybrook Park", x: 187.5, y: -100, type: "normal" },
      { id: "donValley", name: "Don Valley", x: 225, y: -100, type: "normal" },
      { id: "agaKhan", name: "Aga Khan Park & Museum ", x: 262.5, y: -100, type: "normal" },
      { id: "wynford", name: "Wynford", x: 287.5, y: -100, type: "normal" },
      { id: "sloane", name: "Sloane", x: 312.5, y: -100, type: "normal" },
      { id: "oConnor", name: "O'Connor", x: 337.5, y: -100, type: "normal" },
      { id: "pharmacy", name: "Pharmacy", x: 362.5, y: -100, type: "normal" },
      { id: "hakimiLebovic", name: "Hakimi Lebovic", x: 387.5, y: -100, type: "normal" },
      { id: "goldenMile", name: "Golden Mile", x: 412.5, y: -100, type: "normal" },
      { id: "birchmount", name: "Birchmount", x: 437.5, y: -100, type: "normal" },
      { id: "ionview", name: "Ionview", x: 462.5, y: -100, type: "normal" },
      { id: "kennedy", name: "Kennedy", x: 500, y: -100, type: "interchange" }
    ],
  },
  {
    id: "line6",
    name: "Finch West LRT",
    color: "#70706fff",
    thickness: 5,
    pathPoints: [
       { cmd: "M", x: -170, y: -295 }, // Finch West
       { cmd: "L", x: -185, y: -280 },
       { cmd: "L", x: -590, y: -280 },
       { cmd: "L", x: -600, y: -270 },

    
    ],
    stations: [
     { id: "finchWest", name: "Finch West", x: -170, y: -295, type: "finchWest" },
     { id: "sentinel", name: "Sentinel", x: -200, y: -280 , type: "normal" },
     { id: "tobermory", name: "Tobermory", x: -225, y: -280, type: "normal" },
     { id: "driftwood", name: "Driftwood", x: -250, y: -280, type: "normal" },
     { id: "janeFinch", name: "Jane and Finch", x: -275, y: -280, type: "normal" },
     { id: "norfinchOakdale", name: "Norfinch Oakdale", x: -300, y: -280, type: "normal" },
     { id: "signetArrow", name: "Signet Arrow", x: -325, y: -280 , type: "normal" },
     { id: "emery", name: "Emery", x: -350, y: -280, type: "normal" },
     { id: "milvanRumike", name: "Milvan Rumike ", x: -375, y: -280, type: "normal" },
     { id: "duncanwoods", name: "Duncanwoods", x: -400, y: -280, type: "normal" },
     { id: "pearldale", name: "Pearldale", x: -425, y: -280, type: "normal" },
     { id: "rowntreeMills", name: "Rowntree Mills", x: -450, y: -280, type: "normal" },
     { id: "mountOlive", name: "Mount Olive", x: -475, y: -280, type: "normal" },
     { id: "stevenson", name: "Stevenson ", x: -500, y: -280, type: "normal" },
     { id: "albion", name: "Albion", x: -525, y: -280, type: "normal" },
     { id: "martinGrove", name: "Martin Grove", x: -550, y: -280, type: "normal" },
     { id: "westmore", name: "Westmore", x: -575, y: -280, type: "normal" },
     { id: "humberCollege", name: "Humber College", x: -600, y: -270, type: "normal" },
      
    ],
  }
];
