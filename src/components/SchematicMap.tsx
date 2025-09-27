import { useState, useEffect, useRef } from "react";
import { subwayLines } from "../data/schematic-data";

export default function SchematicMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

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

  // Helper: translate station coords to screen space
  const tx = (x: number) => x + centerX;
  const ty = (y: number) => y + centerY;

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-black relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
        {subwayLines.map((line) => {
        if (line.pathPoints) {
          const d = line.pathPoints.map((p) => {
            if (p.cmd === "M" || p.cmd === "L") {
              return `${p.cmd} ${tx(p.x)},${ty(p.y)}`;
            } else if (p.cmd === "Q") {
              return `Q ${tx(p.cx!)},${ty(p.cy!)} ${tx(p.x)},${ty(p.y)}`;
            }
            return "";
          }).join(" ");

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
        {subwayLines.flatMap((line) =>
          line.stations.map((s) => (
            <g
              key={`${line.id}-${s.id}`}
              className="cursor-pointer"
              onClick={() => alert(`Clicked station: ${s.name}`)}
            >
              {s.type === "normal" ? (
                <circle cx={tx(s.x)} cy={ty(s.y)} r={4} fill="white" stroke="black" strokeWidth={0} />
              ) : (
                <>
                  <rect
                    x={tx(s.x) - 5}
                    y={ty(s.y) - 5}
                    width={10}
                    height={10}
                    fill="grey"
                    rx={0}
                    ry={0}
                  />
                  <circle
                    cx={tx(s.x)}
                    cy={ty(s.y)}
                    r={2}
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
