import React from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 22 22" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.3667 5.22852V14.6952H16.8334V5.22852H7.3667ZM6.8667 3.72852C6.31441 3.72852 5.8667 4.17623 5.8667 4.72852V15.1952C5.8667 15.7475 6.31441 16.1952 6.8667 16.1952H17.3334C17.8857 16.1952 18.3334 15.7475 18.3334 15.1952V4.72852C18.3334 4.17623 17.8857 3.72852 17.3334 3.72852H6.8667Z"
        fill="#3B4346"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.6665 6.09375C4.08072 6.09375 4.4165 6.42954 4.4165 6.84375V17.5215H15.0943C15.5085 17.5215 15.8443 17.8573 15.8443 18.2715C15.8443 18.6857 15.5085 19.0215 15.0943 19.0215H3.6665C3.25229 19.0215 2.9165 18.6857 2.9165 18.2715V6.84375C2.9165 6.42954 3.25229 6.09375 3.6665 6.09375Z"
        fill="#3B4346"
      />
    </Svg>
  )
}

export default Icon
