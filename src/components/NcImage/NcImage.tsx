import React, { FC } from "react";
import Image, { ImageProps } from "next/legacy/image";

export interface NcImageProps extends ImageProps {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  className = "object-cover w-full h-full",
  sizes = "(max-width: 600px) 480px, 800px",
  ...args
}) => {
  return (
    <div className={containerClassName}>
      <Image width={0} height={0} className={className} alt={alt} sizes={sizes} {...args} />
    </div>
  );
};

export default NcImage;
