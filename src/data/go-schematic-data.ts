export const goLines = [
  {
    id: "kitchener",
    name: "Kitchener Line",
    color: "#20b345ff",
    thickness: 7.5,
    pathPoints: [
        { cmd: "M", x: 0, y: 216 }, 
        { cmd: "L", x: -145, y: 216 },
        { cmd: "L", x: -275, y: 100},
        { cmd: "L", x: -275, y: 25 },
    ],
    stations: [
        { id: "union", name: "Union", x: 0, y: 216, type: "interchange" },
    ],
  },
  {
    id: "upExpress",
    name: "UP Express",
    color: "#af9f68ff",
    thickness: 7.5,
    pathPoints: [
        { cmd: "M", x: 0, y: 223.5 }, 
        { cmd: "L", x: -148, y: 223.5 },
        { cmd: "L", x: -282.5, y: 103},
        { cmd: "L", x: -282.5, y: 25 },
    ],
    stations: [
        { id: "union", name: "Union", x: 0, y: 224, type: "interchange" },
    ],
  },
{
    id: "barrie",
    name: "Barrie Line",
    color: "#ff6319ff",
    thickness: 7.5,
    pathPoints: [
        { cmd: "M", x: 0, y: 208.5 }, 
        { cmd: "L", x: -142.5, y: 208.5 },
        { cmd: "L", x: -250, y: 112.5},
        { cmd: "L", x: -250, y: 25 },
    ],
    stations: [
        { id: "union", name: "Union", x: 0, y: 208, type: "interchange" },
    ],
  },
  {
    id: "milton",
    name: "Milton Line",
    color: "#ffb81aff",
    thickness: 7.5,
    pathPoints: [
        { cmd: "M", x: 0, y: 230.5 }, 
        { cmd: "L", x: -150, y: 230.5 },
        { cmd: "L", x: -290, y: 104.5},
        { cmd: "L", x: -290, y: 25 },
    ],
    stations: [
        { id: "union", name: "Union", x: 0, y: 232, type: "interchange" },
    ],
  },
  {
    id: "lakeShoreWest",
    name: "Lakeshore West Line",
    color: "#005eb8ff",
    thickness: 7.5,
    pathPoints: [
        { cmd: "M", x: 0, y: 239 }, 
        { cmd: "L", x: -200, y: 239 },
        
    ],
    stations: [
        { id: "union", name: "Union", x: 0, y: 240, type: "interchange" },
    ],
  },
  
];