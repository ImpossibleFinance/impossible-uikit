import React from 'react'
import styled, { DefaultTheme } from 'styled-components'
import CheckmarkCircleIcon from '../Svg/Icons/CheckmarkCircle'
import ErrorIcon from '../Svg/Icons/Error'
import BlockIcon from '../Svg/Icons/Block'
import InfoIcon from '../Svg/Icons/Info'
import IFIcon from '../Svg/Icons/IF'
import { Text } from '../Text'
import { IconButton } from '../Button'
import { Image } from '../Image'
import { CloseIcon } from '../Svg'
import Flex from '../Box/Flex'
import { AlertProps, variants } from './types'

interface ThemedIconLabel {
  variant: AlertProps['variant']
  theme: DefaultTheme
  hasDescription: boolean
}

const getThemeColor = ({ theme, variant = variants.INFO }: ThemedIconLabel) => {
  switch (variant) {
    case variants.ANNOUNCEMENT:
      return 'transparent'
    case variants.DANGER:
      return theme.colors.failure
    case variants.WARNING:
      return theme.colors.warning
    case variants.SUCCESS:
      return theme.colors.success
    case variants.INFO:
    default:
      return theme.colors.secondary
  }
}

const getIcon = (variant: AlertProps['variant'] = variants.INFO) => {
  switch (variant) {
    case variants.DANGER:
      return BlockIcon
    case variants.WARNING:
      return ErrorIcon
    case variants.SUCCESS:
      return CheckmarkCircleIcon
    case variants.ANNOUNCEMENT:
      return IFIcon
    case variants.INFO:
    default:
      return InfoIcon
  }
}

const IconLabel = styled.div<ThemedIconLabel>`
  background-color: ${getThemeColor};
  border-radius: 16px 0 0 16px;
  color: ${({ theme }) => theme.alert.background};
  padding: 12px;
`

const withHandlerSpacing = 32 + 12 + 8 // button size + inner spacing + handler position
const Details = styled.div<{ hasHandler: boolean, variant?: string }>`
  flex: 1;
  padding-bottom: 12px;
  padding-left: ${({ variant }) => (variant === variants.ANNOUNCEMENT ? `0` : '12px')};
  padding-right: ${({ hasHandler, variant }) => (hasHandler ? `${variant === variants.ANNOUNCEMENT ? withHandlerSpacing - 12 : withHandlerSpacing}px` : '12px')};
  padding-top: 12px;
`

const CloseHandler = styled.div`
  border-radius: 0 16px 16px 0;
  right: 8px;
  position: absolute;
  top: 8px;
`

const StyledAlert = styled(Flex) <{ toastBackground?: string, toastBorder?: string }>`
  position: relative;
  background-color: ${({ theme }) => theme.alert.background};
  background: ${({ toastBackground }) => toastBackground};
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  border: 1px solid ${({ toastBorder }) => toastBorder && toastBorder.length > 0 ? toastBorder : 'none'};
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
`

const Alert: React.FC<AlertProps> = ({ title, children, variant, onClick, toastBackground, toastIcon, toastBorder }) => {
  const Icon = getIcon(variant)

  return (
    <StyledAlert toastBackground={toastBackground} toastBorder={toastBorder}>
      {toastIcon ?
        <Flex justifyContent="center" alignItems="center" paddingLeft="8px" paddingY="8px">
          <img src={toastIcon} alt="toastIcon" width="100%" style={{ height: 36 }} />
        </Flex>
        :
        <IconLabel variant={variant} hasDescription={!!children}>
          <Icon color="currentColor" width="24px" />
        </IconLabel>
      }

      <Details hasHandler={!!onClick} variant={variant}>
        {typeof title === 'string' ? <Text bold>{title}</Text> : title}
        {typeof children === 'string' ? <Text as="p">{children}</Text> : children}
      </Details>
      {onClick && (
        <CloseHandler>
          <IconButton scale="sm" variant="text" onClick={onClick}>
            <CloseIcon width="24px" color="currentColor" />
          </IconButton>
        </CloseHandler>
      )}
    </StyledAlert>
  )
}

export default Alert
