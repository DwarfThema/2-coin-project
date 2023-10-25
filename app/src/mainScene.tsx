import {
  CameraControls,
  Environment,
  Float,
  Gltf,
  Html,
  SoftShadows,
  Stars,
  useCursor,
} from "@react-three/drei";
import { isMobile } from "react-device-detect";
import { use, useEffect, useRef, useState } from "react";
import Rig from "./rig";
import { Vector3 } from "three";
import { useControls } from "leva";
import { useFrame, useThree } from "@react-three/fiber";
import { useRecoilState } from "recoil";
import { lerp } from "three/src/math/MathUtils.js";
import Angel from "./angel";
import { sequenceIntState } from "../util/atom";

export default function MainScene() {
  // Cam Ref
  const [camPos, setCamPos] = useState(new Vector3(0, 0, 1.3));
  const [camFocus, setCamFocus] = useState(new Vector3(0, 0, 0));
  const [camSpeed, setCamSpeed] = useState<number>(1);

  // Hover Ref
  const [hover, setHover] = useState(false);
  useCursor(hover);

  // Sequence Ref
  const [sequenceInt, setSequenceInt] = useRecoilState(sequenceIntState);
  const [sequence3Correct, setSequence3Correct] = useState(false);
  const [sequence7TimeYCorrect, setSequence7TimeYCorrect] = useState(false);
  const [sequence8CamYCorrect, setSequence8CamYCorrect] = useState(-0.5);
  const [sequence8CamZCorrect, setSequence8CamZCorrect] = useState(0);

  // Fog Ref
  const [fogFar, setFogFar] = useState(2.3);

  // Coin Ref
  const [coinRoate, setCoinRotate] = useState(0);
  const [coinFloat, setCoinFloat] = useState(true);
  const [coinY, setCoinY] = useState(0);
  const [coinZ, SetCoinZ] = useState(1);

  useEffect(() => {
    if (sequenceInt === 1) {
      setTimeout(() => {
        setSequenceInt(2);
      }, 2000);
    }
  }, []);

  useFrame((state, delta) => {
    if (sequenceInt === 0 || sequenceInt === 1 || sequenceInt === 2) {
      setCamPos(new Vector3(0, 0, 1.3));
    }

    if (sequenceInt === 3 || sequenceInt === 4 || sequenceInt === 5) {
      if (coinRoate <= 59.8) {
        setCoinRotate(lerp(coinRoate, 60, 0.4 * delta));
      }
      if (sequence3Correct) {
        setCamSpeed(0.1);
        setCamPos(new Vector3(0, 0.25, 2));
        setCamFocus(new Vector3(0, 0.25, 0));
        setFogFar(lerp(fogFar, 6, 0.3 * delta));
      }
    }

    if (coinRoate >= 59.8 && sequenceInt === 3) {
      setSequenceInt(4);
    }

    if (sequenceInt === 6) {
      setCoinFloat(false);
      setCamSpeed(0.1);
      setCoinRotate(122.5);

      if (coinY >= 0) {
        setCamSpeed(0.01);
        setCamPos(new Vector3(0, 0.3, 2));
        setCamFocus(new Vector3(0, 0.3, 0));
      } else {
        setCamPos(new Vector3(0, 0.25, 2));
        setCamFocus(new Vector3(0, 0.25, 0));
      }

      setCoinY(lerp(coinY, 0.3, 0.8 * delta));
      if (coinY >= 0.275) {
        SetCoinZ(lerp(coinZ, -1.1, 1.8 * delta));
      }
      if (coinZ <= -0.96) {
        setSequenceInt(7);
      }
    }

    if (sequenceInt === 7) {
      setTimeout(() => {
        setSequence7TimeYCorrect(true);
      }, 2000);
      // 시간 변겨할때 angle도 변경해야함.

      if (sequence7TimeYCorrect) {
        setCoinFloat(false);
        setCamSpeed(0.1);
        setCamPos(new Vector3(0, -0.5, 2));
        setCamFocus(new Vector3(0, -0.5, 0));
      }
    }

    if (sequenceInt === 8) {
      setCoinFloat(false);
      setCamSpeed(1);
      setCamPos(new Vector3(0, -4, -1.7));
      setCamFocus(new Vector3(0, 1, -1.75));
    }

    if (sequenceInt === 10) {
      setCoinFloat(false);
      setCamSpeed(0.5);
      setCamPos(new Vector3(0, -0.5, 2));
      setCamFocus(new Vector3(0, -0.5, 0));
    }
  });

  return (
    <>
      <fog attach="fog" args={["#202020", 0.1, fogFar]} />
      <SoftShadows size={10} focus={0} samples={20} />
      <directionalLight
        castShadow
        position={[0, 0.9, 2]}
        intensity={1.5}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <directionalLight
        castShadow
        position={[0, -0.8, 5]}
        intensity={0.3}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>

      <directionalLight
        castShadow
        position={[0.5, -10.1, 4.72]}
        intensity={1.5}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, 10, 0.1, 50]}
        />
      </directionalLight>
      <Gltf
        src="/models/coin.gltf"
        position={[0, coinY, coinZ]}
        rotation={[0, coinRoate, 0]}
        scale={0.5}
        onPointerOver={() => {
          if (sequenceInt === 2) {
            setHover(true);
          }
          if (sequenceInt === 5) {
            setHover(true);
          }
        }}
        onPointerOut={() => {
          setHover(false);
        }}
        onClick={() => {
          if (sequenceInt === 2) {
            setSequenceInt(3);
            setTimeout(() => {
              setSequence3Correct(true);
            }, 1500);
          }
          if (sequenceInt === 5) {
            setSequenceInt(6);
          }
        }}
        receiveShadow
        castShadow
      />

      <Float
        speed={1}
        rotationIntensity={0.03}
        floatIntensity={1}
        floatingRange={[0, 0.001]}
        enabled={coinFloat}
      ></Float>
      <Angel
        position={[0, 0.3, -1]}
        rotation={[Math.PI * 0.5, 0, 0]}
        scale={0.5}
      />
      <Rig
        position={camPos}
        focus={camFocus}
        camSpeed={camSpeed}
        sqeuenceInt={sequenceInt}
      />
    </>
  );
}
