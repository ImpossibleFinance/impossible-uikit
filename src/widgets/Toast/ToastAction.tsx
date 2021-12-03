import React from 'react'
import { Link } from 'react-router-dom'
import getExternalLinkProps from '../../util/getExternalLinkProps'
import { Button } from '../../components/Button'
import { ArrowForwardIcon } from '../../components/Svg'
import { ToastAction as Action } from './types'

interface ToastActionProps {
  action: Action
  onClick?: () => void
}

const ToastAction: React.FC<ToastActionProps> = ({ action, onClick }) => {
  if (action.url.startsWith('http')) {
    return (
      <Button
        onClick={() => {
          if (onClick) {
            onClick()
          }
        }}
        as="a"
        scale="sm"
        href={action.url}
        {...getExternalLinkProps()}
        variant="toastAction"
      >
        {action.text} <ArrowForwardIcon color="text" />
      </Button>
    )
  }

  return (
    <Button
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
      as={Link}
      scale="sm"
      to={action.url}
      variant="toastAction"
    >
      {action.text} <ArrowForwardIcon color="text" />
    </Button>
  )
}

export default ToastAction
