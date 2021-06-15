import React from 'react'
import styled, { keyframes, DefaultTheme } from 'styled-components'
import { MENU_ENTRY_HEIGHT } from '../config'

export interface Props {
  secondary?: boolean
  isActive?: boolean
  theme: DefaultTheme
}

const rainbowAnimation = keyframes`
  0%,
  100% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
`

const LinkLabel = styled.div<{ isPushed: boolean, isActive: boolean }>`
  color: ${({ isActive, theme }) => (isActive ? theme.colors.lightGreen : theme.colors.lightGray)};
  transition: color 0.4s;
  flex-grow: 1;
`

const MenuEntry = styled.div<Props>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: ${MENU_ENTRY_HEIGHT}px;
  padding: ${({ secondary }) => (secondary ? '0 32px' : '0 16px')};
  font-size: ${({ secondary }) => (secondary ? '14px' : '16px')};
  color: ${({ isActive, theme }) => (isActive ? theme.colors.lightGreen : theme.colors.lightGray)};
  box-shadow: ${({ isActive, theme }) => (isActive ? `inset 4px 0px 0px ${theme.colors.lightGreen}` : 'none')};

  a {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${({ isActive, theme }) => (isActive ? theme.colors.lightGreen : theme.colors.lightGray)};
  }

  // Safari fix
  flex-shrink: 0;

  &.rainbow {
    background-clip: text;
    animation: ${rainbowAnimation} 3s ease-in-out infinite;
    background: ${({ theme }) => theme.colors.gradients.bubblegum};
    background-size: 400% 100%;
  }
`
MenuEntry.defaultProps = {
  secondary: false,
  isActive: false,
  role: 'button',
}

const LinkLabelMemo = React.memo(LinkLabel, (prev, next) => prev.isPushed === next.isPushed && prev.isActive === next.isActive)

export { MenuEntry, LinkLabelMemo as LinkLabel }
