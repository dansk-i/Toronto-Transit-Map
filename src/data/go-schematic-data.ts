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
        { id: "weston", name: "Weston", x: -362.5, y: -187.5, type: "interchange-sm-3" },
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
        { cmd: "M", x: 0, y: 234 },      
        { cmd: "L", x: -151, y: 234 },
        { cmd: "L", x: -266, y: 115 }, 
        { cmd: "L", x: -266, y: 25 },
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
        { id: "exhibitionGO", name: "Exhibition GO", x: -187.5, y: 242, type: "interchange-sm" },
    ],
  },
  
];