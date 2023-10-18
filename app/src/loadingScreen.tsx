import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  useEffect(() => {
    if (progress) {
      setLoading(true);
      setTimeout(() => {
        setTransitionEnd(true);
      }, 1500);
    }
  }, [progress, loaded]);

  return (
    <div
      className={clsstail(
        "transition-opacity ease-in-out duration-[1000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center text-[#DDDDDD] ",
        loading ? "opacity-0" : "opacity-100",
        transitionEnd ? "z-0 hidden" : "z-20"
      )}
    >
      <div className="xl:pt-36 pt-[20%]">LOADING</div>
      <div className="font-extrabold mb-5">{Math.floor(progress)}%</div>
    </div>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
