export const streetcarLines = [
  {
    id: "501",
    name: "501 Queen",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -275, y: 145 },
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
        { cmd: "L", x: 122.5, y: 227.5 },
    ],
    stations: [
       //{ id: "distillery", name: "Distillery Loop", x: 122.5, y: 220, type: "loop" }
    ],
  },
  {
    id: "504B",
    name: "501B King",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -220, y: 225 },
        { cmd: "L", x: -220, y: 170 },
        { cmd: "L", x: 115, y: 170 },
        { cmd: "L", x: 125, y: 160 },
        { cmd: "L", x: 125, y: 25 },
    ],
    stations: [
        { id: "dufferin-gate", name: "Dufferin Gate Loop", x: -220, y: 225, type: "loop" }
    ],
  },
  {
    id: "510",
    name: "510 Spadina",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -60, y: 25 },
        { cmd: "L", x: -60, y: 265 },
    ],
    stations: [
       //{ id: "neville-park", name: "Neville Park Loop", x: 400, y: 145, type: "loop" }
    ],
  },
  {
    id: "511",
    name: "511 Bathurst",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
        { cmd: "M", x: -112.5, y: 25 },
        { cmd: "L", x: -112.5, y: 265 },
    ],
    stations: [
       //{ id: "neville-park", name: "Neville Park Loop", x: 400, y: 145, type: "loop" }
    ],
  },
  {
    id: "506",
    name: "506 Carlton",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      { cmd: "M", x: -325, y: 80.5 },
      { cmd: "L", x: 75, y: 80.5 },
      { cmd: "L", x: 75, y: 92.5 },
      { cmd: "L", x: 75, y: 92.5 },
      { cmd: "L", x: 335, y: 92.5 },
      { cmd: "L", x: 335, y: 80.5 },
      { cmd: "L", x: 375, y: 80.5 },
      { cmd: "L", x: 375, y: 25 },
    ],
    stations: [
       { id: "high-park", name: "High Park Loop", x: -325, y: 80.5, type: "loop" }
    ],
  },
  {
    id: "505",
    name: "505 Dundas",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      { cmd: "M", x: -275, y: 62.5 },
      { cmd: "L", x: -250, y: 80.5 },
      { cmd: "L", x: -225, y: 105.5 },
      { cmd: "L", x: 125, y: 105.5},
      { cmd: "L", x: 125, y: 25},
    ],
    stations: [
       //{ id: "neville-park", name: "Neville Park Loop", x: 400, y: 145, type: "loop" }
    ],
  },
  {
    id: "503",
    name: "503 Kingston Rd",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      { cmd: "M", x: 395, y: 112.5 },
      { cmd: "L", x: 350, y: 145 },
      
    ],
    stations: [
       { id: "neville-park", name: "Neville Park Loop", x: 395, y: 112.5, type: "loop" }
    ],
  },
  {
    id: "508",
    name: "508 Lake Shore",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      // { cmd: "M", x: -275, y: 145 },
      // { cmd: "L", x: -350, y: 255 },
      // { cmd: "L", x: -440, y: 255 },
      // { cmd: "L", x: -450, y: 242 },

      { cmd: "M", x: -275, y: 145 },
      { cmd: "L", x: -330, y: 145 },
      { cmd: "L", x: -350, y: 165 },
      { cmd: "L", x: -350, y: 255 },
      { cmd: "L", x: -360, y: 265 },
      { cmd: "L", x: -490, y: 265 },
      { cmd: "L", x: -500, y: 255 },
      { cmd: "L", x: -500, y: 242 },
      
      
    ],
    stations: [
      // { id: " distilleryLoop", name: " Distillery Loop", x: 395, y: 112.5, type: "loop" }
    ],
  },
  {
    id: "509",
    name: "509 Harbourfront",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      { cmd: "M", x: -187.5, y: 232.5 },
      { cmd: "L", x: -187.5, y: 265 },
      { cmd: "L", x: 0, y: 265 },
      { cmd: "L", x: 0, y: 200 },
      
    ],
    stations: [
       { id: "exhibitionLoop", name: "Exhibition Loop", x: -187.5, y: 232.5, type: "loop" }
    ],
  },
  {
    id: "WaterfrontEast",
    name: "Waterfront East LRT",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
      // { cmd: "M", x: 0, y: 240 },
      // { cmd: "L", x: 0, y: 265 },
      // { cmd: "L", x: 122.5, y: 265 },
      // { cmd: "L", x: 122.5, y: 230 },
      // { cmd: "L", x: 122.5, y: 280 },
      //{ cmd: "L", x: 130, y: 275 },
      
      
    ],
    stations: [
       //{ id: "villiers", name: "Villiers Loop", x: 122.5, y: 280, type: "loop" }
    ],
  },
  {
    id: "512",
    name: "512 St. Clair",
    color: "#800000",
    thickness: 2.5,
    pathPoints: [
       { cmd: "M", x: 25, y: -50 },
       { cmd: "L", x: -337.5, y: -50 },
      
      
    ],
    stations: [
       { id: "gunnsLoop", name: "Gunns Loop", x: -337.5, y: -50, type: "loop" }
    ],
  },
];