import React from "react";
import Link from "next/link";
import Image from "next/image";

export interface LogoProps {
  img: string;
  title: string;
}

const SubLogo: React.FC<LogoProps> = ({
  img,
  title,
}) => {
  return (
    <div className="ttnc-logo inline-block text-primary-6000 cursor-pointer">
      <Link
        href="/"
        legacyBehavior>
        {/* THIS USE FOR MY MULTI DEMO */}
        {/* IF YOU ARE MY CLIENT. PLESE DELETE THIS CODE AND YOU YOUR IMAGE PNG BY BELLOW CODE */}
        
        <Image width={100} height={150} className="object-contain h-12 md:h-10 lg:h-10 text-neutral-400" alt={title} src={`${img}`} />
      </Link>
    </div>
  );
};

export default SubLogo;
