import Image from "next/image";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { sequenceIntState } from "../util/atom";
import { useEffect, useState } from "react";
import Suppoerter from "../../public/Supporter.png";

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
      className={`transition-opacity ease-in-out duration-[4000ms] absolute bg-[#252525] w-screen h-screen flex flex-col justify-center items-center text-[#DDDDDD] "
        ${sequenceInt === 12 || sequenceInt === 13 ? "z-40" : "-z-10 hidden"}
        ${isBoard ? "opacity-100" : "opacity-0"}`}
    >
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
