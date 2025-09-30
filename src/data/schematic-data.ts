// src/data/schematic-data.ts
export const subwayLines = [
  // LINE 2 — Bloor–Danforth
  {
    id: "line2",
    name: "Bloor–Danforth",
    color: "#34a853",
    thickness: 10,
    pathPoints: [
      { cmd: "M", x: -650, y: 50 },
      //{ cmd: "L", x: -645, y: 30 },
      { cmd: "L", x: -635, y: 25 },
      { cmd: "L", x: 550, y: 25 },
      { cmd: "L", x: 650, y: -90 },
      { cmd: "L", x: 650, y: -100 }
    ],
    stations: [
      { id: "kipling", name: "Kipling", x: -650, y: 50, type: "normal" },
      { id: "islington", name: "Islington", x: -600, y: 25, type: "normal" },
      { id: "royalYork", name: "Royal York", x: -550, y: 25, type: "normal" },
      { id: "oldMill", name: "Old Mill", x: -500, y: 25, type: "normal" },
      { id: "highPark", name: "High Park", x: -450, y: 25, type: "normal" },
      { id: "keele", name: "Keele", x: -400, y: 25, type: "normal" },
      { id: "dundasWest", name: "Dundas West", x: -350, y: 25, type: "interchange" },
      { id: "lansdowne", name: "Lansdowne", x: -300, y: 25, type: "normal" },
      { id: "dufferin", name: "Dufferin", x: -250, y: 25, type: "normal" },
      { id: "ossington", name: "Ossington", x: -200, y: 25, type: "normal" },
      { id: "christie", name: "Christie", x: -150, y: 25, type: "normal" },
      { id: "bathurst", name: "Bathurst", x: -100, y: 25, type: "normal" },
      { id: "spadina", name: "Spadina", x: -50, y: 25, type: "interchange" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" },
      { id: "bay", name: "Bay", x: 0, y: 25, type: "normal" },
      { id: "bloorYonge", name: "Bloor–Yonge", x: 25, y: 25, type: "interchange" },
      { id: "sherbourne", name: "Sherbourne", x: 75, y: 25, type: "normal" },
      { id: "castleFrank", name: "Castle Frank", x: 125, y: 25, type: "normal" },
      { id: "broadview", name: "Broadview", x: 175, y: 25, type: "normal" },
      { id: "chester", name: "Chester", x: 225, y: 25, type: "normal" },
      { id: "pape", name: "Pape", x: 275, y: 25, type: "normal" },
      { id: "donlands", name: "Donlands", x: 325, y: 25, type: "normal" },
      { id: "greenwood", name: "Greenwood", x: 375, y: 25, type: "normal" },
      { id: "coxwell", name: "Coxwell", x: 425, y: 25, type: "normal" },
      { id: "woodbine", name: "Woodbine", x: 475, y: 25, type: "normal" },
      { id: "mainStreet", name: "Main Street", x: 525, y: 25, type: "normal" },
      { id: "vicPark", name: "Victoria Park", x: 580.5, y: -10, type: "normal" },
      { id: "warden", name: "Warden", x: 619.5, y: -55, type: "normal" },
      { id: "kennedy", name: "Kennedy", x: 650, y: -100, type: "normal" }
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
      { cmd: "L", x: 25, y: 225 },
      { cmd: "Q", x: 0, y: 250, cx: 25, cy: 250 }, // curve around Union
      { cmd: "Q", x: -25, y: 225, cx: -25, cy: 250 }, // curve around Union
      { cmd: "L", x: -25, y: 15 },
      { cmd: "L", x: -60, y: 15 },
      { cmd: "L", x: -75, y: 0 },
      { cmd: "L", x: -75, y: -35 },
      { cmd: "L", x: -125, y: -75 },
      { cmd: "L", x: -125, y: -250 },
      { cmd: "L", x: -325, y: -350},
      { cmd: "L", x: -325, y: -400 }
    ],
    stations: [
      { id: "finch", name: "Finch", x: 25, y: -285, type: "normal" },
      { id: "northYorkCentre", name: "North York Centre", x: 25, y: -260, type: "normal" },
      { id: "sheppardYonge", name: "Sheppard–Yonge", x: 25, y: -235, type: "interchange" },
      { id: "yorkMills", name: "York Mills", x: 25, y: -200, type: "normal" },
      { id: "lawrence", name: "Lawrence", x: 25, y: -150, type: "normal" },
      { id: "eglinton", name: "Eglinton", x: 25, y: -100, type: "normal" },
      { id: "davisville", name: "Davisville", x: 25, y: -75, type: "normal" },
      { id: "stClair", name: "St. Clair", x: 25, y: -50, type: "normal" },
      { id: "summerhill", name: "Summerhill", x: 25, y: -25, type: "normal" },
      { id: "rosedale", name: "Rosedale", x: 25, y: 0, type: "normal" },
      { id: "bloorYonge", name: "Bloor–Yonge", x: 25, y: 25, type: "interchange" },
      { id: "wellesley", name: "Wellesley", x: 25, y: 75, type: "normal" },
      { id: "college", name: "College", x: 25, y: 100, type: "normal" },
      { id: "dundas", name: "Dundas", x: 25, y: 125, type: "normal" },
      { id: "queen", name: "Queen", x: 25, y: 150, type: "normal" },
      { id: "king", name: "King", x: 25, y: 200, type: "normal" },
      { id: "union", name: "Union", x: 0, y: 250, type: "interchange" },
      { id: "stAndrew", name: "St. Andrew", x: -25, y: 200, type: "normal" },
      { id: "osgoode", name: "Osgoode", x: -25, y: 150, type: "normal" },
      { id: "stPatrick", name: "St. Patrick", x: -25, y: 125, type: "normal" },
      { id: "queensPark", name: "Queen's Park", x: -25, y: 100, type: "normal" },
      { id: "museum", name: "Museum", x: -25, y: 75, type: "normal" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" },
      { id: "spadina", name: "Spadina", x: -50, y: 15, type: "interchange" },
      { id: "dupont", name: "Dupont", x: -75, y: -15, type: "normal" },
      { id: "stClairWest", name: "St. Clair West", x: -100, y: -55, type: "normal" },
      { id: "eglintonWest", name: "Eglinton West", x: -125, y: -100, type: "normal" },
      { id: "glencairn", name: "Glencairn", x: -125, y: -125, type: "normal" },
      { id: "lawrenceWest", name: "Lawrence West", x: -125, y: -160, type: "normal" },
      { id: "yorkdale", name: "Yorkdale", x: -125, y: -185, type: "normal" },
      { id: "wilson", name: "Wilson", x: -125, y: -210, type: "normal" },
      { id: "sheppardWest", name: "Sheppard West", x: -125, y: -235, type: "normal" },
      { id: "downsviewPark", name: "Downsview Park", x: -165, y: -270, type: "normal" },
      { id: "finchWest", name: "Finch West", x: -215, y: -295, type: "normal" },
      { id: "yorkU", name: "York University", x: -265, y: -320, type: "normal" },
      { id: "pioneerVillage", name: "Pioneer Village", x: -300, y: -337.5, type: "normal" },
      { id: "highway407", name: "Highway 407", x: -325, y: -370, type: "normal" },
      { id: "vaughan", name: "Vaughan Metropolitan Centre", x: -325, y: -400, type: "normal" }
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
      { id: "leslie", name: "Leslie", x: 175, y: -235, type: "interchange " },
      { id: "donMills", name: "Don Mills", x: 225, y: -235, type: "normal" }
    ]
  }
];
