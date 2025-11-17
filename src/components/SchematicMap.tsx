import { useState, useEffect, useRef } from "react";
import { subwayLines } from "../data/schematic-data";
import { constructionLines } from "../data/schematic-construction";
import { proposedLines } from "../data/schematic-proposed";
import { goLines } from "../data/go-schematic-data";
import { streetcarLines } from "../data/streetcar-schematic-data";
import {lakes} from "../data/lakes-schematic-data";
import lakeUrl from "../assets/lakes.svg";

// Define a helper type for path points
type PathPoint = {
  cmd: "M" | "L" | "Q";
  x: number;
  y: number;
  cx?: number;
  cy?: number;
  svc?: "rapid" | "limited" | "peakOnly";
};

export default function SchematicMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1.5);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const [showConstruction, setShowConstruction] = useState(true);
  const [showProposed, setShowProposed] = useState(true);
  const [showGO, setShowGO] = useState(true);

  const MAP_W = window.innerWidth;
  const MAP_H = window.innerHeight;

  const Z_MIN = 1;
  const Z_MAX = 5;

  // size of the lake artwork (its SVG viewBox)
  const LAKE_W = 1280;
  const LAKE_H = 800;

  // tweak these live to line it up
  const LAKE_SCALE = 2;   // 0.9, 1.1, etc.
  const LAKE_DX = 325;        // +right / -left
  const LAKE_DY = -87.5;        // +down  / -up

  // Screen center 
  const centerX = MAP_W / 2;
  const centerY = MAP_H / 2;

  // Clamp offsets so you never go beyond original viewBox edges
  const clampOffset = (x: number, y: number, z: number) => {
    const scaledW = MAP_W * z;
    const scaledH = MAP_H * z;

    // when z < 1, (scaledW - MAP_W) is negative → clamp to 0 to avoid weirdness
    const maxX = Math.max(0, (scaledW - MAP_W) / 2);
    const maxY = Math.max(0, (scaledH - MAP_H) / 2);

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
  const tx = (x: number) => x + centerX * 2;
  const ty = (y: number) => y + centerY * 2;

  // Service-styling 
    const MAP_BG = "#000"; 

    type Svc = "rapid" | "limited" | "peakOnly"; 

    function buildServiceSegments(points: PathPoint[], tx: (n:number)=>number, ty:(n:number)=>number) {
      type Svc = "rapid" | "limited" | "peakOnly";
      const segs: { d: string; svc: Svc }[] = [];
      if (!points.length) return segs;

      const toAbs = (x:number, y:number) => `${tx(x)},${ty(y)}`;

      // Start path at the first point
      let d = `M ${toAbs(points[0].x, points[0].y)} `;
      let currentSvc: Svc = (points[0].svc as Svc) ?? "rapid";

      const flush = () => {
        if (d.trim()) segs.push({ d: d.trim(), svc: currentSvc });
        d = "";
      };

      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const edgeSvc: Svc = (prev.svc as Svc) ?? currentSvc;

        if (edgeSvc !== currentSvc) {
          flush();
          currentSvc = edgeSvc;
          d = `M ${toAbs(prev.x, prev.y)} `;
        }

        // Draw the edge prev to curr with the current style
        if (curr.cmd === "Q" && curr.cx !== undefined && curr.cy !== undefined) {
          d += `Q ${toAbs(curr.cx, curr.cy)} ${toAbs(curr.x, curr.y)} `;
        } else {
          d += `L ${toAbs(curr.x, curr.y)} `;
        }
      }

      flush();
      return segs;
    }


    function renderGoStrokeBySvc(svc: Svc, color: string, thickness: number, d: string, key: string) {
      switch (svc) {
        case "limited":
          // Hollow 
          return (
            <g key={key}>
              <path
                d={d}
                stroke={color}
                strokeWidth={thickness}
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={d}
                stroke={MAP_BG}
                strokeWidth={Math.max(1, thickness - 3)} // tweak inner gap by changing 3
                strokeLinejoin="round"
                strokeLinecap="round"
                fill="none"
              />
            </g>
          );
        case "peakOnly":
          // Dashed
          return (
            <path
              key={key}
              d={d}
              stroke={color}
              strokeWidth={thickness}
              strokeLinejoin="round"
              strokeLinecap="butt"
              strokeDasharray="4 4" // tweak pattern
              fill="none"
            />
          );
        case "rapid":
        default:
          // Solid
          return (
            <path
              key={key}
              d={d}
              stroke={color}
              strokeWidth={thickness}
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          );
      }
    }
