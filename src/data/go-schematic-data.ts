export const goLines = [
    {
        id: "barrie",
        name: "Barrie Line",
        color: "#326fb6",
        thickness: 8,
        pathPoints: [
            { cmd: "M", x: 0, y: 210.5 }, 
            { cmd: "L", x: -140.5, y: 210.5 },
            { cmd: "L", x: -225, y: 123.5},
            { cmd: "L", x: -225, y: 25 },
            { cmd: "L", x: -225, y: -100 },
        ],
        stations: [
           { id: "union", name: "Union", x: 0, y: 200, type: "union" },
        ],
    },
    {
    id: "kitchener",
    name: "Kitchener Line",
    color: "#08783f",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 218 },    
        { cmd: "L", x: -144, y: 218 },
        { cmd: "L", x: -250, y: 109 },   
        { cmd: "L", x: -250, y: 0 },
        { cmd: "L", x: -300, y: -50 },
        { cmd: "L", x: -300, y: -125 },
        { cmd: "L", x: -350, y: -187.5 },
        { cmd: "L", x: -750, y: -187.5 },
    ],
    stations: [
        { id: "dundasWest", name: "Dundas West", x: -259, y: 25, type: "interchange-sm-2" },
        { id: "mountDennis", name: "Mount Dennis", x: -309, y: -100, type: "interchange-sm-2" },
        { id: "weston", name: "Weston", x: -362.5, y: -189, type: "interchange-sm-3" },
    ],
  },
  {
    id: "upExpress",
    name: "UP Express",
    color: "#798e27",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 226 },      
        { cmd: "L", x: -147.5, y: 226 },
        { cmd: "L", x: -258, y: 112 }, 
        { cmd: "L", x: -258, y: 3 },
        { cmd: "L", x: -308, y: -47 },
        { cmd: "L", x: -308, y: -122 },
        { cmd: "L", x: -354, y: -180 },
        { cmd: "L", x: -750, y: -180 },
    ],
    stations: [
       // { id: "union", name: "Union", x: 0, y: 223.5, type: "interchange-sm" },
    ],
  },
  {
    id: "milton",
    name: "Milton Line",
    color: "#ffb61abc",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 234, svc: "peakOnly" },      
        { cmd: "L", x: -151, y: 234 },
        { cmd: "L", x: -266, y: 115 }, 
        { cmd: "L", x: -266, y: 6},
        { cmd: "L", x: -302.5, y: -30 },
        { cmd: "L", x: -400, y: -30 },
    ],
    stations: [
        { id: "lansdowne", name: "Lansdowne", x: -225, y: 25, type: "interchange-sm" },
    ],
  },
  {
    id: "lakeShoreWest",
    name: "Lakeshore West Line",
    color: "#951938",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 242 }, 
        { cmd: "L", x: -200, y: 242 },
        
    ],
    stations: [
        { id: "exhibitionGO", name: "Exhibition GO", x: -187.5, y: 232.5, type: "interchange-sm-3" },

    ],
  },
  {
    id: "lakeShoreEast",
    name: "Lakeshore East Line",
    color: "#e12626",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 242 }, 
        { cmd: "L", x: 100, y: 242 },
        { cmd: "L", x: 128, y: 217 },
        { cmd: "L", x: 180, y: 217 },
        { cmd: "L", x: 217, y: 188 },
        { cmd: "L", x: 217, y: 87.5 },
        { cmd: "L", x: 232.5, y: 68 },
        { cmd: "L", x: 327.5, y: 68 },
        { cmd: "L", x: 362.5, y: 42},
        { cmd: "L", x: 550, y: 42},
        { cmd: "L", x: 625, y: -25},
        { cmd: "L", x: 625, y: -110},
        { cmd: "L", x: 640, y: -125},
        { cmd: "L", x: 700, y: -125},
        { cmd: "L", x: 717.5, y: -142.5},
        { cmd: "L", x: 850, y: -142.5},

        
    ],
    stations: [
        { id: "eastHarbourGO", name: "East Harbour GO", x: 165, y: 208, type: "interchange-sm-3" },
        
    ],
  },
  {
    id: "stouffville",
    name: "Stouffville Line",
    color: "#88512b",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 218 }, 
        { cmd: "L", x: 115, y: 218 },
        { cmd: "L", x: 125, y: 209 },
        { cmd: "L", x: 178, y: 209 },
        { cmd: "L", x: 209, y: 184 },
        { cmd: "L", x: 209, y: 85},
        { cmd: "L", x: 230, y: 60 },
        { cmd: "L", x: 325, y: 60 },
        { cmd: "L", x: 360, y: 34},
        { cmd: "L", x: 470, y: 34},
        { cmd: "L", x: 500, y: 0 },
        { cmd: "L", x: 500, y: -400},
        
    ],
    stations: [
       // { id: "eastHarbourGO", name: "East Harbour GO", x: 100, y: 232.5, type: "interchange-sm-3" },
        
    ],
  },
  
];