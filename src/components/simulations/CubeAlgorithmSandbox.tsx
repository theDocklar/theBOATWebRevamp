"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Play, RotateCcw, Zap, ShieldAlert, Cpu, Database, Eye } from "lucide-react";

interface NodeOption {
  label: string;
  score: number;
}

interface SimNode {
  id: string;
  opts: NodeOption[];
  dead?: boolean;
}

interface ScenarioConfig {
  id: string;
  title: string;
  trigger: string;
  startLabel: string;
  focus: [number, number, number];
  radius: number;
  nodes: SimNode[];
  pivot?: {
    stackIdx: number;
    optIdx: number;
    id: string;
    log: string;
    continueDirs: number[];
    continueLogs: string[];
  };
  doneMsg: string;
  doneLog: string;
}

const SMART_HOME: ScenarioConfig = {
  id: "smart_home",
  title: "Simulation 1: Probabilistic Lattice (Smart Home)",
  trigger: "Core Trigger A: Room temperature is 82°F.",
  startLabel: "A · 82°F Hot",
  focus: [0.6, 1.6, 1.4],
  radius: 8.6,
  nodes: [
    { id: "A", opts: [{ label: "Do nothing", score: 0.1 }, { label: "Turn on fan", score: 0.4 }, { label: "Turn on AC", score: 0.9 }] },
    { id: "B", opts: [{ label: "Ignore humidity", score: 0.2 }, { label: "Open window", score: 0.3 }, { label: "Dehumidifier", score: 0.8 }] },
    { id: "C", opts: [{ label: "Full-power AC", score: 0.35 }, { label: "Defer off-peak", score: 0.55 }, { label: "Throttle AC eco", score: 0.85 }] }
  ],
  doneMsg: "Optimal path locked through 3 cubes. Discarded branches stay cached as latent walls.",
  doneLog: "OPTIMAL PATH LOCKED THROUGH 3 CUBES"
};

const LOGISTICS: ScenarioConfig = {
  id: "logistics",
  title: "Simulation 2: Latent Memory Pivot (Global Supply Chain)",
  trigger: "Core Trigger A: Cargo ship arrives at Port of LA → Dock strike.",
  startLabel: "A · LA Strike",
  focus: [1.0, 1.2, 0.8],
  radius: 9.6,
  nodes: [
    { id: "A", opts: [{ label: "Wait out strike", score: 0.1 }, { label: "Reroute Seattle", score: 0.7 }, { label: "Mexico + truck", score: 0.4 }] },
    { id: "B", opts: [{ label: "Rail south", score: 0.3 }, { label: "Trucks on I-5", score: 0.75 }, { label: "Air freight ×8 cost", score: 0.2 }] },
    { id: "C", dead: true, opts: [{ label: "Wait for plows", score: 0 }, { label: "Mountain reroute", score: 0 }, { label: "Turn back", score: 0 }] }
  ],
  pivot: {
    stackIdx: 0,
    optIdx: 2,
    id: "A3",
    log: "A3 (Mexico + truck, cached 0.4) is the best historical alternative.",
    continueDirs: [1, 2],
    continueLogs: ["Border crossing cleared — trucks rolling.", "Route re-locked. Delivery ETA restored."]
  },
  doneMsg: "Disaster avoided: pivot used cached latent memory — zero recomputation of the plan.",
  doneLog: "DISASTER AVOIDED VIA LATENT PATH MEMORY"
};

const AXIS_VECTORS = [
  new THREE.Vector3(1.8, 0, 0), // X
  new THREE.Vector3(0, 1.8, 0), // Y
  new THREE.Vector3(0, 0, 1.8)  // Z
];

const COLORS = {
  green: 0x00ff88,
  red: 0xff3b5c,
  magenta: 0xff00d4,
  cyan: 0x00e5ff,
  dim: 0x334155,
  core: 0xffffff
};

