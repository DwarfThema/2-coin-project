import { motion, useCycle } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InfoECoin from "../../public/textures/infoCoin_color.png";

export default function Info() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  const [windowDimensions, setWindowDimensions] = useState<number | undefined>(
    undefined
  );

  const [circlePos, setCirclePos] = useState<number>(0);

  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    setCirclePos((windowDimensions as number) - 50);
    return (): void => window.removeEventListener("resize", handleResize);
  }, [circlePos, windowDimensions]); // Empty array ensures that effect is only run on mount

  return (
    <>
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="z-30 fixed top-0 right-0 bottom-0 w-[90px] h-[90px] flex items-start justify-end"
      >
        <motion.div
          className="z-30 w-[50px] h-[50px] m-4 rounded-full bg-zinc-900 opacity-80 "
          variants={infoBar}
        ></motion.div>
        <button
          onClick={() => toggleOpen()}
          className="z-50 absolute mr-[10px] mt-[10px] outline-none border-none rounded-[50%]"
        >
          <Image src={InfoECoin} alt="infoCoin" className="w-[60px] h-fit" />
        </button>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.5, type: "tween" }}
        variants={infoContents}
        className={`w-[60%] h-[60%] z-40 absolute flex flex-col items-center justify-center text-white ${
          !isOpen ? `hidden` : `flex`
        }`}
      >
        <div className="xl:text-[50px] zero:text-[28.5px]">2 EURO PROJEKT</div>
        <br />
        <div className="xl:text-[20px] zero:text-[14px] font-light">
          The site started with 2 EURO coin remaining from the trip to Venice.
          <br />
          You can see the movement and lighting effects to realize the real
          thing. <br />
          It starts when you press the coin. <br />
          <br />
          Grazie!
          <br />
          <br />
          -Jeongeun
        </div>
      </motion.div>
    </>
  );
}

const infoContents = {
  open: {
    opacity: "100%",
    transition: {
      type: "tween",
      delay: 0.5,
      duration: 0.5,
    },
  },
  closed: {
    opacity: "0%",
    transition: {
      type: "tween",
      duration: 0.1,
    },
  },
};

const infoBar = {
  open: (height = 10) => ({
    scale: 100,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = ({ ...props }) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);
