import { useState } from 'react';

const lines = [
  {
    name: 'Line 1',
    color: '#FFCA09',
    visible: true,
    segments: [
      { x1: 100, y1: 100, x2: 100, y2: 400 },
      { x1: 100, y1: 400, x2: 400, y2: 400 }
    ],
    stations: [
      { name: 'Station A', x: 100, y: 100 },
      { name: 'Station B', x: 100, y: 250 },
      { name: 'Station C', x: 100, y: 400 },
      { name: 'Station D', x: 250, y: 400 },
      { name: 'Station E', x: 400, y: 400 }
    ]
  }
];

export default function SchematicMap() {
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  return (
    <div className="w-full h-screen bg-neutral-900">
      <svg
        viewBox="0 0 1000 1000"
        width="100%"
        height="100%"
        className="text-white"
      >
        {lines.map(
          line =>
            line.visible && (
              <g
                key={line.name}
                onMouseEnter={() => setHoveredLine(line.name)}
                onMouseLeave={() => setHoveredLine(null)}
              >
                {line.segments.map((s, i) => (
                  <line
                    key={i}
                    x1={s.x1}
                    y1={s.y1}
                    x2={s.x2}
                    y2={s.y2}
                    stroke={hoveredLine === line.name ? 'white' : line.color}
                    strokeWidth={hoveredLine === line.name ? 12 : 8}
                    strokeLinecap="round"
                  />
                ))}
                {line.stations.map(station => (
                  <circle
                    key={station.name}
                    cx={station.x}
                    cy={station.y}
                    r={hoveredStation === station.name ? 10 : 6}
                    fill="black"
                    stroke="white"
                    strokeWidth={2}
                    onMouseEnter={() => setHoveredStation(station.name)}
                    onMouseLeave={() => setHoveredStation(null)}
                    onClick={() => alert(`Clicked on ${station.name}`)}
                  />
                ))}
              </g>
            )
        )}
      </svg>
    </div>
  );
}
