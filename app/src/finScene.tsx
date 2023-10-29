import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { sequenceIntState } from "../util/atom";
import { useEffect, useState } from "react";
import Suppoerter from "../../public/Supporter.png";
import Euro from "../../public/textures/LoadingEuropsd.png";
import Insta from "../../public/textures/instalogo.png";
import angel from "../../public/textures/thumbEuro_color.png";

export default function FinScene() {
  const [sequenceInt, setSequenceInt] = useRecoilState(sequenceIntState);
  const [isBoard, setIsBoard] = useState(false);

  useEffect(() => {
    if (sequenceInt === 12 || sequenceInt === 13) {
      setTimeout(() => {
        setIsBoard(true);
      }, 500);

      setTimeout(() => {
        setSequenceInt(13);
      }, 4000);
    }
  }, [sequenceInt]);

  return (
    <div
      className={`transition-opacity ease-in-out duration-[4000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center text-[#DDDDDD] ${
        sequenceInt === 12 || sequenceInt === 13 ? "z-40" : "-z-10 hidden"
      }
      ${isBoard ? "opacity-100" : "opacity-0"}
        `}
    >
      <div className="flex justify-center items-center mb-[30px]">
        <div className="flex justify-center items-center lg:mr-10 zero:mr-3">
          <div className="text-right w-[75px] lg:mr-4 zero:mr-1 ">
            ReStart :
          </div>
          <button
            onClick={() => {
              window.location.reload();
            }}
          >
            <Image
              src={Euro}
              alt="refresh"
              className="w-[50px] h-fit cursor-pointer no-drag"
            />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-right w-[75px] lg:mr-4 zero:mr-2 ">
            Instagram :
          </div>

          <Link
            href={"https://www.instagram.com/jeongk___k/"}
            target="_blank"
            className="mt-1"
          >
            <Image
              src={Insta}
              alt="refresh"
              className="w-[35px] h-fit cursor-pointer no-drag"
            />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-right lg:w-[75px] zero:w-[60px] mr-4 ">
            Site :
          </div>

          <Link
            href={"https://jeongeunpark.com/2022"}
            target="_blank"
            className="mt-1"
          >
            <Image
              src={angel}
              alt="refresh"
              className="w-[35px] h-fit cursor-pointer no-drag"
            />
          </Link>
        </div>
      </div>
      <Link
        href="https://www.vivlepark.com"
        className="md:w-[30%] mt-5 w-[80%]"
        target="_blank"
      >
        <Image src={Suppoerter} alt="support" />
      </Link>
    </div>
  );
}
