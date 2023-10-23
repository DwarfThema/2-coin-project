import {
  SpotLight,
  useAnimations,
  useCursor,
  useGLTF,
} from "@react-three/drei";
import {
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { SkeletonUtils } from "three-stdlib";
import { AnimationAction, Group, LoopOnce, SkinnedMesh, Vector3 } from "three";
import { useFrame, useGraph } from "@react-three/fiber";
import { useControls } from "leva";
import { useRecoilState } from "recoil";
import { litRotTime, sequenceIntState } from "../util/atom";

export default function Angel({ ...props }) {
  const [hover, setHover] = useState(false);
  useCursor(hover);

  const [sequenceInt, setSequenceInt] = useRecoilState(sequenceIntState);

  const AngleRef = useRef<Group>(null);

  const [currentActionState, setCurrentActionState] =
    useState<AnimationAction | null>(null);

  const { scene, animations } = useGLTF("/models/angel.gltf");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { ref: animRef, actions, names } = useAnimations(animations);
  const angelScene = nodes.Scene001 as Group;

  const meshs: SkinnedMesh[] = [];

  angelScene.traverse((obj) => {
    if (obj instanceof SkinnedMesh) {
      meshs.push(obj);
    }
  });

  // AnimationClip Ref
  const animClose = () => {
    const currentAction = actions[names[0]] as AnimationAction;
    setCurrentActionState(currentAction);
    currentAction.paused = false;
    currentAction.timeScale = 1;
    currentAction.setLoop(LoopOnce, 1);
    currentAction.clampWhenFinished = true;
    currentAction.play();
  };

  const animLock = () => {
    const currentAction = actions[names[1]] as AnimationAction;
    setCurrentActionState(currentAction);
    currentAction.paused = false;
    currentAction.timeScale = 1;
    currentAction.setLoop(LoopOnce, 1);
    currentAction.clampWhenFinished = true;
    currentAction.play();
  };

  const [litRoateTimes, setLitRoateTimes] = useRecoilState(litRotTime);
  const [lit1, setLit1] = useState(false);
  const [lit2, setLit2] = useState(false);
  const [lit3, setLit3] = useState(false);

  const [litTotal, setlitTotal] = useState(false);

  const [lockBallVis, setLockBallVis] = useState(false);

  useEffect(() => {
    if (sequenceInt === 4) {
      setLit1(true);
    }
    if (sequenceInt === 7) {
      setTimeout(() => {
        animClose();
      }, 2000);
      // 시간 변겨할때 mainScene도 변경해야함.
    }
    if (sequenceInt === 8) {
      setLockBallVis(true);
    } else {
      setLockBallVis(false);
    }

    if (sequenceInt === 10) {
      setTimeout(() => {
        setlitTotal(false);
        setSequenceInt(11);
      }, 7000);
    }

    if (sequenceInt === 11) {
      setTimeout(() => {
        setSequenceInt(12);
      }, 5000);
    }
  }, [sequenceInt]);

  useEffect(() => {
    if (sequenceInt === 4) {
      if (litRoateTimes > 2) {
        setSequenceInt(5);
      }
      if (litRoateTimes <= 2 && litRoateTimes >= 1 && !lit1 && !lit2 && !lit3) {
        setLit1(true);
      }
      if (lit1) {
        setTimeout(() => {
          setLit1(false);
          setLit2(true);
        }, 1000);
      }
      if (lit2) {
        setTimeout(() => {
          setLit2(false);
          setLit3(true);
        }, 1000);
      }
      if (lit3) {
        setTimeout(() => {
          setLit3(false);
          setLitRoateTimes((prev) => prev + 1);
        }, 1000);
      }
    }
  }, [lit1, lit2, lit3, litRoateTimes]);

  useFrame(() => {
    if (
      currentActionState &&
      sequenceInt === 7 &&
      !currentActionState?.isRunning() &&
      !litTotal
    ) {
      setTimeout(() => {
        setlitTotal(true);
      }, 4500);

      setTimeout(() => {
        setSequenceInt(8);
      }, 8000);
    }

    if (
      currentActionState &&
      sequenceInt === 9 &&
      !currentActionState?.isRunning()
    ) {
      setSequenceInt(10);
    }
  });
  return (
    <>
      <group ref={AngleRef} {...props}>
        <primitive object={nodes.BaseBone} ref={animRef} />
        {meshs.map((mesh, index) => (
          <skinnedMesh
            key={index}
            geometry={mesh.geometry}
            material={mesh.material}
            skeleton={mesh.skeleton}
            receiveShadow
            castShadow
          />
        ))}
      </group>

      <mesh
        position={[-0.03, -1.27, -1.8]}
        scale={0.15}
        visible={lockBallVis}
        onClick={() => {
          setSequenceInt(9);
          animLock();
        }}
        onPointerOver={() => {
          if (sequenceInt === 8) {
            setHover(true);
          }
        }}
        onPointerOut={() => {
          setHover(false);
        }}
      >
        <sphereGeometry />
        <meshPhongMaterial opacity={0} transparent />
      </mesh>

      <group name="lit1" visible={lit1}>
        <pointLight
          position={[0.33, 0.87, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />

        <pointLight
          position={[0.61, 0.31, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />

        <pointLight
          position={[0.29, 0.48, -1.79]}
          intensity={0.2}
          color="#fffecb"
        />
      </group>
      <group name="lit2" visible={lit2}>
        <pointLight
          position={[-0.35, 0.87, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />
        <pointLight
          position={[-0.64, 0.32, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />
        <pointLight
          position={[-0.32, 0.48, -1.79]}
          intensity={0.2}
          color="#fffecb"
        />
      </group>
      <group name="lit3" visible={lit3}>
        <pointLight
          position={[0, -0.09, -1.55]}
          intensity={0.5}
          color="#fffecb"
        />
        <pointLight
          position={[-0.34, -0.27, -2.11]}
          intensity={0.5}
          color="#fffecb"
        />
        <pointLight
          position={[0.34, -0.27, -2.11]}
          intensity={0.5}
          color="#fffecb"
        />
      </group>

      <group name="lit1" visible={litTotal}>
        <pointLight
          position={[-0.7, -0.56, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />

        <pointLight
          position={[-0.25, -1.14, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />

        <pointLight
          position={[-0.44, -0.76, -1.79]}
          intensity={0.2}
          color="#fffecb"
        />

        <pointLight
          position={[0.64, -0.56, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />
        <pointLight
          position={[0.22, -1.14, -2.11]}
          intensity={0.4}
          color="#fffecb"
        />
        <pointLight
          position={[0.41, -0.76, -1.79]}
          intensity={0.2}
          color="#fffecb"
        />

        <pointLight
          position={[0, -0.09, -1.55]}
          intensity={0.5}
          color="#fffecb"
        />
        <pointLight
          position={[-0.34, -0.27, -2.11]}
          intensity={0.5}
          color="#fffecb"
        />
        <pointLight
          position={[0.34, -0.27, -2.11]}
          intensity={0.5}
          color="#fffecb"
        />
      </group>
    </>
  );
}
