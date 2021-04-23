import React from 'react'
import Svg from '../Svg'
import { SvgProps } from '../types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 90 90" {...props}>
      <circle cx="45" cy="45" r="45" fill="url(#paint0_linear)" />

      <defs>
        <linearGradient id="paint0_linear" x1="45" y1="0" x2="45" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#54DADE" />
          <stop offset="0.762157" stopColor="#24C7D6" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="38.7618"
          y1="24.0704"
          x2="38.7618"
          y2="51.8948"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#9F4A08" />
          <stop offset="0.370494" stopColor="#7D3900" />
          <stop offset="1" stopColor="#8D4104" />
        </linearGradient>
      </defs>
    </Svg>
  )
}

export default Icon
