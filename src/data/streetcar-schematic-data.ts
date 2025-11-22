export const streetcarLines = [
  {
    id: "501",
    name: "501 Queen",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -300, y: 145 },
        { cmd: "L", x: 400, y: 145 },
    ],
    stations: [
       { id: "neville-park", name: "Neville Park Loop", x: 400, y: 145, type: "loop" }
    ],
  },
  {
    id: "504A",
    name: "501A King",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -260, y: 25 },
        { cmd: "L", x: -275, y: 32.5 },
        { cmd: "L", x: -275, y: 145 },
        { cmd: "L", x: -250, y: 170 },
        { cmd: "L", x: 115, y: 170 },
        { cmd: "L", x: 122.5, y: 162.5 },
        { cmd: "L", x: 122.5, y: 220 },
    ],
    stations: [
      // { id: "distillery", name: "Distillery Loop", x: 120, y: 212.5, type: "loop" }
    ],
  },
  {
    id: "504B",
    name: "501B King",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -220, y: 212.5 },
        { cmd: "L", x: -220, y: 170 },
        { cmd: "L", x: 115, y: 170 },
        { cmd: "L", x: 125, y: 160 },
        { cmd: "L", x: 125, y: 25 },
    ],
    stations: [
        { id: "dufferin-gate", name: "Dufferin Gate Loop", x: -220, y: 212.5, type: "loop" }
    ],
  },
];