import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Vector3 } from "three";

export default function Rig({
  position = new Vector3(0, 0, 0),
  focus = new Vector3(0, 0, 0),
  camSpeed,
  sqeuenceInt,
}: {
  position?: Vector3;
  focus?: Vector3;
  camSpeed?: number;
  sqeuenceInt?: number;
}) {
  const { controls } = useThree() as { controls: any };

  const [rigFix, setRigFix] = useState(false);
  const [azimuteInt, setAzimuteInt] = useState(0);
  useEffect(() => {
    if (!rigFix) {
      controls?.setLookAt(...position.toArray(), ...focus.toArray(), true);
    }
  });

  useEffect(() => {
    if (sqeuenceInt === 6) {
      if (isMobile) {
        setTimeout(() => {
          setRigFix(true);
          setAzimuteInt(8);
        }, 4000);
      }
    } else {
      setRigFix(false);
      setAzimuteInt(0);
    }
  }, [sqeuenceInt]);

  return (
    <>
      <CameraControls
        makeDefault
        polarRotateSpeed={0.001}
        azimuthRotateSpeed={0.001}
        minZoom={0.01}
        maxZoom={0.01}
        maxSpeed={rigFix ? 0 : camSpeed}
      />
    </>
  );
}
