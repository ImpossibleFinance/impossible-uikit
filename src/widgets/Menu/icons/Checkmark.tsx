import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = () => {
  return (
    <Svg viewBox="0 0 8 6" width="16px">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.81564 4.3113L6.61064 0.516298C6.82639 0.300557 7.17617 0.300557 7.39191 0.516299C7.60765 0.73204 7.60766 1.08183 7.39191 1.29757L3.34361 5.34587C3.05202 5.63746 2.57926 5.63746 2.28767 5.34587L0.766543 3.82475C0.550801 3.609 0.550801 3.25922 0.766543 3.04348C0.982285 2.82773 1.33207 2.82773 1.54781 3.04348L2.81564 4.3113Z"
        fill="white"
      />
    </Svg>
  )
}

export default Icon
