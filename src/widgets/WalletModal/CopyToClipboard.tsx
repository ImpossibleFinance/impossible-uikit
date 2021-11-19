import React, { useState } from 'react'
import styled from 'styled-components'
import Text from '../../components/Text/Text'
import Copy from './icons/Copy'

interface Props {
  toCopy: string
}

const StyleButton = styled(Text).attrs({ role: 'button' })`
  position: relative;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
`

const Tooltip = styled.div<{ isTooltipDisplayed: boolean }>`
  display: ${({ isTooltipDisplayed }) => (isTooltipDisplayed ? 'block' : 'none')};
  position: absolute;
  bottom: -40px;
  left: -20px;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors.invertedContrast};
  border-radius: 16px;
  opacity: 0.7;
  padding: 8px;
`

const CopyToClipboard: React.FC<Props> = ({ toCopy, children, ...props }) => {
  const [isTooltipDisplayed, setIsTooltipDisplayed] = useState(false)

  return (
    <StyleButton
      small
      bold
      onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(toCopy)
          setIsTooltipDisplayed(true)
          setTimeout(() => {
            setIsTooltipDisplayed(false)
          }, 1000)
        }
      }}
      {...props}
    >
      {children}
      <Copy width="22px" />
      <Tooltip isTooltipDisplayed={isTooltipDisplayed}>Copied</Tooltip>
    </StyleButton>
  )
}

export default CopyToClipboard
