import React from 'react'
import styled from 'styled-components'

interface Props {
  onClose: () => void
  menuVisibility: boolean
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  // Safari fix
  flex-shrink: 0;
`

const FlyoutMenu = styled.div`
  width: 70vw;
  height: 100vh;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  padding: 16px;
  right: 0;
  transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
  overflow: scroll;
  z-index: 1001;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.33);
  &.show {
    transform: translate3d(0vw, 0, 0);
    overflow: hidden;
  }
  &.hide {
    transform: translate3d(100vw, 0, 0);
  }
`

const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`

const CloseIcon = styled.div`
  width: 32px;
  height: 32px;
  opacity: 0.3;
  position: relative;

  &:hover {
    opacity: 1;
  }
  &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
    transform: rotate(-45deg);
  }
  &:before {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #333;
    transform: rotate(45deg);
  }
`

const SidebarMenu: React.FC<Props> = ({ onClose, children, menuVisibility }) => {
  return (
    <Container>
      <FlyoutMenu className={menuVisibility ? 'show' : 'hide'}>
        <CloseContainer onClick={() => onClose()}>
          <CloseIcon />
        </CloseContainer>
        {children}
      </FlyoutMenu>
    </Container>
  )
}

export default SidebarMenu