export default function CubeAlgorithmSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeScenario, setActiveScenario] = useState<ScenarioConfig>(SMART_HOME);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [statusText, setStatusText] = useState<string>("Ready. Select a scenario and click Play Simulation.");
  const [logs, setLogs] = useState<Array<{ text: string; type?: string }>>([]);

  const [kpis, setKpis] = useState({
    activeNodes: 1,
    latentPaths: 0,
    causalDepth: 1,
    recomputeCost: "0.00%"
  });

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    objs: THREE.Object3D[];
    animTimers: NodeJS.Timeout[];
    isDragging: boolean;
    prevMouse: { x: number; y: number };
    spherical: { radius: number; theta: number; phi: number };
    target: THREE.Vector3;
  } | null>(null);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ambient and point lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambLight);

    const pointLight = new THREE.PointLight(0x00ff88, 1.2, 50);
    pointLight.position.set(5, 8, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x00e5ff, 0.8, 50);
    pointLight2.position.set(-5, -4, -5);
    scene.add(pointLight2);

    // Subtle 3D floor grid
    const grid = new THREE.GridHelper(20, 20, 0x1e293b, 0x0f172a);
    grid.position.y = -1;
    scene.add(grid);

    const spherical = { radius: 10, theta: 0.6, phi: 1.1 };
    const target = new THREE.Vector3(0.5, 1.2, 0.8);

    threeRef.current = {
      scene,
      camera,
      renderer,
      objs: [],
      animTimers: [],
      isDragging: false,
      prevMouse: { x: 0, y: 0 },
      spherical,
      target
    };

    function updateCamera() {
      if (!threeRef.current) return;
      const { camera, spherical, target } = threeRef.current;
      const x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      const y = target.y + spherical.radius * Math.cos(spherical.phi);
      const z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.position.set(x, y, z);
      camera.lookAt(target);
    }

    updateCamera();

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!containerRef.current || !threeRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 500;
      threeRef.current.camera.aspect = w / h;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Mouse Orbit Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!threeRef.current) return;
    threeRef.current.isDragging = true;
    threeRef.current.prevMouse = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!threeRef.current || !threeRef.current.isDragging) return;
    const dx = e.clientX - threeRef.current.prevMouse.x;
    const dy = e.clientY - threeRef.current.prevMouse.y;
    threeRef.current.prevMouse = { x: e.clientX, y: e.clientY };

    threeRef.current.spherical.theta -= dx * 0.006;
    threeRef.current.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, threeRef.current.spherical.phi - dy * 0.006));

    const { camera, spherical, target } = threeRef.current;
    const x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    const y = target.y + spherical.radius * Math.cos(spherical.phi);
    const z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(target);
  };

  const handleMouseUp = () => {
    if (threeRef.current) threeRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!threeRef.current) return;
    threeRef.current.spherical.radius = Math.max(4, Math.min(20, threeRef.current.spherical.radius + e.deltaY * 0.01));
    const { camera, spherical, target } = threeRef.current;
    const x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    const y = target.y + spherical.radius * Math.cos(spherical.phi);
    const z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(target);
  };

  // Helper 3D geometry builders
  const clearSceneObjects = () => {
    if (!threeRef.current) return;
    const { scene, objs, animTimers } = threeRef.current;
    animTimers.forEach(clearTimeout);
    threeRef.current.animTimers = [];

    objs.forEach((o) => scene.remove(o));
    threeRef.current.objs = [];
  };

  const addTube = (p1: THREE.Vector3, p2: THREE.Vector3, color: number, radius = 0.04) => {
    if (!threeRef.current) return;
    const curve = new THREE.LineCurve3(p1, p2);
    const geom = new THREE.TubeGeometry(curve, 16, radius, 8, false);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const mesh = new THREE.Mesh(geom, mat);
    threeRef.current.scene.add(mesh);
    threeRef.current.objs.push(mesh);
  };

  const addDashedLine = (p1: THREE.Vector3, p2: THREE.Vector3, color: number) => {
    if (!threeRef.current) return;
    const geom = new THREE.BufferGeometry().setFromPoints([p1, p2]);
    const mat = new THREE.LineDashedMaterial({
      color,
      dashSize: 0.12,
      gapSize: 0.08,
      linewidth: 2
    });
    const line = new THREE.Line(geom, mat);
    line.computeLineDistances();
    threeRef.current.scene.add(line);
    threeRef.current.objs.push(line);
  };

  const addNodeCube = (pos: THREE.Vector3, color: number, size = 0.25) => {
    if (!threeRef.current) return;
    const geom = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);
    threeRef.current.scene.add(mesh);
    threeRef.current.objs.push(mesh);
  };

  const addWireBox = (p1: THREE.Vector3, p2: THREE.Vector3, color = COLORS.dim) => {
    if (!threeRef.current) return;
    const min = new THREE.Vector3(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y), Math.min(p1.z, p2.z));
    const max = new THREE.Vector3(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y), Math.max(p1.z, p2.z));
    const sz = max.clone().sub(min);
    const ctr = min.clone().add(sz.clone().multiplyScalar(0.5));

    const geom = new THREE.BoxGeometry(Math.max(sz.x, 0.05), Math.max(sz.y, 0.05), Math.max(sz.z, 0.05));
    const edges = new THREE.EdgesGeometry(geom);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.25 });
    const wire = new THREE.LineSegments(edges, mat);
    wire.position.copy(ctr);
    threeRef.current.scene.add(wire);
    threeRef.current.objs.push(wire);
  };

  // Run the Scenario Simulation
  const runSimulation = (cfg: ScenarioConfig) => {
    clearSceneObjects();
    setIsPlaying(true);
    setLogs([]);

    const baseDelay = 1200 / speed;
    let t = 0;
    const timers: NodeJS.Timeout[] = [];

    // Reset KPIs
    setKpis({
      activeNodes: 1,
      latentPaths: 0,
      causalDepth: 1,
      recomputeCost: "0.00%"
    });

    const rootPos = new THREE.Vector3(0, 0, 0);
    addNodeCube(rootPos, COLORS.core, 0.32);

    setStatusText(`Trigger: ${cfg.trigger}`);
    setLogs((prev) => [...prev, { text: `[INIT] ${cfg.trigger}`, type: "core" }]);

    let cur = rootPos.clone();
    const pathStack: Array<{ node: SimNode; origin: THREE.Vector3; end: THREE.Vector3; chosen: number }> = [];

    cfg.nodes.forEach((nd, nodeIdx) => {
      const origin = cur.clone();

      // Step 1: Simulate 3 options along X, Y, Z
      timers.push(
        setTimeout(() => {
          setStatusText(`Node ${nd.id}: Simulating 3 spatial alternatives (X, Y, Z axes)...`);
          setLogs((prev) => [
            ...prev,
            { text: `>> Node ${nd.id} Simulating Options (X, Y, Z)...`, type: "info" },
            ...nd.opts.map((o, i) => ({
              text: `  [${nd.id}${i + 1}] ${o.label} -> Score: ${o.score.toFixed(2)}`,
              type: o.score > 0.5 ? "good" : o.score === 0 ? "dead" : "neutral"
            }))
          ]);

          nd.opts.forEach((opt, i) => {
            const endPos = origin.clone().add(AXIS_VECTORS[i]);
            addDashedLine(origin, endPos, opt.score === 0 ? COLORS.red : COLORS.red);
            addNodeCube(endPos, opt.score === 0 ? COLORS.red : COLORS.dim, 0.18);
            addWireBox(origin, endPos);
          });
        }, (t += baseDelay))
      );

      // If dead end (Crisis scenario)
      if (nd.dead) {
        timers.push(
          setTimeout(() => {
            setStatusText(`ALERT: Node ${nd.id} hit a DEAD END (Score: 0.00). Discarding timeline.`);
            setLogs((prev) => [
              ...prev,
              { text: `!! ALERT: CURRENT PATH HIT A DEAD END (Score: 0.00) !!`, type: "dead" },
              { text: `>> INITIATING CAUSAL MEMORY BACKTRACKING...`, type: "warn" }
            ]);

            // Flash dead-end tube
            const deadEnd = origin.clone().add(AXIS_VECTORS[1]);
            addTube(origin, deadEnd, COLORS.red, 0.06);
          }, (t += baseDelay))
        );

        // Memory Backtrack
        if (cfg.pivot) {
          const p = cfg.pivot;
          timers.push(
            setTimeout(() => {
              setStatusText(`Backtracking through Latent Path Memory...`);
              for (let j = pathStack.length - 1; j >= p.stackIdx; j--) {
                const seg = pathStack[j];
                addTube(seg.end, seg.origin, COLORS.magenta, 0.05);
              }
              setLogs((prev) => [
                ...prev,
                { text: `>> Traversing causal ledger backwards to Node ${cfg.nodes[p.stackIdx].id}...`, type: "backtrack" },
                { text: `>> Causal analysis complete: ${p.log}`, type: "pivot" }
              ]);
            }, (t += baseDelay))
          );

          // Pivot to cached latent branch
          timers.push(
            setTimeout(() => {
              const pivotOrigin = pathStack[p.stackIdx].origin;
              const pivotEnd = pivotOrigin.clone().add(AXIS_VECTORS[p.optIdx]);

              addTube(pivotOrigin, pivotEnd, COLORS.cyan, 0.06);
              addNodeCube(pivotEnd, COLORS.cyan, 0.28);

              setKpis((prev) => ({
                ...prev,
                latentPaths: prev.latentPaths + 2,
                recomputeCost: "0.00% (Instant Pivot)"
              }));

              setStatusText(`Pivot Successful: Locked into cached latent node ${p.id} with zero recalculation.`);
              setLogs((prev) => [
                ...prev,
                { text: `>> PIVOTING PATHWAY to Latent Node ${p.id} (${pivotOrigin.toArray().join(", ")} -> ${pivotEnd.toArray().join(", ")})`, type: "pivot" },
                ...p.continueLogs.map((cl) => ({ text: `>> ${cl}`, type: "good" })),
                { text: `=== ${cfg.doneLog} ===`, type: "good" }
              ]);
              setIsPlaying(false);
            }, (t += baseDelay))
          );
        }
        return;
      }

      // Step 2: Select Best Outcome
      const bestIdx = nd.opts.reduce((m, o, i) => (o.score > nd.opts[m].score ? i : m), 0);
      const chosenPos = origin.clone().add(AXIS_VECTORS[bestIdx]);

      timers.push(
        setTimeout(() => {
          setStatusText(`Node ${nd.id}: Best outcome selected → ${nd.id}${bestIdx + 1} (${nd.opts[bestIdx].label})`);
          setLogs((prev) => [
            ...prev,
            {
              text: `>> BEST OUTCOME SELECTED: ${nd.id}${bestIdx + 1} (${nd.opts[bestIdx].label}). Collapsing timeline.`,
              type: "good"
            }
          ]);

          addTube(origin, chosenPos, COLORS.green, 0.05);
          addNodeCube(chosenPos, COLORS.green, 0.26);

          setKpis((prev) => ({
            ...prev,
            activeNodes: prev.activeNodes + 1,
            latentPaths: prev.latentPaths + 2,
            causalDepth: prev.causalDepth + 1
          }));
        }, (t += baseDelay))
      );

      pathStack.push({ node: nd, origin, end: chosenPos, chosen: bestIdx });
      cur = chosenPos;
    });

    if (!cfg.nodes.some((n) => n.dead)) {
      timers.push(
        setTimeout(() => {
          setStatusText(cfg.doneMsg);
          setLogs((prev) => [...prev, { text: `=== ${cfg.doneLog} ===`, type: "good" }]);
          setIsPlaying(false);
        }, (t += baseDelay))
      );
    }

    if (threeRef.current) {
      threeRef.current.animTimers = timers;
    }
  };

  const handleScenarioChange = (scenario: ScenarioConfig) => {
    setActiveScenario(scenario);
    clearSceneObjects();
    runSimulation(scenario);
  };

  return (
    <div className="my-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0d14] text-white shadow-2xl">
      {/* Top Header & Scenario Controls */}
      <div className="p-4 md:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-black/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#00ff88]">
              Live 3D Geometric Intelligence Sandbox
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white">
            The Cube Algorithm Simulator
          </h3>
        </div>

        {/* Scenario Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleScenarioChange(SMART_HOME)}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all flex items-center gap-2 ${
              activeScenario.id === "smart_home"
                ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50 shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Scenario 1: Smart Home Lattice
          </button>
          <button
            onClick={() => handleScenarioChange(LOGISTICS)}
            className={`px-3.5 py-2 text-xs font-mono rounded-lg transition-all flex items-center gap-2 ${
              activeScenario.id === "logistics"
                ? "bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Scenario 2: Logistics Crisis Pivot
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-b border-white/10 text-xs font-mono">
        <div className="p-3.5 bg-[#0e131f] flex items-center gap-3">
          <Cpu className="w-4 h-4 text-[#00ff88]" />
          <div>
            <span className="text-white/40 block text-[10px]">ACTIVE NODES</span>
            <span className="text-sm font-semibold text-white">{kpis.activeNodes} Nodes</span>
          </div>
        </div>
        <div className="p-3.5 bg-[#0e131f] flex items-center gap-3">
          <Database className="w-4 h-4 text-[#ff00d4]" />
          <div>
            <span className="text-white/40 block text-[10px]">LATENT MEMORY</span>
            <span className="text-sm font-semibold text-white">{kpis.latentPaths} Cached Walls</span>
          </div>
        </div>
        <div className="p-3.5 bg-[#0e131f] flex items-center gap-3">
          <Eye className="w-4 h-4 text-[#00e5ff]" />
          <div>
            <span className="text-white/40 block text-[10px]">CAUSAL DEPTH</span>
            <span className="text-sm font-semibold text-white">Tier {kpis.causalDepth} (Auditable)</span>
          </div>
        </div>
        <div className="p-3.5 bg-[#0e131f] flex items-center gap-3">
          <Zap className="w-4 h-4 text-[#fbbf24]" />
          <div>
            <span className="text-white/40 block text-[10px]">RECOMPUTE COST</span>
            <span className="text-sm font-semibold text-[#00ff88]">{kpis.recomputeCost}</span>
          </div>
        </div>
      </div>

      {/* Interactive 3D Canvas Area */}
      <div className="relative w-full h-[480px] bg-[#070a0f]" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Floating status ticker */}
        <div className="absolute top-4 left-4 right-4 md:right-auto md:max-w-md p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono pointer-events-none">
          <div className="text-white/40 text-[10px] uppercase tracking-wider mb-0.5">CURRENT EXECUTION STATUS</div>
          <div className="text-[#00ff88] font-medium leading-tight">{statusText}</div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono flex flex-col gap-1.5 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88]" />
            <span className="text-white/70">Solid Green: Optimal Extruded Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3b5c]" />
            <span className="text-white/70">Red Dashed: Latent Cached Alternatives</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff00d4]" />
            <span className="text-white/70">Magenta: Causal Memory Backtracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff]" />
            <span className="text-white/70">Cyan: Self-Healed Latent Pivot</span>
          </div>
        </div>

        {/* Orbit Hint */}
        <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/30 bg-black/60 px-2 py-1 rounded border border-white/5 pointer-events-none">
          Click & Drag to Rotate · Scroll to Zoom
        </div>
      </div>

      {/* Bottom Controls & Terminal Console */}
      <div className="p-4 md:p-6 bg-[#0a0e17] border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Playback Controls */}
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => runSimulation(activeScenario)}
              disabled={isPlaying}
              className="flex-1 py-2.5 px-4 rounded-lg bg-[#00ff88] text-black font-semibold text-xs font-mono flex items-center justify-center gap-2 hover:bg-[#00ff88]/90 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)]"
            >
              <Play className="w-4 h-4 fill-black" />
              {isPlaying ? "Simulating..." : "Replay Scenario"}
            </button>
            <button
              onClick={() => {
                clearSceneObjects();
                setStatusText("Reset to initial trigger.");
                setLogs([]);
              }}
              className="py-2.5 px-3 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 text-xs font-mono transition-all"
              title="Reset Scene"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Speed slider */}
          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>Simulation Speed:</span>
            <div className="flex items-center gap-1.5">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded text-[11px] ${
                    speed === s ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/40" : "bg-white/5 text-white/40"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Terminal Log Stream */}
        <div className="md:col-span-2 h-36 overflow-y-auto bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[11px] space-y-1 scrollbar-thin">
          <div className="text-white/30 text-[10px] pb-1 border-b border-white/5 mb-1.5">
            DETERMINISTIC EXECUTION LEDGER
          </div>
          {logs.length === 0 ? (
            <div className="text-white/30 italic">Click Play Scenario to start deterministic simulation...</div>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                className={
                  l.type === "good"
                    ? "text-[#00ff88]"
                    : l.type === "dead"
                    ? "text-[#ff3b5c] font-bold"
                    : l.type === "warn"
                    ? "text-[#fbbf24]"
                    : l.type === "backtrack"
                    ? "text-[#ff00d4]"
                    : l.type === "pivot"
                    ? "text-[#00e5ff] font-semibold"
                    : l.type === "info"
                    ? "text-white/90"
                    : "text-white/50"
                }
              >
                {l.text}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
