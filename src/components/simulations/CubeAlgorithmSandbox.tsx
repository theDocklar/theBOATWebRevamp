"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Play, RotateCcw, Zap, ShieldAlert, Cpu, Database, Eye, Terminal, Sparkles } from "lucide-react";

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
  badge: string;
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
  title: "Scenario 1: Probabilistic Lattice (Smart Home)",
  badge: "High-Efficiency Mode",
  trigger: "Core Trigger A: Room temperature is 82°F.",
  startLabel: "A · 82°F Ambient",
  focus: [0.6, 1.6, 1.4],
  radius: 8.4,
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
  title: "Scenario 2: Latent Memory Pivot (Logistics Crisis)",
  badge: "Self-Healing Mode",
  trigger: "Core Trigger A: Cargo ship arrives at Port of LA → Dock strike.",
  startLabel: "A · LA Port Strike",
  focus: [1.0, 1.2, 0.8],
  radius: 9.2,
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
  new THREE.Vector3(2.0, 0, 0), // X
  new THREE.Vector3(0, 2.0, 0), // Y
  new THREE.Vector3(0, 0, 2.0)  // Z
];

const COLORS = {
  green: 0x00ff88,
  red: 0xff3366,
  magenta: 0xf43f5e,
  cyan: 0x00e5ff,
  dim: 0x334155,
  core: 0xffffff
};

interface LabelItem {
  id: string;
  text: string;
  sub?: string;
  score?: number;
  pos: THREE.Vector3;
  type: "root" | "option" | "winner" | "dead" | "pivot";
}

