import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path d="M14.702 4.38837L14.5551 6.42529L14.4735 7.55642C14.4391 8.03262 14.9477 8.35625 15.3645 8.1234L18.7901 6.20977C19.1668 5.99932 19.2049 5.47192 18.8623 5.20958L15.7469 2.82404C15.3678 2.53377 14.818 2.78104 14.7837 3.25724L14.702 4.38837Z" fill={props.stroke} />
      <path d="M6.14585 15.6116L6.29281 13.5747L6.37441 12.4436C6.40877 11.9674 5.90017 11.6438 5.48335 11.8766L2.05781 13.7902C1.68109 14.0007 1.64304 14.5281 1.98565 14.7904L5.10102 17.176C5.4801 17.4662 6.02989 17.219 6.06424 16.7428L6.14585 15.6116Z" fill={props.stroke} />
      <path d="M15.542 5.06779C12.3665 4.83869 6.55045 3.0088 2.51404 6.70491" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M5.3058 14.9322C8.48132 15.1613 14.1691 17.2035 18.4093 12.7093" stroke-width="1.2" stroke-linecap="round"/>
    </Svg>
  )
}

export default Icon