// ---------------------------------------------------------------------------


  // Map each line object
  const srcByRef = new WeakMap<object, "go" | "subway" | "construction" | "proposed" | "lake">();

  goLines.forEach(l => srcByRef.set(l, "go"));
  lakes.forEach(l => srcByRef.set(l, "lake"));
  subwayLines.forEach(l => srcByRef.set(l, "subway"));
  constructionLines.forEach(l => srcByRef.set(l, "construction"));
  proposedLines.forEach(l => srcByRef.set(l, "proposed"));

  const goIds = new Set(goLines.map(l => l.id));

  // Merge active lines
  const activeLines = [
    ...lakes,
    ...(showGO ? goLines : []),
    ...streetcarLines,
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
            onClick={() => setShowGO((v) => !v)}
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
        viewBox={`0 0 ${MAP_W * 2} ${MAP_H * 2}`}
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

      {/* Great Lakes background */}
      <g style={{ pointerEvents: "none" }}>
        <image
          href={lakeUrl}
          // center the lake on your world, then nudge by DX/DY
          x={centerX * 2 - (LAKE_W * LAKE_SCALE) / 2 + LAKE_DX}
          y={centerY * 2 - (LAKE_H * LAKE_SCALE) / 2 + LAKE_DY}
          width={LAKE_W * LAKE_SCALE}
          height={LAKE_H * LAKE_SCALE}
          opacity={0.5}
          // use "none" only for stretch
          preserveAspectRatio="xMidYMid meet"
        />
      </g>

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

            if (srcByRef.get(line) === "go") {
              const segs = buildServiceSegments(line.pathPoints as PathPoint[], tx, ty);
              return (
                <>
                  {segs.map((seg, idx) =>
                    renderGoStrokeBySvc(
                      seg.svc,
                      line.color,
                      line.thickness,
                      seg.d,
                      `${srcByRef.get(line) ?? "unknown"}-${line.id}-seg-${idx}`
                    )
                  )}
                </>
              );
            }
            return (
              <path
                key={`${srcByRef.get(line) ?? "unknown"}-${line.id}`}
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
        {activeLines
          .filter(line => !goIds.has(line.id))
          .flatMap((line) =>
            line.stations.map((s) => {
              const cx = tx(s.x);
              const cy = ty(s.y);

              if (s.type === "normal") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <circle cx={cx} cy={cy} r={4} fill="white" stroke={line.color} strokeWidth={1.5} />
                  </g>
                );
              }

              if (s.type === "interchange") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5.25} y={cy - 5.25} width={10.5} height={10.5} fill="grey" rx={1} ry={1} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }

              if (s.type === "interchange-sm") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5} y={cy - 5} width={10} height={10} fill="grey" rx={3} ry={3} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }
              
              if (s.type === "finchWest") {
                return (
                   <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5.25} y={cy - 5.25} width={10.5} height={10.5} fill="grey" rx={3} ry={3}  transform={`rotate(45 ${cx} ${cy})`} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }

              return null;
            })
          )
        }

        {/* Stations - GO */}
        {activeLines
          .filter(line => goIds.has(line.id))
          .flatMap((line) =>
            line.stations.map((s) => {
              const cx = tx(s.x);
              const cy = ty(s.y);

              if (s.type === "normal") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <circle cx={cx} cy={cy} r={4} fill="white" stroke={line.color} strokeWidth={1.25} />
                  </g>
                );
              }

              if (s.type === "interchange") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5.25} y={cy - 5.25} width={10.5} height={10.5} fill="grey" rx={1} ry={1} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }

              if (s.type === "interchange-sm") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5} y={cy - 5} width={10} height={10} fill="grey" rx={2} ry={2} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }

              if (s.type === "interchange-sm-2") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5} y={cy - 5} width={20} height={10} fill="grey" rx={3} ry={3} />
                    <circle cx={cx + 1} cy={cy} r={2.5} fill="white" />
                    <circle cx={cx + 9} cy={cy} r={2.5} fill="white" />
                  </g>
                );
              }

              if (s.type === "interchange-sm-3") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5} y={cy - 5} width={10} height={20} fill="grey" rx={3} ry={3} />
                    <circle cx={cx} cy={cy + 1} r={2.5} fill="white" />
                    <circle cx={cx} cy={cy + 9} r={2.5} fill="white" />
                  </g>
                );
              }

              if (s.type === "union") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={() => alert(`Clicked station: ${s.name}`)}
                  >
                    <rect x={cx - 5} y={cy - 5} width={10} height={52.5} fill="grey" rx={3} ry={3} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                    <circle cx={cx} cy={cy + 10} r={2.25} fill="white" />
                    <circle cx={cx} cy={cy + 18} r={2.25} fill="white" />
                    <circle cx={cx} cy={cy + 26} r={2.25} fill="white" />
                    <circle cx={cx} cy={cy + 34} r={2.25} fill="white" />
                    <circle cx={cx} cy={cy + 42} r={2.25} fill="white" />
                  </g>
                );
              }

              return null;
            })
          )
        }

      </svg>
    </div>
  );
}
