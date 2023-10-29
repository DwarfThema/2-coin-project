"use client";

import { Environment, KeyboardControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MainScene from "./src/mainScene";
import { Suspense, useEffect, useState } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import LoadingScreen from "./src/loadingScreen";
import { useRecoilState } from "recoil";
import { sequenceIntState } from "./util/atom";
import FinScene from "./src/finScene";
import Info from "./src/info";
import { isMobile } from "react-device-detect";

export default function Home() {
  const [sequenceInt, setSequenceInt] = useRecoilState(sequenceIntState);

  const [fovState, setFovState] = useState(40);
  useEffect(() => {
    if (isMobile) {
      setFovState(60);
    }
  }, []);

  return (
    <main className="h-screen w-screen absolute bg-[#202020] flex justify-center items-center">
      <LoadingScreen />
      <FinScene />
      <Info />

      {sequenceInt !== 13 ? (
        <Canvas
          shadows
          className="z-0 h-screen w-screen"
          camera={{ fov: fovState }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <fog attach="fog" args={["#202030", 10, 5000]} />
            <MainScene />
            <EffectComposer>
              <Vignette eskil={false} offset={0.05} darkness={0.7} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      ) : null}
    </main>
  );
}