export default function CubeAlgorithmSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeScenario, setActiveScenario] = useState<ScenarioConfig>(SMART_HOME);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [statusText, setStatusText] = useState<string>("Ready. Explore 3D geometry or play simulation.");
  const [logs, setLogs] = useState<Array<{ text: string; type?: string }>>([]);
  const [labels, setLabels] = useState<LabelItem[]>([]);
  const [screenLabels, setScreenLabels] = useState<Array<{ id: string; x: number; y: number; text: string; sub?: string; score?: number; type: string }>>([]);

  const [kpis, setKpis] = useState({
    activeNodes: 1,
    latentPaths: 0,
    causalDepth: 1,
    recomputeCost: "0.00%"
  });

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

  // Helper to project 3D coords to 2D screen pixels
  const updateScreenLabels = useCallback(() => {
    if (!threeRef.current || !containerRef.current) return;
    const { camera } = threeRef.current;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const projected = labels.map((lbl) => {
      const v = lbl.pos.clone().project(camera);
      const isBehind = v.z > 1;
      const x = ((v.x + 1) * width) / 2;
      const y = ((-v.y + 1) * height) / 2;

      return {
        id: lbl.id,
        x: isBehind ? -9999 : x,
        y: isBehind ? -9999 : y,
        text: lbl.text,
        sub: lbl.sub,
        score: lbl.score,
        type: lbl.type
      };
    });

    setScreenLabels(projected);
  }, [labels]);

  // Initialize Three.js WebGL Renderer
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 580;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060911);
    scene.fog = new THREE.FogExp2(0x060911, 0.028);

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    const pLight1 = new THREE.PointLight(0x00ff88, 1.4, 40);
    pLight1.position.set(6, 10, 6);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0x00e5ff, 1.0, 40);
    pLight2.position.set(-6, -5, -6);
    scene.add(pLight2);

    // Floor Grid
    const grid = new THREE.GridHelper(24, 24, 0x1e293b, 0x0d131f);
    grid.position.y = -1.2;
    scene.add(grid);

    const spherical = { radius: 9.8, theta: 0.65, phi: 1.15 };
    const target = new THREE.Vector3(0.6, 1.4, 0.9);

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
      updateScreenLabels();
    }
    animate();

    const handleResize = () => {
      if (!containerRef.current || !threeRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 580;
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
  }, [updateScreenLabels]);

  // Mouse / Touch Orbit Controls
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

    threeRef.current.spherical.theta -= dx * 0.0055;
    threeRef.current.spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, threeRef.current.spherical.phi - dy * 0.0055));

    const { camera, spherical, target } = threeRef.current;
    const x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    const y = target.y + spherical.radius * Math.cos(spherical.phi);
    const z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(target);
    updateScreenLabels();
  };

  const handleMouseUp = () => {
    if (threeRef.current) threeRef.current.isDragging = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!threeRef.current) return;
    threeRef.current.spherical.radius = Math.max(4.5, Math.min(22, threeRef.current.spherical.radius + e.deltaY * 0.008));
    const { camera, spherical, target } = threeRef.current;
    const x = target.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
    const y = target.y + spherical.radius * Math.cos(spherical.phi);
    const z = target.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
    camera.position.set(x, y, z);
    camera.lookAt(target);
    updateScreenLabels();
  };

  // 3D Geometry primitives
  const clearSceneObjects = useCallback(() => {
    if (!threeRef.current) return;
    const { scene, objs, animTimers } = threeRef.current;
    animTimers.forEach(clearTimeout);
    threeRef.current.animTimers = [];

    objs.forEach((o) => scene.remove(o));
    threeRef.current.objs = [];
    setLabels([]);
    setScreenLabels([]);
  }, []);

  const addTube = (p1: THREE.Vector3, p2: THREE.Vector3, color: number, radius = 0.045) => {
    if (!threeRef.current) return;
    const curve = new THREE.LineCurve3(p1, p2);
    const geom = new THREE.TubeGeometry(curve, 20, radius, 10, false);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.75,
      roughness: 0.2,
      metalness: 0.3
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
      dashSize: 0.14,
      gapSize: 0.09,
      linewidth: 2,
      transparent: true,
      opacity: 0.7
    });
    const line = new THREE.Line(geom, mat);
    line.computeLineDistances();
    threeRef.current.scene.add(line);
    threeRef.current.objs.push(line);
  };

  const addNodeCube = (pos: THREE.Vector3, color: number, size = 0.28) => {
    if (!threeRef.current) return;
    const geom = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.85,
      roughness: 0.1,
      metalness: 0.4
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
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 });
    const wire = new THREE.LineSegments(edges, mat);
    wire.position.copy(ctr);
    threeRef.current.scene.add(wire);
    threeRef.current.objs.push(wire);
  };

  // Run Scenario
  const runSimulation = useCallback(
    (cfg: ScenarioConfig) => {
      clearSceneObjects();
      setIsPlaying(true);
      setLogs([]);

      const baseDelay = 1300 / speed;
      let t = 0;
      const timers: NodeJS.Timeout[] = [];

      setKpis({
        activeNodes: 1,
        latentPaths: 0,
        causalDepth: 1,
        recomputeCost: "0.00%"
      });

      const rootPos = new THREE.Vector3(0, 0, 0);
      addNodeCube(rootPos, COLORS.core, 0.35);

      setLabels([{ id: "root", text: cfg.startLabel, pos: rootPos.clone(), type: "root" }]);
      setStatusText(`Core Trigger: ${cfg.trigger}`);
      setLogs((prev) => [...prev, { text: `[INIT] ${cfg.trigger}`, type: "core" }]);

      let cur = rootPos.clone();
      const pathStack: Array<{ node: SimNode; origin: THREE.Vector3; end: THREE.Vector3; chosen: number }> = [];

      cfg.nodes.forEach((nd) => {
        const origin = cur.clone();

        // 1. Simulate 3 Spatial Alternatives
        timers.push(
          setTimeout(() => {
            setStatusText(`Node ${nd.id}: Simulating 3 spatial vectors along X, Y, Z axes...`);
            setLogs((prev) => [
              ...prev,
              { text: `>> Node ${nd.id} Evaluating Spatial Options (X, Y, Z)...`, type: "info" },
              ...nd.opts.map((o, i) => ({
                text: `  [${nd.id}${i + 1}] ${o.label} -> Deterministic Score: ${o.score.toFixed(2)}`,
                type: o.score > 0.5 ? "good" : o.score === 0 ? "dead" : "neutral"
              }))
            ]);

            const newLabels: LabelItem[] = [];
            nd.opts.forEach((opt, i) => {
              const endPos = origin.clone().add(AXIS_VECTORS[i]);
              addDashedLine(origin, endPos, opt.score === 0 ? COLORS.red : COLORS.red);
              addNodeCube(endPos, opt.score === 0 ? COLORS.red : COLORS.dim, 0.2);
              addWireBox(origin, endPos);

              newLabels.push({
                id: `${nd.id}_${i}`,
                text: `${nd.id}${i + 1} · ${opt.label}`,
                score: opt.score,
                pos: endPos.clone(),
                type: opt.score === 0 ? "dead" : "option"
              });
            });

            setLabels((prev) => [...prev, ...newLabels]);
          }, (t += baseDelay))
        );

        // Crisis Failure & Backtrack Handling
        if (nd.dead) {
          timers.push(
            setTimeout(() => {
              setStatusText(`ALERT: Node ${nd.id} hit catastrophic DEAD END (Score: 0.00). Discarding timeline.`);
              setLogs((prev) => [
                ...prev,
                { text: `!! ALERT: CURRENT PATH HIT A DEAD END (Score: 0.00) !!`, type: "dead" },
                { text: `>> INITIATING CAUSAL MEMORY BACKTRACKING...`, type: "warn" }
              ]);

              const deadEnd = origin.clone().add(AXIS_VECTORS[1]);
              addTube(origin, deadEnd, COLORS.red, 0.065);
            }, (t += baseDelay))
          );

          if (cfg.pivot) {
            const p = cfg.pivot;
            timers.push(
              setTimeout(() => {
                setStatusText(`Backtracking through Latent Path Memory...`);
                for (let j = pathStack.length - 1; j >= p.stackIdx; j--) {
                  const seg = pathStack[j];
                  addTube(seg.end, seg.origin, COLORS.magenta, 0.055);
                }
                setLogs((prev) => [
                  ...prev,
                  { text: `>> Traversing causal ledger backwards to Node ${cfg.nodes[p.stackIdx].id}...`, type: "backtrack" },
                  { text: `>> Causal analysis complete: ${p.log}`, type: "pivot" }
                ]);
              }, (t += baseDelay))
            );

            timers.push(
              setTimeout(() => {
                const pivotOrigin = pathStack[p.stackIdx].origin;
                const pivotEnd = pivotOrigin.clone().add(AXIS_VECTORS[p.optIdx]);

                addTube(pivotOrigin, pivotEnd, COLORS.cyan, 0.07);
                addNodeCube(pivotEnd, COLORS.cyan, 0.32);

                setLabels((prev) =>
                  prev.map((lbl) =>
                    lbl.id === `A_2` ? { ...lbl, type: "pivot", text: `A3 · Mexico + Truck (PIVOT)` } : lbl
                  )
                );

                setKpis((prev) => ({
                  ...prev,
                  latentPaths: prev.latentPaths + 2,
                  recomputeCost: "0.00% (Instant Pivot)"
                }));

                setStatusText(`Pivot Successful: Locked into cached latent node ${p.id} with zero recalculation.`);
                setLogs((prev) => [
                  ...prev,
                  {
                    text: `>> PIVOTING PATHWAY to Latent Node ${p.id} (${pivotOrigin.toArray().join(", ")} -> ${pivotEnd.toArray().join(", ")})`,
                    type: "pivot"
                  },
                  ...p.continueLogs.map((cl) => ({ text: `>> ${cl}`, type: "good" })),
                  { text: `=== ${cfg.doneLog} ===`, type: "good" }
                ]);
                setIsPlaying(false);
              }, (t += baseDelay))
            );
          }
          return;
        }

        // 2. Select Highest Scoring Alternative
        const bestIdx = nd.opts.reduce((m, o, i) => (o.score > nd.opts[m].score ? i : m), 0);
        const chosenPos = origin.clone().add(AXIS_VECTORS[bestIdx]);

        timers.push(
          setTimeout(() => {
            setStatusText(`Node ${nd.id}: Optimal outcome selected → ${nd.id}${bestIdx + 1} (${nd.opts[bestIdx].label})`);
            setLogs((prev) => [
              ...prev,
              {
                text: `>> BEST OUTCOME SELECTED: ${nd.id}${bestIdx + 1} (${nd.opts[bestIdx].label}). Collapsing timeline forward.`,
                type: "good"
              }
            ]);

            addTube(origin, chosenPos, COLORS.green, 0.06);
            addNodeCube(chosenPos, COLORS.green, 0.3);

            setLabels((prev) =>
              prev.map((lbl) =>
                lbl.id === `${nd.id}_${bestIdx}` ? { ...lbl, type: "winner" } : lbl
              )
            );

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
    },
    [clearSceneObjects, speed]
  );

  // Auto-run when switching scenarios
  const handleScenarioChange = (scenario: ScenarioConfig) => {
    setActiveScenario(scenario);
    runSimulation(scenario);
  };

  // Run on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation(SMART_HOME);
    }, 600);
    return () => clearTimeout(timer);
  }, [runSimulation]);

  return (
    <div className="w-full my-12 rounded-3xl overflow-hidden border border-white/10 bg-[#060911] text-white shadow-2xl transition-all duration-300">
      {/* Top Header Bar */}
      <div className="p-5 md:p-7 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div>
          <div className="flex items-center gap-2.5 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff88] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff88]" />
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#00ff88] font-semibold">
              Interactive 3D Geometric Intelligence Sandbox
            </span>
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50">
              WebGL · Three.js
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight text-white">
            The Cube Algorithm Live Simulator
          </h2>
        </div>

        {/* Tactical Scenario Switcher Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => handleScenarioChange(SMART_HOME)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 ${
              activeScenario.id === "smart_home"
                ? "bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/50 shadow-[0_0_20px_rgba(0,255,136,0.15)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Scenario 1: Smart Home Lattice</span>
          </button>

          <button
            onClick={() => handleScenarioChange(LOGISTICS)}
            className={`px-4 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 ${
              activeScenario.id === "logistics"
                ? "bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Scenario 2: Logistics Crisis Pivot</span>
          </button>
        </div>
      </div>

      {/* KPI Metric Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border-b border-white/10 font-mono">
        <div className="p-4 bg-[#090d16] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 flex items-center justify-center text-[#00ff88]">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">ACTIVE LATTICE NODES</span>
            <span className="text-base font-semibold text-white">{kpis.activeNodes} Physical Nodes</span>
          </div>
        </div>

        <div className="p-4 bg-[#090d16] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#f43f5e]/10 border border-[#f43f5e]/30 flex items-center justify-center text-[#f43f5e]">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">LATENT CACHED MEMORY</span>
            <span className="text-base font-semibold text-white">{kpis.latentPaths} Geometric Walls</span>
          </div>
        </div>

        <div className="p-4 bg-[#090d16] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center text-[#00e5ff]">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">CAUSAL DEPTH & AUDIT</span>
            <span className="text-base font-semibold text-white">Tier {kpis.causalDepth} (100% Traceable)</span>
          </div>
        </div>

        <div className="p-4 bg-[#090d16] flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#fbbf24]/10 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white/40 block text-[10px] uppercase tracking-wider">RECOMPUTATION OVERHEAD</span>
            <span className="text-base font-semibold text-[#00ff88]">{kpis.recomputeCost}</span>
          </div>
        </div>
      </div>

      {/* Large 3D Viewport with High-Density Canvas */}
      <div className="relative w-full h-[520px] md:h-[600px] bg-[#05080f] overflow-hidden" ref={containerRef}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onWheel={handleWheel}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        />

        {/* Dynamic 3D Projected Screen Labels */}
        {screenLabels.map((lbl) => {
          if (lbl.x < -100 || lbl.x > 3000) return null;
          return (
            <div
              key={lbl.id}
              style={{
                position: "absolute",
                left: `${lbl.x}px`,
                top: `${lbl.y}px`,
                transform: "translate(-50%, -130%)"
              }}
              className={`pointer-events-none transition-all duration-300 font-mono text-[11px] px-2.5 py-1 rounded-md border backdrop-blur-md whitespace-nowrap shadow-lg ${
                lbl.type === "winner"
                  ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)] scale-105"
                  : lbl.type === "pivot"
                  ? "bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff] font-bold shadow-[0_0_15px_rgba(0,229,255,0.3)] scale-105"
                  : lbl.type === "dead"
                  ? "bg-[#ff3366]/20 border-[#ff3366] text-[#ff3366] font-bold shadow-[0_0_15px_rgba(255,51,102,0.3)]"
                  : lbl.type === "root"
                  ? "bg-white/20 border-white text-white font-bold"
                  : "bg-black/60 border-white/20 text-white/70"
              }`}
            >
              {lbl.text}
              {lbl.score !== undefined && (
                <span className="ml-1.5 opacity-80 text-[10px]">[{lbl.score.toFixed(2)}]</span>
              )}
            </div>
          );
        })}

        {/* Floating Top-Left Status HUD */}
        <div className="absolute top-5 left-5 right-5 md:right-auto md:max-w-lg p-3.5 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 text-xs font-mono pointer-events-none shadow-2xl">
          <div className="flex items-center justify-between gap-4 mb-1">
            <span className="text-white/40 text-[10px] uppercase tracking-wider">CURRENT STATE EXECUTION</span>
            <span className="text-[10px] text-[#00ff88] font-semibold">{activeScenario.badge}</span>
          </div>
          <div className="text-white font-medium leading-snug">{statusText}</div>
        </div>

        {/* Color Legend HUD */}
        <div className="absolute bottom-5 left-5 p-3 rounded-xl bg-black/75 backdrop-blur-xl border border-white/15 text-[11px] font-mono flex flex-col gap-1.5 pointer-events-none shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88]" />
            <span className="text-white/80">Solid Green: Optimal Extruded Vector</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff3366]" />
            <span className="text-white/80">Red Dashed: Latent Alternative Walls</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f43f5e]" />
            <span className="text-white/80">Magenta: Causal Memory Backtrack</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
            <span className="text-white/80">Cyan: Self-Healed Latent Pivot</span>
          </div>
        </div>

        {/* 3D Orbit Control Hint */}
        <div className="absolute bottom-5 right-5 text-[11px] font-mono text-white/50 bg-black/75 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/15 pointer-events-none flex items-center gap-2">
          <span>🖱️ Click & Drag to Orbit · Scroll to Zoom</span>
        </div>
      </div>

      {/* Bottom Controls & Terminal Stream */}
      <div className="p-5 md:p-7 bg-[#090d16] border-t border-white/10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playback Control Box */}
        <div className="flex flex-col justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-white/40 uppercase tracking-wider block mb-2">
              SIMULATION CONTROLS
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => runSimulation(activeScenario)}
                disabled={isPlaying}
                className="flex-1 py-3 px-5 rounded-xl bg-[#00ff88] text-black font-bold text-xs font-mono flex items-center justify-center gap-2.5 hover:bg-[#00ff88]/90 disabled:opacity-50 transition-all shadow-[0_0_25px_rgba(0,255,136,0.35)]"
              >
                <Play className="w-4 h-4 fill-black" />
                {isPlaying ? "Executing Timeline..." : "Replay Scenario"}
              </button>

              <button
                onClick={() => {
                  clearSceneObjects();
                  setStatusText("Reset to initial state.");
                  setLogs([]);
                }}
                className="py-3 px-4 rounded-xl bg-white/5 text-white/80 hover:bg-white/10 border border-white/10 text-xs font-mono transition-all"
                title="Reset Scene"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Speed Selection */}
          <div className="flex items-center justify-between text-xs font-mono text-white/60 pt-3 border-t border-white/5">
            <span>Execution Speed:</span>
            <div className="flex items-center gap-1.5">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    speed === s
                      ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50"
                      : "bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Terminal Execution Ledger */}
        <div className="lg:col-span-2 h-44 overflow-y-auto bg-black/80 rounded-2xl p-4 border border-white/10 font-mono text-[11.5px] space-y-1.5 scrollbar-thin">
          <div className="flex items-center justify-between text-white/40 text-[10px] pb-2 border-b border-white/10 mb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[#00ff88]" />
              DETERMINISTIC CAUSAL LEDGER STREAM
            </span>
            <span>IMMUTABLE HISTORY</span>
          </div>
          {logs.length === 0 ? (
            <div className="text-white/30 italic py-4">Timeline initializing...</div>
          ) : (
            logs.map((l, i) => (
              <div
                key={i}
                className={
                  l.type === "good"
                    ? "text-[#00ff88]"
                    : l.type === "dead"
                    ? "text-[#ff3366] font-bold"
                    : l.type === "warn"
                    ? "text-[#fbbf24]"
                    : l.type === "backtrack"
                    ? "text-[#f43f5e]"
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
