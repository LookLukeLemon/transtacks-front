/* eslint-disable jsx-a11y/alt-text */
import Image from "next/image";
import React from "react";

const customLoader = ({ src, width, quality }) => {
  if (src.startsWith("/_next/static")) {
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    return `${process.env.NEXT_PUBLIC_IMAGE_CDN}/${src}?w=${width}&q=${
      quality || 75
    }`;
  }
};

const BaseImage = (props) => {
  return <Image loader={customLoader} {...props} />;
};

export default BaseImage;
