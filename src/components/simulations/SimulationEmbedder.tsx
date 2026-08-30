"use client";

import React from "react";
import dynamic from "next/dynamic";

const CubeAlgorithmSandbox = dynamic(
  () => import("./CubeAlgorithmSandbox"),
  {
    ssr: false,
    loading: () => (
      <div className="my-10 h-[480px] rounded-2xl border border-white/10 bg-[#0a0d14] flex flex-col items-center justify-center text-white/50 font-mono text-xs gap-3">
        <div className="w-6 h-6 border-2 border-[#00ff88] border-t-transparent rounded-full animate-spin" />
        <span>Loading Interactive 3D Simulation Sandbox...</span>
      </div>
    )
  }
);

interface SimulationEmbedderProps {
  slug: string;
}

export default function SimulationEmbedder({ slug }: SimulationEmbedderProps) {
  if (
    slug === "cube-algorithm-deterministic-geometric-ai-framework" ||
    slug.includes("cube-algorithm") ||
    slug.includes("cube_algorithm")
  ) {
    return <CubeAlgorithmSandbox />;
  }

  return null;
}
