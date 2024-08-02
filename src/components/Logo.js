import React from "react";
import logo from "../../public/images/logo.png";
import Image from "next/image";

export default function Logo({ width }) {
  const height = width / 3;

  return <Image src={logo} alt="logo" width={width} height={height} />;
}
