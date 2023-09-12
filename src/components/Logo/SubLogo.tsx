import React from "react";
import logoImg from "@/images/logo.png";
import logoLightImg from "@/images/logo-light.png";
import LogoSvg from "./LogoSvg";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img: string;
  title: string;
}

const SubLogo: React.FC<LogoProps> = ({
  img = logoImg,
  title,
}) => {
  return (
      
      <Image width={0} height={12} className="mx-auto object-contain h-12 md:h-10 lg:h-10 text-neutral-400" alt={title} src={`${img}`} />
  );
};

export default SubLogo;
