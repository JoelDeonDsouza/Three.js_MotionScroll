import React, { Suspense } from "react";
import {
  PerspectiveCamera,
  Preload,
  ScrollControls,
  Scroll,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
// utilities //
import { Sliders, Texts } from "./utilities";

function Banner() {
  return (
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
      <Suspense fallback={null}>
        <ScrollControls infinite horizontal pages={2} distance={1}>
          <Scroll>
            <Sliders />
          </Scroll>
          <Scroll html>
            <Texts />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  );
}

export default Banner;
