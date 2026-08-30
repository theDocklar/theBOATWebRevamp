"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

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
  title: "Simulation 1 · Probabilistic Lattice (Smart Home)",
  trigger: "Core Trigger A: room temperature is 82°F.",
  startLabel: "A · too hot",
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
  title: "Simulation 2 · Latent Memory Pivot (Logistics)",
  trigger: "Core Trigger A: cargo ship arrives at Port of LA → dock strike.",
  startLabel: "A · LA strike",
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
  new THREE.Vector3(1.4, 0, 0),
  new THREE.Vector3(0, 1.4, 0),
  new THREE.Vector3(0, 0, 1.4)
];

const C = {
  bg: 0x0e1117,
  green: 0x34d399,
  red: 0xf87171,
  magenta: 0xe879f9,
  cyan: 0x22d3ee,
  ghost: 0x3a4456,
  node: 0xdde4ee,
  grid: 0x1c2330
};

interface LabelItem {
  id: string;
  html: string;
  pos: THREE.Vector3;
  cls: string;
}

export default function CubeAlgorithmSandbox() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const [activeScenarioId, setActiveScenarioId] = useState<string>("smart_home");
  const [speed, setSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("Idle — choose a simulation above.");
  const [logs, setLogs] = useState<Array<{ text: string; cls: string }>>([]);

  const [kpis, setKpis] = useState({
    evals: 0,
    latent: 0,
    depth: 0
  });

  const [screenLabels, setScreenLabels] = useState<Array<{ id: string; x: number; y: number; html: string; cls: string }>>([]);
  const labelsRef = useRef<LabelItem[]>([]);

  const simRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    objects: THREE.Object3D[];
    steps: Array<{ t: number; fn: () => void }>;
    si: number;
    t0: number;
    running: boolean;
    paused: boolean;
    speed: number;
    theta: number;
    phi: number;
    radius: number;
    target: THREE.Vector3;
    drag: boolean;
    px: number;
    py: number;
  } | null>(null);

  // Screen label projection
  const updateLabels = useCallback(() => {
    if (!simRef.current || !stageRef.current) return;
    const { camera } = simRef.current;
    const w = stageRef.current.clientWidth;
    const h = stageRef.current.clientHeight;

    const projected = labelsRef.current.map((l) => {
      const p = l.pos.clone().project(camera);
      const isVisible = p.z < 1;
      const x = (p.x * 0.5 + 0.5) * w;
      const y = (-p.y * 0.5 + 0.5) * h;

      return {
        id: l.id,
        x: isVisible ? x : -9999,
        y: isVisible ? y : -9999,
        html: l.html,
        cls: l.cls
      };
    });

    setScreenLabels(projected);
  }, []);

  // Initialize Three.js
  useEffect(() => {
    if (!canvasRef.current || !stageRef.current) return;

    const w = stageRef.current.clientWidth;
    const h = stageRef.current.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(C.bg);
    scene.fog = new THREE.Fog(C.bg, 14, 30);

    const camera = new THREE.PerspectiveCamera(46, w / h, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const dl = new THREE.DirectionalLight(0xffffff, 0.7);
    dl.position.set(4, 8, 6);
    scene.add(dl);

    // Floor grid
    const grid = new THREE.GridHelper(24, 24, 0x232b3a, 0x161c27);
    grid.position.y = -0.6;
    scene.add(grid);

    const theta = 0.72;
    const phi = 1.12;
    const radius = 9.2;
    const target = new THREE.Vector3(1, 1.4, 1);

    simRef.current = {
      scene,
      camera,
      renderer,
      objects: [],
      steps: [],
      si: 0,
      t0: performance.now(),
      running: false,
      paused: false,
      speed: 1,
      theta,
      phi,
      radius,
      target,
      drag: false,
      px: 0,
      py: 0
    };

    function placeCam() {
      if (!simRef.current) return;
      const { camera, theta, phi, radius, target } = simRef.current;
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.cos(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(target);
    }

    placeCam();

    let animationId: number;
    function tick(now: number) {
      animationId = requestAnimationFrame(tick);
      if (simRef.current) {
        const { running, paused, si, steps, t0, speed, scene, camera, renderer } = simRef.current;
        if (running && !paused && si < steps.length && now - t0 >= steps[si].t / speed) {
          steps[si].fn();
          simRef.current.si++;
          if (simRef.current.si >= steps.length) {
            simRef.current.running = false;
          }
        }
        placeCam();
        renderer.render(scene, camera);
        updateLabels();
      }
    }
    animateTimeline();
    function animateTimeline() {
      animationId = requestAnimationFrame(tick);
    }

    const handleResize = () => {
      if (!stageRef.current || !simRef.current) return;
      const width = stageRef.current.clientWidth;
      const height = stageRef.current.clientHeight || 560;
      simRef.current.camera.aspect = width / height;
      simRef.current.camera.updateProjectionMatrix();
      simRef.current.renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [updateLabels]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!simRef.current) return;
    simRef.current.drag = true;
    simRef.current.px = e.clientX;
    simRef.current.py = e.clientY;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!simRef.current || !simRef.current.drag) return;
    const dx = e.clientX - simRef.current.px;
    const dy = e.clientY - simRef.current.py;
    simRef.current.px = e.clientX;
    simRef.current.py = e.clientY;

    simRef.current.theta += dx * 0.006;
    simRef.current.phi = Math.min(2.6, Math.max(0.35, simRef.current.phi + dy * 0.006));
    updateLabels();
  };

  const handlePointerUp = () => {
    if (simRef.current) simRef.current.drag = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!simRef.current) return;
    simRef.current.radius = Math.min(24, Math.max(4, simRef.current.radius + e.deltaY * 0.008));
    updateLabels();
  };

  // 3D Scene Geometry Functions
  const clearScene = useCallback(() => {
    if (!simRef.current) return;
    const { scene, objects } = simRef.current;
    objects.forEach((o) => scene.remove(o));
    simRef.current.objects = [];
    labelsRef.current = [];
    setScreenLabels([]);
  }, []);

  const track = (o: THREE.Object3D) => {
    if (!simRef.current) return o;
    simRef.current.objects.push(o);
    simRef.current.scene.add(o);
    return o;
  };

  const nodeCube = (pos: THREE.Vector3, color = C.node, size = 0.24, opacity = 1) => {
    const m = new THREE.Mesh(
      new THREE.BoxGeometry(size, size, size),
      new THREE.MeshStandardMaterial({
        color,
        transparent: opacity < 1,
        opacity,
        emissive: color,
        emissiveIntensity: 0.25,
        roughness: 0.4
      })
    );
    m.position.copy(pos);
    return track(m);
  };

  const line = (a: THREE.Vector3, b: THREE.Vector3, color: number, dashed = false) => {
    const g = new THREE.BufferGeometry().setFromPoints([a, b]);
    const mat = dashed
      ? new THREE.LineDashedMaterial({ color, dashSize: 0.12, gapSize: 0.09, transparent: true, opacity: 0.8 })
      : new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 });
    const l = new THREE.Line(g, mat);
    if (dashed) l.computeLineDistances();
    return track(l);
  };

  const wallCube = (corner: THREE.Vector3, scale = 1.4) => {
    const g = new THREE.BoxGeometry(scale, scale, scale);
    const e = new THREE.LineSegments(
      new THREE.EdgesGeometry(g),
      new THREE.LineBasicMaterial({ color: 0x2c3648, transparent: true, opacity: 0.75 })
    );
    e.position.copy(corner.clone().addScalar(scale / 2));
    return track(e);
  };

  const tube = (a: THREE.Vector3, b: THREE.Vector3, color: number, r = 0.035) => {
    const dir = b.clone().sub(a);
    const len = dir.length();
    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(r, r, len, 10),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.5,
        roughness: 0.35
      })
    );
    m.position.copy(a.clone().add(b).multiplyScalar(0.5));
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return track(m);
  };

  const addLabel = (pos: THREE.Vector3, html: string, cls = "") => {
    const rec = { id: Math.random().toString(), html, pos: pos.clone(), cls };
    labelsRef.current.push(rec);
    return rec;
  };

  // Build and play scenario
  const buildScenario = useCallback(
    (cfg: ScenarioConfig) => {
      clearScene();
      setLogs([]);
      setKpis({ evals: 0, latent: 0, depth: 0 });

      if (simRef.current) {
        simRef.current.target.set(cfg.focus[0], cfg.focus[1], cfg.focus[2]);
        simRef.current.radius = cfg.radius || 9.2;
      }

      setLogs((prev) => [
        ...prev,
        { text: `# ${cfg.title}`, cls: "d" },
        { text: cfg.trigger, cls: "y" }
      ]);

      const T: Array<{ t: number; fn: () => void }> = [];
      let t = 400;
      let cur = new THREE.Vector3(0, 0, 0);

      T.push({
        t: 0,
        fn: () => {
          nodeCube(cur, 0xffffff, 0.3);
          addLabel(cur, `<b>${cfg.startLabel}</b>`);
        }
      });

      const pathStack: Array<{ node: SimNode; origin: THREE.Vector3; end: THREE.Vector3; chosen: number }> = [];

      cfg.nodes.forEach((nd) => {
        const origin = cur.clone();

        // 1. Simulate 3 options
        T.push({
          t,
          fn: () => {
            setStatusText(`Node ${nd.id}: simulating 3 timelines (X, Y, Z)…`);
            setLogs((prev) => [...prev, { text: `>> Node ${nd.id} simulating options (X, Y, Z axes)…`, cls: "w" }]);

            nd.opts.forEach((o, i) => {
              const p = origin.clone().add(AXIS[i]);
              line(origin, p, o.score <= 0 ? C.red : 0x8892a6, true);
              nodeCube(p, o.score <= 0 ? C.red : C.ghost, 0.16, 0.85);
              addLabel(
                p,
                `[${nd.id}${i + 1}] ${o.label} · <b>${o.score.toFixed(1)}</b>`,
                o.score <= 0 ? "dead" : ""
              );
              setLogs((prev) => [
                ...prev,
                {
                  text: `   [${nd.id}${i + 1}] ${o.label} → score ${o.score.toFixed(1)}`,
                  cls: o.score <= 0 ? "r" : "w"
                }
              ]);
              setKpis((k) => ({ ...k, evals: k.evals + 1 }));
            });

            wallCube(origin, 1.4);
          }
        });
        t += 1500;

        // Dead end
        if (nd.dead) {
          T.push({
            t,
            fn: () => {
              setStatusText(`DEAD END at node ${nd.id} — all scores 0.0`);
              setLogs((prev) => [...prev, { text: `!! ALERT: CURRENT PATH HIT A DEAD END (score 0.0) !!`, cls: "r" }]);
              nd.opts.forEach((o, i) => {
                const p = origin.clone().add(AXIS[i]);
                line(origin, p, C.red, false);
              });
            }
          });
          t += 1300;

          // Backtrack
          T.push({
            t,
            fn: () => {
              setStatusText("Causal memory backtrack — scanning latent walls…");
              setLogs((prev) => [...prev, { text: `>> INITIATING CAUSAL MEMORY BACKTRACKING…`, cls: "m" }]);
            }
          });
          t += 700;

          for (let i = pathStack.length - 1; i >= 0; i--) {
            const seg = pathStack[i];
            T.push({
              t,
              fn: () => {
                tube(seg.end, seg.origin, C.magenta, 0.05);
                const best = seg.node.opts.reduce(
                  (a, b, j) => (j === seg.chosen ? a : a && a.score >= b.score ? a : b),
                  null as NodeOption | null
                );
                setLogs((prev) => [
                  ...prev,
                  {
                    text: `>> Traversing back to Node ${seg.node.id}… best latent: ${best?.label} (${best?.score.toFixed(1)})`,
                    cls: "m"
                  }
                ]);
                setKpis((k) => ({ ...k, evals: k.evals + 2 }));
              }
            });
            t += 900;
          }

          // Pivot
          if (cfg.pivot) {
            const pv = cfg.pivot;
            const pOrigin = pathStack[pv.stackIdx].origin;
            const pTarget = pOrigin.clone().add(AXIS[pv.optIdx]);

            T.push({
              t,
              fn: () => {
                setStatusText("PIVOT: reactivating cached latent node — no recomputation.");
                setLogs((prev) => [
                  ...prev,
                  { text: `>> Causal analysis complete. ${pv.log}`, cls: "c" },
                  { text: `>> PIVOTING PATHWAY to latent node ${pv.id}.`, cls: "c" }
                ]);
                tube(pOrigin, pTarget, C.cyan, 0.055);
                nodeCube(pTarget, C.cyan, 0.26);
              }
            });
            t += 1200;

            let c2 = pTarget.clone();
            pv.continueDirs.forEach((d, i) => {
              T.push({
                t,
                fn: () => {
                  const nx = c2.clone().add(AXIS[d]);
                  tube(c2, nx, C.cyan, 0.055);
                  nodeCube(nx, C.cyan, 0.22);
                  if (pv.continueLogs[i]) {
                    setLogs((prev) => [...prev, { text: `>> ${pv.continueLogs[i]}`, cls: "c" }]);
                  }
                  c2 = nx;
                  setKpis((k) => ({ ...k, depth: k.depth + 1 }));
                }
              });
              t += 900;
            });
          }

          T.push({
            t,
            fn: () => {
              setStatusText(cfg.doneMsg);
              setLogs((prev) => [...prev, { text: `=== ${cfg.doneLog} ===`, cls: "g" }]);
            }
          });
          return;
        }

        // 2. Select Best Outcome
        const bi = nd.opts.reduce((m, o, i) => (o.score > nd.opts[m].score ? i : m), 0);
        const chosenPos = origin.clone().add(AXIS[bi]);

        T.push({
          t,
          fn: () => {
            setStatusText(`Node ${nd.id}: best outcome ${nd.id}${bi + 1} — ${nd.opts[bi].label}`);
            setLogs((prev) => [
              ...prev,
              {
                text: `>> BEST OUTCOME SELECTED: ${nd.id}${bi + 1} (${nd.opts[bi].label}). Collapsing timeline.`,
                cls: "g"
              }
            ]);
            tube(origin, chosenPos, C.green, 0.05);
            nodeCube(chosenPos, C.green, 0.26);

            nd.opts.forEach((o, i) => {
              if (i !== bi) {
                setKpis((k) => ({ ...k, latent: k.latent + 1 }));
              }
            });
            setKpis((k) => ({ ...k, depth: k.depth + 1 }));

            const rec = labelsRef.current.find((l) => l.pos.distanceTo(chosenPos) < 0.01);
            if (rec) rec.cls = "win";
          }
        });

        pathStack.push({ node: nd, origin, end: chosenPos, chosen: bi });
        cur = chosenPos;
        t += 1400;
      });

      if (!cfg.nodes.some((n) => n.dead)) {
        T.push({
          t,
          fn: () => {
            setStatusText(cfg.doneMsg);
            setLogs((prev) => [...prev, { text: `=== ${cfg.doneLog} ===`, cls: "g" }]);
          }
        });
      }

      if (simRef.current) {
        simRef.current.steps = T;
        simRef.current.si = 0;
        simRef.current.t0 = performance.now();
        simRef.current.running = true;
        simRef.current.paused = false;
        setIsPaused(false);
      }
    },
    [clearScene]
  );

  // Speed and Pause controls
  const handleSpeedChange = (s: number) => {
    setSpeed(s);
    if (simRef.current) simRef.current.speed = s;
  };

  const togglePause = () => {
    if (!simRef.current || !simRef.current.running) return;
    const nextPaused = !simRef.current.paused;
    simRef.current.paused = nextPaused;
    setIsPaused(nextPaused);
    if (!nextPaused) {
      simRef.current.t0 =
        performance.now() - (simRef.current.steps[simRef.current.si]?.t / simRef.current.speed || 0) + 10;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      buildScenario(SMART_HOME);
    }, 400);
    return () => clearTimeout(timer);
  }, [buildScenario]);

  // Scroll logs to bottom
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="w-full my-12 rounded-2xl overflow-hidden border border-[#252c39] bg-[#0e1117] text-[#e8ecf3] shadow-2xl font-sans">
      <div className="flex flex-col lg:flex-row min-h-[580px] lg:h-[620px]">
        {/* Left Control & Information Side Panel (380px) */}
        <div className="w-full lg:w-[380px] lg:min-w-[380px] bg-[#161b24] border-b lg:border-b-0 lg:border-r border-[#252c39] p-5 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="text-base font-bold tracking-tight text-white mb-1">The Cube Algorithm</h3>
            <p className="text-xs text-[#9aa5b5] mb-3.5 leading-relaxed">
              Deterministic geometric decision lattice — greedy 3-axis expansion, latent path memory, and a causal ledger.
            </p>

            {/* Scenario Buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => {
                  setActiveScenarioId("smart_home");
                  buildScenario(SMART_HOME);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  activeScenarioId === "smart_home"
                    ? "bg-[#164a38] border-[#1e6b50] text-[#34d399] outline-1 outline-[#34d399]"
                    : "bg-[#1e2532] border-[#252c39] text-[#e8ecf3] hover:bg-[#283243]"
                }`}
              >
                ▶ Sim 1 · Smart Home
              </button>
              <button
                onClick={() => {
                  setActiveScenarioId("logistics");
                  buildScenario(LOGISTICS);
                }}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  activeScenarioId === "logistics"
                    ? "bg-[#164a38] border-[#1e6b50] text-[#34d399] outline-1 outline-[#34d399]"
                    : "bg-[#1e2532] border-[#252c39] text-[#e8ecf3] hover:bg-[#283243]"
                }`}
              >
                ▶ Sim 2 · Logistics Crisis
              </button>
            </div>

            {/* Speed & Pause */}
            <div className="flex items-center gap-1.5 mb-3 text-xs text-[#5f6b7d]">
              <span className="mr-1 text-[11px]">Speed</span>
              {[0.6, 1, 1.8].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-1 text-[11px] rounded border ${
                    speed === s
                      ? "bg-[#283243] border-[#5f6b7d] text-white"
                      : "bg-[#1e2532] border-[#252c39] text-[#9aa5b5] hover:bg-[#283243]"
                  }`}
                >
                  {s}×
                </button>
              ))}
              <button
                onClick={togglePause}
                className="ml-auto px-2.5 py-1 text-[11px] bg-[#1e2532] border border-[#252c39] rounded text-[#9aa5b5] hover:bg-[#283243]"
              >
                {isPaused ? "▶ Resume" : "⏸ Pause"}
              </button>
            </div>

            {/* KPI Counters */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-[#12161f] border border-[#252c39] rounded-lg p-2 text-center">
                <div className="text-base font-bold text-white font-mono">{kpis.evals}</div>
                <div className="text-[9.5px] text-[#5f6b7d] uppercase tracking-wider mt-0.5">Option evals</div>
              </div>
              <div className="bg-[#12161f] border border-[#252c39] rounded-lg p-2 text-center">
                <div className="text-base font-bold text-[#22d3ee] font-mono">{kpis.latent}</div>
                <div className="text-[9.5px] text-[#5f6b7d] uppercase tracking-wider mt-0.5">Latent cached</div>
              </div>
              <div className="bg-[#12161f] border border-[#252c39] rounded-lg p-2 text-center">
                <div className="text-base font-bold text-[#34d399] font-mono">{kpis.depth}</div>
                <div className="text-[9.5px] text-[#5f6b7d] uppercase tracking-wider mt-0.5">Path depth</div>
              </div>
            </div>

            {/* Status box */}
            <div className="text-xs p-2 rounded-lg bg-[#12161f] border border-[#252c39] text-[#9aa5b5] min-h-[36px] leading-snug mb-3">
              {statusText}
            </div>

            {/* Live Terminal Log */}
            <div
              ref={logRef}
              className="h-44 overflow-y-auto bg-[#0a0d12] border border-[#252c39] rounded-lg p-2.5 font-mono text-[11px] leading-relaxed space-y-0.5 scrollbar-thin"
            >
              {logs.length === 0 ? (
                <span className="text-[#5f6b7d]"># Causal ledger will appear here…</span>
              ) : (
                logs.map((l, i) => (
                  <div
                    key={i}
                    className={
                      l.cls === "g"
                        ? "text-[#34d399]"
                        : l.cls === "r"
                        ? "text-[#f87171]"
                        : l.cls === "m"
                        ? "text-[#e879f9]"
                        : l.cls === "c"
                        ? "text-[#22d3ee]"
                        : l.cls === "y"
                        ? "text-[#fbbf24]"
                        : l.cls === "d"
                        ? "text-[#5f6b7d]"
                        : "text-[#9aa5b5]"
                    }
                  >
                    {l.text}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 pt-3 border-t border-[#252c39] text-[11px] text-[#9aa5b5] mt-3">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 rounded bg-[#34d399] inline-block" />
              Optimal path
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 rounded bg-[#f87171] inline-block" />
              Discarded
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 rounded bg-[#e879f9] inline-block" />
              Backtrack
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-1 rounded bg-[#22d3ee] inline-block" />
              Pivot (latent)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-[#3a4456] inline-block" />
              Latent wall
            </span>
          </div>
        </div>

        {/* Right 3D Interactive Canvas Stage */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={handleWheel}
          className="flex-1 relative bg-[#0e1117] min-h-[460px] cursor-grab active:cursor-grabbing select-none overflow-hidden"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />

          {/* Sleek HTML 3D Projected Pill Labels */}
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
                dangerouslySetInnerHTML={{ __html: lbl.html }}
                className={`pointer-events-none text-[11px] leading-tight px-2 py-0.5 rounded-md border whitespace-nowrap transition-all ${
                  lbl.cls === "win"
                    ? "border-[#1e6b50] text-[#34d399] bg-[rgba(14,17,23,0.85)] font-bold shadow-[0_0_10px_rgba(52,211,153,0.2)]"
                    : lbl.cls === "dead"
                    ? "border-[#7f2c2c] text-[#f87171] bg-[rgba(14,17,23,0.85)]"
                    : "border-[#252c39] text-[#9aa5b5] bg-[rgba(14,17,23,0.78)]"
                }`}
              />
            );
          })}

          {/* Bottom-right drag hint */}
          <div className="absolute bottom-3 right-4 text-[11px] text-[#5f6b7d] pointer-events-none">
            drag to orbit · wheel to zoom
          </div>
        </div>
      </div>
    </div>
  );
}
