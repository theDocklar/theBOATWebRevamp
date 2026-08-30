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
  badge: "Optimal Extrusion",
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
  title: "Scenario 2: Latent Memory Pivot (Logistics Crisis)",
  badge: "Self-Healing Memory",
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

const AXIS = [
  new THREE.Vector3(1.4, 0, 0), // X
  new THREE.Vector3(0, 1.4, 0), // Y
  new THREE.Vector3(0, 0, 1.4)  // Z
];

const C = {
  green: 0x00ff88,
  red: 0xff3b5c,
  magenta: 0xff00d4,
  cyan: 0x00e5ff,
  wire: 0x475569,
  ghost: 0x1e293b,
  node: 0xffffff
};

interface LabelItem {
  id: string;
  text: string;
  pos: THREE.Vector3;
  type: "root" | "normal" | "win" | "dead" | "pivot";
}

export default function CubeAlgorithmSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeScenario, setActiveScenario] = useState<ScenarioConfig>(SMART_HOME);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [statusText, setStatusText] = useState<string>("Ready. Select a scenario and click Play.");
  const [logs, setLogs] = useState<Array<{ text: string; type?: string }>>([]);
  const [labels, setLabels] = useState<LabelItem[]>([]);
  const [screenLabels, setScreenLabels] = useState<Array<{ id: string; x: number; y: number; text: string; type: string }>>([]);

  const [kpis, setKpis] = useState({
    evals: 0,
    latent: 0,
    depth: 0
  });

  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    objects: THREE.Object3D[];
    animTimers: NodeJS.Timeout[];
    theta: number;
    phi: number;
    radius: number;
    target: THREE.Vector3;
    drag: boolean;
    px: number;
    py: number;
  } | null>(null);

  // Project 3D positions to 2D screen coordinates
  const updateScreenLabels = useCallback(() => {
    if (!threeRef.current || !containerRef.current) return;
    const { camera } = threeRef.current;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;

    const projected = labels.map((l) => {
      const p = l.pos.clone().project(camera);
      const isVisible = p.z < 1;
      const x = (p.x * 0.5 + 0.5) * w;
      const y = (-p.y * 0.5 + 0.5) * h;

      return {
        id: l.id,
        x: isVisible ? x : -9999,
        y: isVisible ? y : -9999,
        text: l.text,
        type: l.type
      };
    });

    setScreenLabels(projected);
  }, [labels]);

  // Initialize Three.js WebGL Renderer
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight || 520;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0d14);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const amb = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(amb);

    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(8, 14, 10);
    scene.add(dir);

    const p1 = new THREE.PointLight(0x00ff88, 1.2, 30);
    p1.position.set(-4, -2, -4);
    scene.add(p1);

    // Subtle coordinate floor grid
    const grid = new THREE.GridHelper(16, 16, 0x1e293b, 0x0f172a);
    grid.position.y = -0.5;
    scene.add(grid);

    const theta = 0.72;
    const phi = 1.12;
    const radius = 9.2;
    const target = new THREE.Vector3(1, 1.4, 1);

    threeRef.current = {
      scene,
      camera,
      renderer,
      objects: [],
      animTimers: [],
      theta,
      phi,
      radius,
      target,
      drag: false,
      px: 0,
      py: 0
    };

    function placeCam() {
      if (!threeRef.current) return;
      const { camera, theta, phi, radius, target } = threeRef.current;
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.cos(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(target);
    }

    placeCam();

    let animationId: number;
    function animate() {
      animationId = requestAnimationFrame(animate);
      placeCam();
      renderer.render(scene, camera);
      updateScreenLabels();
    }
    animate();

    const handleResize = () => {
      if (!containerRef.current || !threeRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight || 520;
      threeRef.current.camera.aspect = width / height;
      threeRef.current.camera.updateProjectionMatrix();
      threeRef.current.renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [updateScreenLabels]);

  // Pointer Orbit Controls
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!threeRef.current) return;
    threeRef.current.drag = true;
    threeRef.current.px = e.clientX;
    threeRef.current.py = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!threeRef.current || !threeRef.current.drag) return;
    const dx = e.clientX - threeRef.current.px;
    const dy = e.clientY - threeRef.current.py;
    threeRef.current.px = e.clientX;
    threeRef.current.py = e.clientY;

    threeRef.current.theta += dx * 0.006;
    threeRef.current.phi = Math.min(2.6, Math.max(0.35, threeRef.current.phi + dy * 0.006));
    updateScreenLabels();
  };

  const handlePointerUp = () => {
    if (threeRef.current) threeRef.current.drag = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!threeRef.current) return;
    threeRef.current.radius = Math.min(24, Math.max(4, threeRef.current.radius + e.deltaY * 0.008));
    updateScreenLabels();
  };

  // 3D Helpers
  const clearScene = useCallback(() => {
    if (!threeRef.current) return;
    const { scene, objects, animTimers } = threeRef.current;
    animTimers.forEach(clearTimeout);
    threeRef.current.animTimers = [];

    objects.forEach((o) => scene.remove(o));
    threeRef.current.objects = [];
    setLabels([]);
    setScreenLabels([]);
  }, []);

  const track = (o: THREE.Object3D) => {
    if (!threeRef.current) return o;
    threeRef.current.objects.push(o);
    threeRef.current.scene.add(o);
    return o;
  };

  const nodeCube = (pos: THREE.Vector3, color = C.node, size = 0.24, opacity = 1) => {
    const geom = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshStandardMaterial({
      color,
      transparent: opacity < 1,
      opacity,
      emissive: color,
      emissiveIntensity: 0.35,
      roughness: 0.3
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(pos);
    return track(mesh);
  };

  const line = (a: THREE.Vector3, b: THREE.Vector3, color: number, dashed = false) => {
    const geom = new THREE.BufferGeometry().setFromPoints([a, b]);
    const mat = dashed
      ? new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity: 0.85 })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    const l = new THREE.Line(geom, mat);
    if (dashed) l.computeLineDistances();
    return track(l);
  };

  const wallCube = (corner: THREE.Vector3, scale = 1.4) => {
    const geom = new THREE.BoxGeometry(scale, scale, scale);
    const edges = new THREE.EdgesGeometry(geom);
    const mat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.65 });
    const wire = new THREE.LineSegments(edges, mat);
    wire.position.copy(corner.clone().addScalar(scale / 2));
    return track(wire);
  };

  const tube = (a: THREE.Vector3, b: THREE.Vector3, color: number, r = 0.045) => {
    const dir = b.clone().sub(a);
    const len = dir.length();
    const geom = new THREE.CylinderGeometry(r, r, len, 12);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.6,
      roughness: 0.25
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return track(mesh);
  };

  // Run Scenario Timeline
  const runSimulation = useCallback(
    (cfg: ScenarioConfig) => {
      clearScene();
      setIsPlaying(true);
      setLogs([]);

      if (threeRef.current) {
        threeRef.current.target.set(cfg.focus[0], cfg.focus[1], cfg.focus[2]);
        threeRef.current.radius = cfg.radius || 9.2;
      }

      setKpis({ evals: 0, latent: 0, depth: 0 });

      let t = 200;
      const baseDelay = 1400 / speed;
      const timers: NodeJS.Timeout[] = [];

      let cur = new THREE.Vector3(0, 0, 0);

      // Root Node A
      timers.push(
        setTimeout(() => {
          nodeCube(cur, 0xffffff, 0.3);
          setLabels([{ id: "root", text: `<b>${cfg.startLabel}</b>`, pos: cur.clone(), type: "root" }]);
          setStatusText(`Trigger: ${cfg.trigger}`);
          setLogs((prev) => [...prev, { text: `[TRIGGER] ${cfg.trigger}`, type: "core" }]);
        }, (t += 200))
      );

      const pathStack: Array<{ node: SimNode; origin: THREE.Vector3; end: THREE.Vector3; chosen: number }> = [];

      cfg.nodes.forEach((nd) => {
        const origin = cur.clone();

        // 1. Simulate 3 options
        timers.push(
          setTimeout(() => {
            setStatusText(`Node ${nd.id}: Simulating 3 timelines (X, Y, Z axes)...`);
            setLogs((prev) => [
              ...prev,
              { text: `>> Node ${nd.id} simulating options (X, Y, Z axes)...`, type: "info" }
            ]);

            const newLabels: LabelItem[] = [];
            nd.opts.forEach((o, i) => {
              const p = origin.clone().add(AXIS[i]);
              line(origin, p, o.score <= 0 ? C.red : 0x8892a6, true);
              nodeCube(p, o.score <= 0 ? C.red : C.ghost, 0.18, 0.85);

              newLabels.push({
                id: `${nd.id}_${i}`,
                text: `[${nd.id}${i + 1}] ${o.label} · <b>${o.score.toFixed(1)}</b>`,
                pos: p.clone(),
                type: o.score <= 0 ? "dead" : "normal"
              });

              setLogs((prev) => [
                ...prev,
                {
                  text: `   [${nd.id}${i + 1}] ${o.label} → Score: ${o.score.toFixed(1)}`,
                  type: o.score <= 0 ? "dead" : "neutral"
                }
              ]);
            });

            wallCube(origin, 1.4);
            setLabels((prev) => [...prev, ...newLabels]);

            setKpis((prev) => ({ ...prev, evals: prev.evals + 3 }));
          }, (t += baseDelay))
        );

        // Crisis & Backtrack
        if (nd.dead) {
          timers.push(
            setTimeout(() => {
              setStatusText(`DEAD END at node ${nd.id} — all scores 0.0`);
              setLogs((prev) => [
                ...prev,
                { text: `!! ALERT: CURRENT PATH HIT A DEAD END (Score: 0.0) !!`, type: "dead" }
              ]);

              nd.opts.forEach((o, i) => {
                const p = origin.clone().add(AXIS[i]);
                line(origin, p, C.red, false);
              });
            }, (t += baseDelay))
          );

          timers.push(
            setTimeout(() => {
              setStatusText("Causal memory backtrack — scanning latent walls...");
              setLogs((prev) => [
                ...prev,
                { text: `>> INITIATING CAUSAL MEMORY BACKTRACKING...`, type: "backtrack" }
              ]);
            }, (t += 700 / speed))
          );

          if (cfg.pivot) {
            const pv = cfg.pivot;
            for (let i = pathStack.length - 1; i >= 0; i--) {
              const seg = pathStack[i];
              timers.push(
                setTimeout(() => {
                  tube(seg.end, seg.origin, C.magenta, 0.05);
                  const best = seg.node.opts.reduce(
                    (a, b, j) => (j === seg.chosen ? a : a && a.score >= b.score ? a : b),
                    null as NodeOption | null
                  );
                  setLogs((prev) => [
                    ...prev,
                    {
                      text: `>> Traversing back to Node ${seg.node.id}... best latent: ${best?.label} (${best?.score.toFixed(1)})`,
                      type: "backtrack"
                    }
                  ]);
                  setKpis((prev) => ({ ...prev, evals: prev.evals + 2 }));
                }, (t += 900 / speed))
              );
            }

            const pOrigin = pathStack[pv.stackIdx].origin;
            const pTarget = pOrigin.clone().add(AXIS[pv.optIdx]);

            timers.push(
              setTimeout(() => {
                setStatusText("PIVOT: Reactivating cached latent node — zero recomputation.");
                setLogs((prev) => [
                  ...prev,
                  { text: `>> Causal analysis complete. ${pv.log}`, type: "pivot" },
                  { text: `>> PIVOTING PATHWAY to latent node ${pv.id}.`, type: "pivot" }
                ]);
                tube(pOrigin, pTarget, C.cyan, 0.055);
                nodeCube(pTarget, C.cyan, 0.26);

                setLabels((prev) =>
                  prev.map((lbl) => (lbl.id === `A_2` ? { ...lbl, type: "pivot" } : lbl))
                );
              }, (t += 1200 / speed))
            );

            let c2 = pTarget.clone();
            pv.continueDirs.forEach((d, i) => {
              timers.push(
                setTimeout(() => {
                  const nx = c2.clone().add(AXIS[d]);
                  tube(c2, nx, C.cyan, 0.055);
                  nodeCube(nx, C.cyan, 0.22);
                  if (pv.continueLogs[i]) {
                    setLogs((prev) => [...prev, { text: `>> ${pv.continueLogs[i]}`, type: "good" }]);
                  }
                  c2 = nx;
                  setKpis((prev) => ({ ...prev, depth: prev.depth + 1 }));
                }, (t += 900 / speed))
              );
            });

            timers.push(
              setTimeout(() => {
                setStatusText(cfg.doneMsg);
                setLogs((prev) => [...prev, { text: `=== ${cfg.doneLog} ===`, type: "good" }]);
                setIsPlaying(false);
              }, (t += 800 / speed))
            );
          }
          return;
        }

        // 2. Select Best Outcome
        const bi = nd.opts.reduce((m, o, i) => (o.score > nd.opts[m].score ? i : m), 0);
        const chosenPos = origin.clone().add(AXIS[bi]);

        timers.push(
          setTimeout(() => {
            setStatusText(`Node ${nd.id}: Best outcome ${nd.id}${bi + 1} — ${nd.opts[bi].label}`);
            setLogs((prev) => [
              ...prev,
              {
                text: `>> BEST OUTCOME SELECTED: ${nd.id}${bi + 1} (${nd.opts[bi].label}). Collapsing timeline.`,
                type: "good"
              }
            ]);

            tube(origin, chosenPos, C.green, 0.05);
            nodeCube(chosenPos, C.green, 0.26);

            nd.opts.forEach((o, i) => {
              if (i !== bi) {
                setKpis((prev) => ({ ...prev, latent: prev.latent + 1 }));
              }
            });

            setLabels((prev) =>
              prev.map((lbl) => (lbl.id === `${nd.id}_${bi}` ? { ...lbl, type: "win" } : lbl))
            );

            setKpis((prev) => ({ ...prev, depth: prev.depth + 1 }));
          }, (t += baseDelay))
        );

        pathStack.push({ node: nd, origin, end: chosenPos, chosen: bi });
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
    [clearScene, speed]
  );

  const handleScenarioChange = (scenario: ScenarioConfig) => {
    setActiveScenario(scenario);
    runSimulation(scenario);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      runSimulation(SMART_HOME);
    }, 400);
    return () => clearTimeout(timer);
  }, [runSimulation]);

  return (
    <div className="w-full my-10 rounded-2xl overflow-hidden border border-white/10 bg-[#0a0d14] text-white shadow-2xl">
      {/* Top Header & Scenario Selection */}
      <div className="p-4 md:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-b from-white/[0.03] to-transparent">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#00ff88] font-bold">
              3D Deterministic Geometric Intelligence
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-display font-semibold tracking-tight text-white">
            The Cube Algorithm Live Simulation
          </h3>
        </div>

        {/* Scenario Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleScenarioChange(SMART_HOME)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeScenario.id === "smart_home"
                ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/60 shadow-[0_0_15px_rgba(0,255,136,0.2)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Scenario 1: Smart Home Lattice
          </button>

          <button
            onClick={() => handleScenarioChange(LOGISTICS)}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              activeScenario.id === "logistics"
                ? "bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/60 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Scenario 2: Logistics Crisis Pivot
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-3 gap-px bg-white/10 border-b border-white/10 font-mono text-center">
        <div className="p-3 bg-[#0d121c]">
          <span className="text-white/40 block text-[10px] uppercase">Evaluated Paths</span>
          <span className="text-base font-bold text-white">{kpis.evals}</span>
        </div>
        <div className="p-3 bg-[#0d121c]">
          <span className="text-white/40 block text-[10px] uppercase">Latent Cached Walls</span>
          <span className="text-base font-bold text-[#00e5ff]">{kpis.latent}</span>
        </div>
        <div className="p-3 bg-[#0d121c]">
          <span className="text-white/40 block text-[10px] uppercase">Causal Stack Depth</span>
          <span className="text-base font-bold text-[#00ff88]">{kpis.depth}</span>
        </div>
      </div>

      {/* 3D WebGL Canvas Area */}
      <div
        className="relative w-full h-[480px] bg-[#070a10] overflow-hidden select-none cursor-grab active:cursor-grabbing"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onWheel={handleWheel}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* 3D Floating Screen Labels */}
        {screenLabels.map((lbl) => {
          if (lbl.x < -100 || lbl.x > 3000) return null;
          return (
            <div
              key={lbl.id}
              style={{
                position: "absolute",
                left: `${lbl.x}px`,
                top: `${lbl.y}px`,
                transform: "translate(-50%, -120%)"
              }}
              dangerouslySetInnerHTML={{ __html: lbl.text }}
              className={`pointer-events-none transition-all duration-200 font-mono text-[11px] px-2 py-0.5 rounded border backdrop-blur-md whitespace-nowrap shadow-md ${
                lbl.type === "win"
                  ? "bg-[#00ff88]/20 border-[#00ff88] text-[#00ff88] font-bold shadow-[0_0_12px_rgba(0,255,136,0.4)]"
                  : lbl.type === "pivot"
                  ? "bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff] font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  : lbl.type === "dead"
                  ? "bg-[#ff3b5c]/25 border-[#ff3b5c] text-[#ff3b5c] font-bold"
                  : lbl.type === "root"
                  ? "bg-white/20 border-white text-white font-bold"
                  : "bg-black/70 border-white/20 text-white/80"
              }`}
            />
          );
        })}

        {/* Floating Status Ticker */}
        <div className="absolute top-3.5 left-3.5 right-3.5 md:right-auto md:max-w-md p-3 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono pointer-events-none">
          <div className="text-white/40 text-[10px] uppercase mb-0.5">CURRENT STATE</div>
          <div className="text-[#00ff88] font-medium leading-snug">{statusText}</div>
        </div>

        {/* Floating Legend */}
        <div className="absolute bottom-3.5 left-3.5 p-2.5 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10.5px] font-mono flex flex-col gap-1 pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <span className="text-white/70">Solid Green: Optimal Chosen Path</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#475569]" />
            <span className="text-white/70">Wireframe Box: Geometric Unit Cube</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff00d4]" />
            <span className="text-white/70">Magenta: Memory Backtracking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e5ff]" />
            <span className="text-white/70">Cyan: Latent Pivot</span>
          </div>
        </div>

        {/* Orbit Hint */}
        <div className="absolute bottom-3.5 right-3.5 text-[10px] font-mono text-white/40 bg-black/60 px-2 py-1 rounded border border-white/5 pointer-events-none">
          Drag to Rotate · Scroll to Zoom
        </div>
      </div>

      {/* Bottom Controls & Terminal Stream */}
      <div className="p-4 md:p-6 bg-[#0a0e17] border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => runSimulation(activeScenario)}
              disabled={isPlaying}
              className="flex-1 py-2.5 px-4 rounded-lg bg-[#00ff88] text-black font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-[#00ff88]/90 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,255,136,0.3)]"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              {isPlaying ? "Simulating..." : "Replay"}
            </button>
            <button
              onClick={() => {
                clearScene();
                setStatusText("Reset to initial state.");
                setLogs([]);
              }}
              className="py-2.5 px-3 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 text-xs font-mono transition-all"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-white/50">
            <span>Speed:</span>
            <div className="flex items-center gap-1">
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`px-2 py-1 rounded text-[11px] ${
                    speed === s
                      ? "bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/50 font-bold"
                      : "bg-white/5 text-white/40"
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Terminal */}
        <div className="md:col-span-2 h-36 overflow-y-auto bg-black/60 rounded-xl p-3 border border-white/5 font-mono text-[11px] space-y-1 scrollbar-thin">
          <div className="text-white/30 text-[10px] pb-1 border-b border-white/5 mb-1.5 flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#00ff88]" />
            DETERMINISTIC EXECUTION LOG
          </div>
          {logs.length === 0 ? (
            <div className="text-white/30 italic">Click Replay to start simulation...</div>
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
