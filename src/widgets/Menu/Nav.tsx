import React from 'react'
import styled from 'styled-components'
import MenuLink from './components/MenuLink'

type NavProps = {
  href?: string
  text: string
  isActive?: boolean
  isNewTab?: boolean
  onClick?: () => void
}

const Nav: React.FC<NavProps> = ({ href, text, isActive, onClick, isNewTab }) => {
  return (
    <StyledNav>
      <StyledLink className={isActive ? 'active' : ''}>
        <MenuLink
          onClick={() => {
            if (onClick) {
              onClick()
            }
          }}
          href={href}
          target={isNewTab ? '_blank' : ''}
          rel={isNewTab ? 'noopener noreferrer' : ''}
        >
          {text}
        </MenuLink>
      </StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  line-height: 45px;
  font-weight: 500;
  margin: 0 5px;
`

const StyledLink = styled.div`
  & a {
    color: ${({ theme }) => theme.colors.impossible};
    opacity: 30%;
    padding-left: 10px;
    padding-right: 10px;
    text-decoration: none;
    font-size: 15px;
    &:hover {
      opacity: 100%;
    }
    &.active {
      color: #452a7a;
    }
    @media (max-width: 400px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  & .active {
    background: ${({ theme }) => theme.colors.primaryBright};
    opacity: 100%;
    padding: 6px 16px;
    border-radius: 16px;
    font-weight: 700;
  }
`

export default Nav
