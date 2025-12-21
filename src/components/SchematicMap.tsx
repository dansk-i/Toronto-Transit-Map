import { useState, useEffect, useRef } from "react";
import { subwayLines } from "../data/schematic-data";
import { constructionLines } from "../data/schematic-construction";
import { proposedLines } from "../data/schematic-proposed";
import { goLines } from "../data/go-schematic-data";
import { streetcarLines } from "../data/streetcar-schematic-data";
import {lakes} from "../data/lakes-schematic-data";
import lakeUrl from "../assets/lakes.svg";
import lakeUrl2 from "../assets/lakes2.svg";
import goBarrie from "../assets/GO_Barrie.svg";
import goKitchener from "../assets/GO_Kitchener.svg";
import goLakeshoreEast from "../assets/GO_Lakeshore_East.svg";
import goLakeshoreWest from "../assets/GO_Lakeshore_West.svg";
import goMilton from "../assets/GO_Milton.svg";
import goRichmondHill from "../assets/GO_Richmond_Hill.svg";
import goStouffville from "../assets/GO_Stouffville.svg";
import upExpress from "../assets/UP_Express.svg";

// ---------------------------------------------------------------------------


// Define a helper type for path points
type PathPoint = {
  cmd: "M" | "L" | "Q";
  x: number;
  y: number;
  cx?: number;
  cy?: number;
  svc?: "rapid" | "limited" | "peakOnly";
};



type PopupKind = "line" | "station";
type PopupPlacement = "left" | "right" | "top" | "bottom";

type PopupState =
  | {
      kind: "line";
      x: number; // px relative to container
      y: number;
      name: string;
      color?: string;
      logo?: React.ReactNode;
    }
  | {
      kind: "station";
      x: number;
      y: number;
      name: string;
      logo?: React.ReactNode;
      // you can expand this later
      details?: Array<{ label: string; value: string }>;
    }
  | null;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function LineBadge({ color }: { color?: string }) {
  return (
    <div
      className="h-8 w-8 rounded-xl border border-white/10"
      style={{ backgroundColor: color ?? "rgba(255,255,255,0.15)" }}
      aria-hidden="true"
    />
  );
}

// Placeholder logo (swap this with real SVG whenever)
function TTCLogo() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
      <circle cx="32" cy="32" r="30" fill="currentColor" opacity="0.15" />
      <path d="M16 22h32v6H35v22h-6V28H16z" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

const LINE_LOGOS: Record<string, React.ReactNode> = {
    // GO lines (keyed by goLines[i].id)
    barrie: <img src={goBarrie} className="h-10 w-10" alt="Barrie Line" />,
    kitchener: <img src={goKitchener} className="h-10 w-10" alt="Kitchener Line" />,
    lakeShoreEast: <img src={goLakeshoreEast} className="h-10 w-10" alt="Lakeshore East Line" />,
    lakeShoreWest: <img src={goLakeshoreWest} className="h-10 w-10" alt="Lakeshore West Line" />,
    milton: <img src={goMilton} className="h-10 w-10" alt="Milton Line" />,
    richmondHill: <img src={goRichmondHill} className="h-10 w-10" alt="Richmond Hill Line" />,
    stouffville: <img src={goStouffville} className="h-10 w-10" alt="Stouffville Line" />,
    upExpress: <img src={upExpress} className="h-10 w-10" alt="UP Express" />,


    // Special cases / branches that should share a logo:
    "lakeShoreWest-Hamilton": <img src={goLakeshoreWest} className="h-10 w-10" alt="Lakeshore West (Hamilton)" />,

    // TTC subway (if you want to keep these)
    "Line 1": <TTCLogo />,
    "Line 2": <TTCLogo />,
    "Line 4": <TTCLogo />,
};



function LinePopupContent({ logo, name }: { logo?: React.ReactNode; name: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">{logo}</div>
      <div>
        <div className="text-sm font-semibold leading-tight">{name}</div>
        <div className="mt-1 text-xs text-white/70">Line</div>
      </div>
    </div>
  );
}

