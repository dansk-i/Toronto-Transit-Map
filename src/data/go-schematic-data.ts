export const goLines = [
    {
        id: "barrie",
        name: "Barrie Line",
        color: "#ff6219c4",
        thickness: 8,
        pathPoints: [
            { cmd: "M", x: 0, y: 211 }, 
            { cmd: "L", x: -140, y: 211 },
            { cmd: "L", x: -225, y: 114},
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
    color: "#20b345ce",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 218 },    
        { cmd: "L", x: -144, y: 218 },
        { cmd: "L", x: -250, y: 98 },   
        { cmd: "L", x: -250, y: 25 },
    ],
    stations: [
       // { id: "union", name: "Union", x: 0, y: 214.5, type: "interchange-sm" },
    ],
  },
  {
    id: "upExpress",
    name: "UP Express",
    color: "#af9e68de",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 226 },      
        { cmd: "L", x: -147.5, y: 226 },
        { cmd: "L", x: -258, y: 101 }, 
        { cmd: "L", x: -258, y: 25 },
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
        { cmd: "L", x: -266, y: 104 }, 
        { cmd: "L", x: -266, y: 25 },
    ],
    stations: [
        //{ id: "union", name: "Union", x: 0, y: 232, type: "interchange-sm" },
    ],
  },
  {
    id: "lakeShoreWest",
    name: "Lakeshore West Line",
    color: "#005fb8c5",
    thickness: 8,
    pathPoints: [
        { cmd: "M", x: 0, y: 242 }, 
        { cmd: "L", x: -200, y: 242 },
        
    ],
    stations: [
        //{ id: "union", name: "Union", x: 0, y: 245, type: "interchange-sm" },
    ],
  },
  
];