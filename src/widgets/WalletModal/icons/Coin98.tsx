import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const css = `
  .cls-1{
    fill:url(#linear-gradient);
  }
  .cls-2{
    fill:#252525;
  }
`;
const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 70.07 70.09"
      {...props}
    >
      <style>{css}</style>
      <linearGradient
        id="linear-gradient"
        x1="66.49"
        y1="68.42"
        x2="4.55"
        y2="6.47"
        gradientTransform="matrix(1, 0, 0, -1, 0, 72)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f1d961" />
        <stop offset="1" stopColor="#cda146" />
      </linearGradient>
      <rect className="cls-1" x="0.01" y="0.01" width="70.06" height="70.06" rx="12.79" />
      <path
        className="cls-2"
        d="M23.59,17.5a10.94,10.94,0,1,0,11,11A10.94,10.94,0,0,0,23.59,17.5Zm0,17.4a6.46,6.46,0,1,1,6.46-6.46h0A6.47,6.47,0,0,1,23.59,34.9Zm32.26-8a9.22,9.22,0,0,1-1.15,4.48,12.61,12.61,0,0,0-3.93-2.17,4.87,4.87,0,1,0-9.16-2.31,4.78,4.78,0,0,0,.59,2.31,12.61,12.61,0,0,0-3.93,2.17,9.36,9.36,0,1,1,17.58-4.48Zm-9.36,3.79a10.94,10.94,0,1,0,10.93,11A10.93,10.93,0,0,0,46.49,30.65Zm0,17.39a6.45,6.45,0,1,1,6.45-6.44h0A6.46,6.46,0,0,1,46.49,48ZM33,43.17a9.37,9.37,0,0,1-18.73,0h4.49a4.87,4.87,0,0,0,9.74,0H33Z"
      />
      <path className="cls-2" d="M24.34,26.5V24.88H22.68V26.5a2.38,2.38,0,1,0,1.66,0Z" />
      <path className="cls-2" d="M48.94,41.57a2.38,2.38,0,1,0-3.21,2.22v1.62h1.66V43.79A2.38,2.38,0,0,0,48.94,41.57Z" />
    </Svg>
  );
};

export default Icon;
