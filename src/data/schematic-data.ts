// src/data/schematic-data.ts
export const subwayLines = [
  // LINE 2 — Bloor–Danforth (horizontal across y = -250)
  {
    id: "line2",
    name: "Bloor–Danforth",
    color: "#34a853",
    thickness: 8,
    stations: [
      // West → East
      { id: "kipling", name: "Kipling", x: -700, y: 25, type: "normal" },
      { id: "islington", name: "Islington", x: -650, y: 25, type: "normal" },
      { id: "royalYork", name: "Royal York", x: -600, y: 25, type: "normal" },
      { id: "oldMill", name: "Old Mill", x: -550, y: 25, type: "normal" },
      { id: "highPark", name: "High Park", x: -500, y: 25, type: "normal" },
      { id: "keele", name: "Keele", x: -450, y: 25, type: "normal" },
      { id: "dundasWest", name: "Dundas West", x: -400, y: 25, type: "normal" },
      { id: "lansdowne", name: "Lansdowne", x: -350, y: 25, type: "normal" },
      { id: "dufferin", name: "Dufferin", x: -300, y: 25, type: "normal" },
      { id: "ossington", name: "Ossington", x: -250, y: 25, type: "normal" },
      { id: "christie", name: "Christie", x: -200, y: 25, type: "normal" },
      { id: "bathurst", name: "Bathurst", x: -150, y: 25, type: "normal" },
      { id: "spadina", name: "Spadina", x: -50, y: 25, type: "interchange" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" },

      { id: "bay", name: "Bay", x: 50, y: 25, type: "normal" },
      { id: "bloorYonge", name: "Bloor–Yonge", x: 100, y: 25, type: "interchange" },
      { id: "sherbourne", name: "Sherbourne", x: 150, y: 25, type: "normal" },
      { id: "castleFrank", name: "Castle Frank", x: 200, y: 25, type: "normal" },
      { id: "broadview", name: "Broadview", x: 250, y: 25, type: "normal" },
      { id: "chester", name: "Chester", x: 300, y: 25, type: "normal" },
      { id: "pape", name: "Pape", x: 350, y: 25, type: "normal" },
      { id: "donlands", name: "Donlands", x: 400, y: 25, type: "normal" },
      { id: "greenwood", name: "Greenwood", x: 450, y: 25, type: "normal" },
      { id: "coxwell", name: "Coxwell", x: 500, y: 25, type: "normal" },
      { id: "woodbine", name: "Woodbine", x: 550, y: 25, type: "normal" },
      { id: "mainStreet", name: "Main Street", x: 600, y: 25, type: "normal" },
      { id: "vicPark", name: "Victoria Park", x: 650, y: 25, type: "normal" },
      { id: "warden", name: "Warden", x: 700, y: 25, type: "normal" },
      { id: "kennedy", name: "Kennedy", x: 750, y: -25, type: "interchange" },
    ],
  },

  // LINE 1 — Yonge–University (continuous Finch → Union → Vaughan)
  {
    id: "line1",
    name: "Yonge–University",
    color: "#FFD700",
    thickness: 8,
    stations: [
      // Yonge (north → south to Union), Union is (0,0)
      { id: "finch", name: "Finch", x: 25, y: -325, type: "normal" },
      { id: "northYorkCentre", name: "North York Centre", x: 25, y: -300, type: "normal" },
      { id: "sheppardYonge", name: "Sheppard–Yonge", x: 25, y: -275, type: "interchange" },
      { id: "yorkMills", name: "York Mills", x: 25, y: -225, type: "normal" },
      { id: "lawrence", name: "Lawrence", x: 25, y: -175, type: "normal" },
      { id: "eglinton", name: "Eglinton", x: 25, y: -125, type: "normal" },
      { id: "davisville", name: "Davisville", x: 25, y: -100, type: "normal" },
      { id: "stClair", name: "St. Clair", x: 25, y: -75, type: "normal" },
      { id: "summerhill", name: "Summerhill", x: 25, y: -50, type: "normal" },
      { id: "rosedale", name: "Rosedale", x: 25, y: -25, type: "normal" },
      { id: "bloorYonge", name: "Bloor–Yonge", x: 25, y: 25, type: "interchange" }, // shares coord with Line 2
      { id: "wellesley", name: "Wellesley", x: 25, y: 75, type: "normal" },
      { id: "college", name: "College", x: 25, y: 100, type: "normal" },
      { id: "dundas", name: "Dundas", x: 25, y: 125, type: "normal" },
      { id: "queen", name: "Queen", x: 25, y: 150, type: "normal" },
      { id: "king", name: "King", x: 25, y: 200, type: "normal" },
      { id: "union", name: "Union", x: 0, y: 250, type: "interchange" },

      // University (west and then north to Vaughan)
      { id: "stAndrew", name: "St. Andrew", x: -25, y: 200, type: "normal" },
      { id: "osgoode", name: "Osgoode", x: -25, y: 150, type: "normal" },
      { id: "stPatrick", name: "St. Patrick", x: -25, y: 125, type: "normal" },
      { id: "queensPark", name: "Queen's Park", x: -25, y: 100, type: "normal" },
      { id: "museum", name: "Museum", x: -25, y: 75, type: "normal" },
      { id: "stGeorge", name: "St. George", x: -25, y: 25, type: "interchange" }, // meets Line 2
      { id: "spadina", name: "Spadina", x: -50, y: 0, type: "interchange" },     // meets Line 2
      { id: "dupont", name: "Dupont", x: -75, y: -50, type: "normal" },
      { id: "stClairWest", name: "St. Clair West", x: -75, y: -75, type: "normal" },
      { id: "eglintonWest", name: "Eglinton West", x: -100, y: -125, type: "normal" },
      { id: "glencairn", name: "Glencairn", x: -100, y: -175, type: "normal" },
      { id: "lawrenceWest", name: "Lawrence West", x: -125, y: -200, type: "normal" },
      { id: "yorkdale", name: "Yorkdale", x: -150, y: -225, type: "normal" },
      { id: "wilson", name: "Wilson", x: -175, y: -250, type: "normal" },
      { id: "sheppardWest", name: "Sheppard West", x: -200, y: -275, type: "normal" },
      { id: "downsviewPark", name: "Downsview Park", x: -225, y: -300, type: "normal" },
      { id: "finchWest", name: "Finch West", x: -250, y: -325, type: "normal" },
      { id: "yorkU", name: "York University", x: -275, y: -350, type: "normal" },
      { id: "pioneerVillage", name: "Pioneer Village", x: -300, y: -375, type: "normal" },
      { id: "highway407", name: "Highway 407", x: -325, y: -400, type: "normal" },
      { id: "vaughan", name: "Vaughan Metropolitan Centre", x: -325, y: -425, type: "normal" },
    ],
  },
];
