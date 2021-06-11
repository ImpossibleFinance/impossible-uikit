import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg width="21" height="20" viewBox="0 0 21 20" fill="none" {...props}>
      <path d="M13.0526 6.97295H7.56127L8.46603 10.8821L2.72144 18.4211H10.4931H18.2648L12.1478 10.8821L13.0526 6.97295Z" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.9024 3.49745C13.9024 4.34916 13.212 5.03962 12.3603 5.03962C11.5086 5.03962 10.8181 4.34916 10.8181 3.49745C10.8181 2.64574 11.5086 1.95529 12.3603 1.95529C13.212 1.95529 13.9024 2.64574 13.9024 3.49745V3.49745Z" />
      <path d="M9.37017 1.95529C9.37017 2.56233 8.87806 3.05443 8.27102 3.05443C7.66398 3.05443 7.17188 2.56233 7.17188 1.95529C7.17188 1.34825 7.66398 0.856144 8.27102 0.856144C8.87806 0.856144 9.37017 1.34825 9.37017 1.95529V1.95529Z" />
   </Svg>
  )
}

export default Icon
