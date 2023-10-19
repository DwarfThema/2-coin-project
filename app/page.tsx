"use client";

import { Environment, KeyboardControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MainScene from "./src/mainScene";
import { Suspense } from "react";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { ACESFilmicToneMapping, sRGBEncoding } from "three";
import LoadingScreen from "./src/loadingScreen";
import { useRecoilState } from "recoil";
import { sequenceIntState } from "./util/atom";
import FinScene from "./src/finScene";
import Info from "./src/info";

export default function Home() {
  const [sequenceInt, setSequenceInt] = useRecoilState(sequenceIntState);

  return (
    <main className="h-screen w-screen absolute bg-[#202020] flex justify-center items-center">
      <LoadingScreen />
      <FinScene />
      <Info />
      {/*       {sequenceInt === 2 ? (
        <div
          className="cursor-pointer text-white text-center text-2xl rounded-lg absolute bottom-[15%] py-1 px-4 bg-white bg-opacity-25 z-20"
          onClick={() => {
            setSequenceInt(3);
          }}
        >
          INSERT COIN
        </div>
      ) : null} */}
      <Canvas
        shadows
        className="z-0 h-screen w-screen"
        camera={{ fov: 40 }}
        onCreated={({ gl }) => {
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 0.9;
        }}
      >
        <Stats />
        <Suspense fallback={null}>
          <Environment preset="night" />
          <fog attach="fog" args={["#202030", 10, 5000]} />
          <MainScene />
          <EffectComposer>
            <Vignette eskil={false} offset={0.05} darkness={0.7} />
            <Bloom
              luminanceThreshold={0.5}
              luminanceSmoothing={3}
              intensity={0.1}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </main>
  );
}
