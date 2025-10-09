import { useState, useEffect, useRef } from "react";
import { subwayLines } from "../data/schematic-data";
import { constructionLines } from "../data/schematic-construction";
import { proposedLines } from "../data/schematic-proposed";
import { goLines } from "../data/go-schematic-data";

// Define a helper type for path points
type PathPoint = {
  cmd: "M" | "L" | "Q";
  x: number;
  y: number;
  cx?: number;
  cy?: number;
};

export default function SchematicMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const [showConstruction, setShowConstruction] = useState(true);
  const [showProposed, setShowProposed] = useState(true);
  const [showGO, setShowGO] = useState(true);

  const MAP_W = window.innerWidth;
  const MAP_H = window.innerHeight;

  const Z_MIN = 1;
  const Z_MAX = 3;

  // Screen center (we shift all relative coords here)
  const centerX = MAP_W / 2;
  const centerY = MAP_H / 2;

  // Clamp offsets so you never go beyond original viewBox edges
  const clampOffset = (x: number, y: number, z: number) => {
    const scaledW = MAP_W * z;
    const scaledH = MAP_H * z;

    const maxX = (scaledW - MAP_W) / 2;
    const maxY = (scaledH - MAP_H) / 2;

    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  // Scroll wheel zoom (cursor-aware)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const mouseVec = inside
        ? { x: e.clientX - cx, y: e.clientY - cy }
        : { x: 0, y: 0 };

      setZoom((z) => {
        const dz = e.deltaY < 0 ? 0.1 : -0.1;
        const newZ = Math.min(Z_MAX, Math.max(Z_MIN, z + dz));
        if (newZ === z) return z;

        if (newZ === Z_MIN) {
          setOffset({ x: 0, y: 0 });
        } else {
          const newOffset = {
            x: offset.x + (z - newZ) * mouseVec.x,
            y: offset.y + (z - newZ) * mouseVec.y,
          };
          setOffset(clampOffset(newOffset.x, newOffset.y, newZ));
        }

        return newZ;
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [offset]);

  // Dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom === Z_MIN) return;
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !lastPos) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setOffset((prev) => clampOffset(prev.x + dx, prev.y + dy, zoom));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setLastPos(null);
  };

  // Translate station coords to screen space
  const tx = (x: number) => x + centerX;
  const ty = (y: number) => y + centerY;

  // Merge active lines
  const activeLines = [
    ...(showGO ? goLines : []),
    ...subwayLines,
    ...(showConstruction ? constructionLines : []),
    ...(showProposed ? proposedLines : []),
  ];

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-black relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Switch toggles */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-4">
        {/* Construction toggle */}
        <label className="flex items-center gap-2 text-white">
          <span>Construction</span>
          <button
            onClick={() => setShowConstruction((p) => !p)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              showConstruction ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                showConstruction ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </label>

        {/* Proposed toggle */}
        <label className="flex items-center gap-2 text-white">
          <span>Proposed</span>
          <button
            onClick={() => setShowProposed((p) => !p)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              showProposed ? "bg-cyan-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                showProposed ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </label>

        {/* GO toggle */}
        <label className="flex items-center gap-2 text-white">
          <span>GO Transit</span>
          <button
            onClick={() => setShowGO((p) => !p)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              showGO ? "bg-emerald-500" : "bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                showGO ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </label>

      </div>
      

      <svg
        viewBox={`0 0 ${MAP_W} ${MAP_H}`}
        width={MAP_W}
        height={MAP_H}
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: "center",
          transition: dragging ? "none" : "transform 0.1s ease-out",
          display: "block",
        }}
      >
        {/* Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#444" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Lines */}
        {activeLines.map((line) => {
          if (line.pathPoints) {
            const d = (line.pathPoints as PathPoint[])
              .map((p) => {
                if (p.cmd === "M" || p.cmd === "L") {
                  return `${p.cmd} ${tx(p.x)},${ty(p.y)}`;
                } else if (p.cmd === "Q" && p.cx !== undefined && p.cy !== undefined) {
                  return `Q ${tx(p.cx)},${ty(p.cy)} ${tx(p.x)},${ty(p.y)}`;
                }
                return "";
              })
              .join(" ");

            return (
              <path
                key={line.id}
                d={d}
                stroke={line.color}
                strokeWidth={line.thickness}
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            );
          }
          return null;
        })}

        {/* Stations */}
        {activeLines.flatMap((line) =>
          line.stations.map((s) => (
            <g
              key={`${line.id}-${s.id}`}
              className="cursor-pointer"
              onClick={() => alert(`Clicked station: ${s.name}`)}
            >
              {s.type === "normal" ? (
                <circle
                  cx={tx(s.x)}
                  cy={ty(s.y)}
                  r={4}
                  fill="white"
                  stroke={line.color}
                  strokeWidth={1.25}
                />
              ) : (
                <>
                  <rect
                    x={tx(s.x) - 5.25}
                    y={ty(s.y) - 5.25}
                    width={10.5}
                    height={10.5}
                    fill="grey"
                    rx={1}
                    ry={1}
                  />
                  <circle
                    cx={tx(s.x)}
                    cy={ty(s.y)}
                    r={2.25}
                    fill="white"
                    stroke="black"
                    strokeWidth={0}
                  />
                </>
              )}
            </g>
          ))
        )}
      </svg>
    </div>
  );
}
