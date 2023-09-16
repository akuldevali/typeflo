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
    <Link
      href="/"
      className="ttnc-logo inline-block text-primary-6000"
      legacyBehavior>
      {/* THIS USE FOR MY MULTI DEMO */}
      {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
      
      <img className="mx-auto object-contain h-12 md:h-10 lg:h-10 text-neutral-400" alt={title} src={`${img}`} />
    </Link>
  );
};

export default SubLogo;