function StationPopupContent({
  logo,
  name,
  details,
}: {
  logo?: React.ReactNode;
  name: string;
  details?: Array<{ label: string; value: string }>;
}) {
  return (
    <div className="min-w-[260px]">
      {/* Header with logo slot */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <div className="shrink-0">{logo}</div>
        <div className="min-w-0">
          <div className="text-base font-semibold leading-tight">{name}</div>
          <div className="mt-0.5 text-xs text-white/70">Station</div>
        </div>
      </div>

      {/* Details */}
      <div className="pt-3 space-y-2">
        {details?.length ? (
          details.map((d, i) => (
            <div key={i} className="flex items-start justify-between gap-3">
              <div className="text-xs text-white/60">{d.label}</div>
              <div className="text-xs text-white/85 text-right">{d.value}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-white/75 leading-relaxed">
            Station details go here (lines served, transfers, accessibility, notes).
          </div>
        )}
      </div>
    </div>
  );
}

function MapPopup({
  x,
  y,
  placement = "left",
  onClose,
  children,
  containerWidth,
  containerHeight,
}: {
  x: number;
  y: number;
  placement?: PopupPlacement;
  onClose?: () => void;
  children: React.ReactNode;
  containerWidth?: number;
  containerHeight?: number;
}) {
  const safeX = containerWidth != null ? clamp(x, 12, containerWidth - 12) : x;
  const safeY = containerHeight != null ? clamp(y, 12, containerHeight - 12) : y;


  const translateByPlacement: Record<PopupPlacement, string> = {
    left: "translate(16px, -50%)",
    right: "translate(calc(-100% - 16px), -50%)",
    top: "translate(-50%, 16px)",
    bottom: "translate(-50%, calc(-100% - 16px))",
  };

  const tailByPlacement: Record<PopupPlacement, string> = {
    left:
      "absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-neutral-700/95 border-l border-b border-white/10",
    right:
      "absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 bg-neutral-700/95 border-r border-t border-white/10",
    top:
      "absolute left-1/2 -top-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-neutral-700/95 border-l border-t border-white/10",
    bottom:
      "absolute left-1/2 -bottom-2 h-4 w-4 -translate-x-1/2 rotate-45 bg-neutral-700/95 border-r border-b border-white/10",
  };

  return (
    <div
      data-popup="1"
      className="absolute z-50"
      style={{ left: safeX, top: safeY, transform: translateByPlacement[placement] }}
    >
      <div className="relative">
        <div className={tailByPlacement[placement]} />
        <div data-popup="1" className="relative min-w-[220px] max-w-[360px] rounded-2xl border border-white/10 bg-neutral-700/95 text-white shadow-xl backdrop-blur" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-2 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-white/80 hover:bg-black/35"
              type="button"
              aria-label="Close popup"
            >
              ✕
            </button>
          )}
          <div className="p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
// ---------------------------------------------------------------------------



export default function SchematicMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [zoom, setZoom] = useState(2);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);

  const [showConstruction, setShowConstruction] = useState(true);
  const [showProposed, setShowProposed] = useState(true);
  const [showGO, setShowGO] = useState(true);
  const [showStreetcar, setShowStreetcar] = useState(true);

  const [popup, setPopup] = useState<PopupState>(null);

  const getRelativePoint = (e: React.MouseEvent) => {
  const rect = containerRef.current?.getBoundingClientRect();
  if (!rect) return null;
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
};


  const svgPointToContainerPx = (svgX: number, svgY: number) => {
  const svg = svgRef.current;
  const container = containerRef.current;
  if (!svg || !container) return null;

  const pt = svg.createSVGPoint();
  pt.x = svgX;
  pt.y = svgY;

  const screen = pt.matrixTransform(svg.getScreenCTM()!);

  const rect = container.getBoundingClientRect();
  return {
    x: screen.x - rect.left,
    y: screen.y - rect.top,
    w: rect.width,
    h: rect.height,
  };
};


  const showLinePopup = (
    e: React.MouseEvent,
    displayName: string,
    lineColor?: string,
    logoKey?: string
  ) => {
    const p = getRelativePoint(e);
    if (!p) return;

    const key = logoKey ?? displayName;

    setPopup({
      kind: "line",
      x: p.x,
      y: p.y,
      name: displayName, 
      color: lineColor,
      logo: LINE_LOGOS[key] ?? <LineBadge color={lineColor} />, 
    });
  };


  const showStationPopupAt = (stationName: string, svgX: number, svgY: number) => {
  const p = svgPointToContainerPx(svgX, svgY);
  if (!p) return;

  setPopup({
    kind: "station",
    x: p.x,
    y: p.y,
    name: stationName,
    logo: <TTCLogo />,
    details: [
      { label: "Lines", value: "Line 1" },
      { label: "Transfers", value: "—" },
      { label: "Accessibility", value: "—" },
    ],
  });
};



  const MAP_W = window.innerWidth;
  const MAP_H = window.innerHeight;

  const Z_MIN = 1;
  const Z_MAX = 5;

  // size of the lake artwork (its SVG viewBox)
  const LAKE_W = 2000;
  const LAKE_H = 800;

  // tweak these live to line it up
  const LAKE_SCALE = 2;   // 0.9, 1.1, etc.
  const LAKE_DX = 25;        // +right / -left
  const LAKE_DY = 225;        // +down  / -up

  // Screen center 
  const centerX = MAP_W / 2;
  const centerY = (MAP_H / 2) + 25;

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

      if (inside) setPopup(null);

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
  const target = e.target as Element | null;

  // ✅ don't start dragging if mousedown begins on a station/line OR on the popup
  if (target?.closest?.('[data-interactive="1"]')) return;
  if (target?.closest?.('[data-popup="1"]')) return;

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


    function renderGoStrokeBySvc(
  svc: Svc,
  color: string,
  thickness: number,
  d: string,
  key: string,
  onClick?: (e: React.MouseEvent) => void
) {
  const hitProps = {
    className: "cursor-pointer",
    "data-interactive": "1" as const,
    onMouseDown: (e: React.MouseEvent) => e.stopPropagation(),
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation();
      onClick?.(e);
    },
  };

  switch (svc) {
    case "limited":
      // Hollow: OUTER color + INNER background
      // Add a fat invisible hit-path on top so it's easy to click
      return (
        <g key={key}>
          {/* visible */}
          <path
            d={d}
            stroke={color}
            strokeWidth={thickness}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "none" }}
          />
          <path
            d={d}
            stroke={MAP_BG}
            strokeWidth={Math.max(1, thickness - 3)}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "none" }}
          />

          {/* invisible fat click target */}
          <path
            d={d}
            stroke="transparent"
            strokeWidth={Math.max(14, thickness + 10)}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "stroke" }}
            {...hitProps}
          />
        </g>
      );

    case "peakOnly":
      // Dashed (same: add invisible hit-path)
      return (
        <g key={key}>
          {/* visible */}
          <path
            d={d}
            stroke={color}
            strokeWidth={thickness}
            strokeLinejoin="round"
            strokeLinecap="butt"
            strokeDasharray="4 4"
            fill="none"
            style={{ pointerEvents: "none" }}
          />

          {/* invisible fat click target */}
          <path
            d={d}
            stroke="transparent"
            strokeWidth={Math.max(14, thickness + 10)}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "stroke" }}
            {...hitProps}
          />
        </g>
      );

    case "rapid":
    default:
      // Solid (same: add invisible hit-path)
      return (
        <g key={key}>
          {/* visible */}
          <path
            d={d}
            stroke={color}
            strokeWidth={thickness}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "none" }}
          />

          {/* invisible fat click target */}
          <path
            d={d}
            stroke="transparent"
            strokeWidth={Math.max(14, thickness + 10)}
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            style={{ pointerEvents: "stroke" }}
            {...hitProps}
          />
        </g>
      );
  }
}

