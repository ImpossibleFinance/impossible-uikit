import React from 'react'
import Link from './Link'
import { LinkProps } from './types'
import OpenNewIcon from '../Svg/Icons/OpenNew'

const LinkExternal: React.FC<LinkProps> = ({ children, ...props }) => {
  const { color } = props
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon color={color || 'impossible'} ml="4px" />
    </Link>
  )
}

export default LinkExternal
