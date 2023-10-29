import { useProgress } from "@react-three/drei";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingEuro from "../../public/textures/LoadingEuropsd.png";

export default function LoadingScreen() {
  const { progress, loaded } = useProgress();
  const [loading, setLoading] = useState(false);
  const [transitionEnd, setTransitionEnd] = useState(false);

  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  useEffect(() => {
    if (progress) {
      if (progress >= 20) {
        setTimeout(() => {
          setStar2(true);
        }, 500);
      }
      if (star2) {
        setStar3(true);
      }
      if (progress >= 86) {
        setTimeout(() => {
          setStar4(true);
        }, 1500);
        setTimeout(() => {
          setStar5(true);
        }, 2500);
      }
    }
    console.log(Math.floor(progress));
  }, [progress, loaded]);

  useEffect(() => {
    if (star5) {
      setLoading(true);
      setTimeout(() => {
        setTransitionEnd(true);
      }, 1500);
    }
  }, [star5, progress, loaded]);

  return (
    <div
      className={clsstail(
        "transition-opacity ease-in-out duration-[1000ms] absolute  w-screen h-screen flex justify-around items-center text-[#DDDDDD]",
        loading ? "opacity-0" : "opacity-100",
        transitionEnd ? "z-0 hidden" : "z-20"
      )}
    >
      {/* <div className="xl:pt-36 pt-[20%]">LOADING</div>
      <div className="font-extrabold mb-5">{Math.floor(progress)}%</div> */}
      <div className="bg-[#252525] absolute w-screen h-screen z-40"></div>
      <Image
        src={LoadingEuro}
        alt="loadingEuro"
        className={`w-[80px] h-fit ${progress >= 20 ? "z-50" : "z-0"}`}
        quality={40}
      />
      <Image
        src={LoadingEuro}
        alt="loadingEuro"
        className={`w-[80px] h-fit ${star2 ? "z-50" : "z-0"}`}
        quality={40}
      />
      <Image
        src={LoadingEuro}
        alt="loadingEuro"
        className={`w-[80px] h-fit ${star3 ? "z-50" : "z-0"}`}
        quality={40}
      />
      <Image
        src={LoadingEuro}
        alt="loadingEuro"
        className={`w-[80px] h-fit ${star4 ? "z-50" : "z-0"}`}
        quality={40}
      />
      <Image
        src={LoadingEuro}
        alt="loadingEuro"
        className={`w-[80px] h-fit ${star5 ? "z-50" : "z-0"}`}
        quality={40}
      />
    </div>
  );
}

function clsstail(...classnames: string[]) {
  return classnames.join(" ");
}
// [1,2,3] = join("/") => "1/2/3"