// ---------------------------------------------------------------------------


  // Map each line object
  const srcByRef = new WeakMap<object, "go" | "subway" | "construction" | "proposed" | "lake" | "streetcar">();

  goLines.forEach(l => srcByRef.set(l, "go"));
  lakes.forEach(l => srcByRef.set(l, "lake"));
  subwayLines.forEach(l => srcByRef.set(l, "subway"));
  constructionLines.forEach(l => srcByRef.set(l, "construction"));
  proposedLines.forEach(l => srcByRef.set(l, "proposed"));
  streetcarLines.forEach(l => srcByRef.set(l, "streetcar"));

  const goIds = new Set(goLines.map(l => l.id));

  // Merge active lines
  const activeLines = [
    ...lakes,
    ...(showStreetcar ? streetcarLines : []),
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
      onClick={(e) => {
        const el = e.target as Element | null;

        // Don't close if you clicked a station/line (interactive) or inside the popup bubble
        if (el?.closest?.('[data-interactive="1"]')) return;
        if (el?.closest?.('[data-popup="1"]')) return;

        setPopup(null);
      }}

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
        {/* <label className="flex items-center gap-2 text-white">
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
        </label> */}

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

         {/* Streetcar toggle */}
          <label className="flex items-center gap-2 text-white">
            <span>Streetcar</span>
            <button
              onClick={() => setShowStreetcar(v => !v)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                showStreetcar ? "bg-red-500" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transform transition-transform ${
                  showStreetcar ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </label>

      </div>
      

      <svg
        ref={svgRef}
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

      
      {/*  Simcoe */}
      <g style={{ pointerEvents: "none" }}>
        <image
          href={lakeUrl2}
          x={centerX * 2 - (LAKE_W * LAKE_SCALE) / 2 - 187.5}
          y={centerY * 2 - (LAKE_H * LAKE_SCALE) / 2 - 400}
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
                      `${srcByRef.get(line) ?? "unknown"}-${line.id}-seg-${idx}`,
                      (e) => showLinePopup(e, line.name, line.color, line.id) 
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
                className="cursor-pointer"
               onClick={(e) => {
                e.stopPropagation();
                showLinePopup(e, line.name, line.color, line.id); 
              }}

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
                    onMouseDown={(e) => e.stopPropagation()}  
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    data-interactive="1"
                    onMouseDown={(e) => e.stopPropagation()}  
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
                  >
                    <rect x={cx - 5.25} y={cy - 5.25} width={10.5} height={10.5} fill="grey" rx={3} ry={3}  transform={`rotate(45 ${cx} ${cy})`} />
                    <circle cx={cx} cy={cy} r={2.25} fill="white" />
                  </g>
                );
              }

               if (s.type === "interchange-sm-3") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
                  >
                    <rect x={cx - 5} y={cy - 5} width={10} height={20} fill="grey" rx={3} ry={3} />
                    <circle cx={cx} cy={cy + 1} r={2.5} fill="white" />
                    <circle cx={cx} cy={cy + 9} r={2.5} fill="white" />
                  </g>
                );
              }

              if (s.type === "loop") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className=""
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
                  >
                    {/* Outer ring */}
                    <circle cx={cx} cy={cy} r={2.5} fill={line.color} />
                    {/* Inner hole */}
                    <circle cx={cx} cy={cy} r={1} fill="black" />
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
                  >
                    <circle cx={cx} cy={cy} r={4} fill="white" stroke={line.color} strokeWidth={1.25} />
                  </g>
                );
              }

               if (s.type === "normal-sm") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                   onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
                  >
                    <circle cx={cx} cy={cy} r={3} fill="white" stroke={line.color} strokeWidth={1} />
                  </g>
                );
              }


              if (s.type === "interchange") {
                return (
                  <g
                    key={`${srcByRef.get(line) ?? "unknown"}-${line.id}-${s.id}`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      showStationPopupAt(s.name, cx, cy);
                    }}
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
        {popup && (
        <MapPopup
          x={popup.x}
          y={popup.y}
          placement="left"
          onClose={() => setPopup(null)}
          containerWidth={containerRef.current?.getBoundingClientRect().width}
          containerHeight={containerRef.current?.getBoundingClientRect().height}
        >
          {popup.kind === "line" ? (
            <LinePopupContent logo={popup.logo} name={popup.name} />
          ) : (
            <StationPopupContent logo={popup.logo} name={popup.name} details={popup.details} />
          )}
        </MapPopup>
      )}
    </div>
  );
}
