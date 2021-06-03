import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { useLocation } from "react-router";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import UserBlock from "./components/UserBlock";
import MobileUserBlock from "./components/MobileUserBlock";
import { NavProps } from "./types";
import Nav from "./Nav";
import SidebarMenu from "./SidebarMenu";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const StyledNav = styled.nav<{ showMenu: boolean }>`
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.nav.background};
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.03);
  z-index: 20;
  transform: translate3d(0, 0, 0);
  padding: 24px 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 15px 120px;
  }
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
`;

const Inner = styled.div<{ isPushed: boolean; showMenu: boolean }>`
  flex-grow: 1;
  transition: margin-top 0.2s;
  transform: translate3d(0, 0, 0);
  max-width: 100%;
`;

const ImpIcon = styled.div`
  display: flex;
  justify-content: center;
  img {
    height: 30px;
  }
`;

const Navigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-between;
  margin-left: 56px;
`;

const HeaderItemContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
  }
`;

const IFPrice = styled.div<{ isSidebar?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ isSidebar }) => (isSidebar ? "left" : "center")};
  margin-bottom: ${({ isSidebar }) => (isSidebar ? "16px" : "0")};
  margin-right: 0;
  padding: 12px 12px 0 0;
  span {
    margin-right: 6px;
    color: ${({ theme }) => theme.colors.textSubtle};
    font-size: 12px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0;
    margin-right: 28px;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  display: flex;
`;

const HamburgerMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HamburgerMenuLine = styled.div`
  width: 16px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.text};
  margin: 1.5px 0;
`;

const RedDot = styled.div`
  width: 10px;
  height: 10px;
  background-color: #ff0ea9;
  border-radius: 50%;
  border: 2px solid #f6f8f9;
  position: absolute;
  top: 10px;
  right: -4px;
`;
const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  links,
  children,
  useBnbBalance,
  useIFBalance,
  ifPriceUsd,
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [showMenu, setShowMenu] = useState(true);
  const [showSidebarMenu, setShowSidebarMenu] = useState(false);
  const refPrevOffset = useRef(window.pageYOffset);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentOffset = window.pageYOffset;
      const isBottomOfPage = window.document.body.clientHeight === currentOffset + window.innerHeight;
      const isTopOfPage = currentOffset === 0;
      // Always show the menu when user reach the top
      if (isTopOfPage) {
        setShowMenu(true);
      }
      // Avoid triggering anything at the bottom because of layout shift
      else if (!isBottomOfPage) {
        if (currentOffset < refPrevOffset.current) {
          // Has scroll up
          setShowMenu(true);
        } else {
          // Has scroll down
          setShowMenu(false);
        }
      }
      refPrevOffset.current = currentOffset;
    };
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, []);

  // Find the home link if provided
  const filteredLinks = isMobile ? links.filter((value) => !value.isSidebar) : links;
  const sidebarLinks = links.filter((value) => value.isSidebar);
  const isAnythingNew = links.some((val) => val.isNew);
  return (
    <Wrapper>
      <SidebarMenu menuVisibility={showSidebarMenu} onClose={() => setShowSidebarMenu(false)}>
        {!!ifPriceUsd && (
          <IFPrice isSidebar>
            <span>Price</span> IF: ${ifPriceUsd.toPrecision(4)}
          </IFPrice>
        )}
        {sidebarLinks.map((value) => (
          <Nav
            key={value.label}
            href={value.href}
            text={value.label}
            isActive={value.href ? location.pathname.includes(value.href) : false}
            isNewTab={value.isNewTab}
            onClick={() => setShowSidebarMenu(false)}
          />
        ))}
      </SidebarMenu>

      <StyledNav showMenu={showMenu}>
        <Flex flexDirection={isMobile ? "column" : "row"} flex={1}>
          <HeaderItemContainer>
            <ImpIcon>
              <a href={process.env.REACT_APP_LANDING_DOMAIN}>
                <img src={isMobile ? "images/LogoM.svg" : "/images/Logo.svg"} alt="logo" />
              </a>
            </ImpIcon>
            <Navigation>
              {filteredLinks.map((value) => (
                <Nav
                  key={value.label}
                  href={value.href}
                  text={value.label}
                  isActive={value.href ? location.pathname.includes(value.href) : false}
                />
              ))}
              {isMobile && (
                <MenuWrapper>
                  <HamburgerMenuWrapper
                    onClick={() => {
                      setShowSidebarMenu(true);
                    }}
                  >
                    <HamburgerMenuLine />
                    <HamburgerMenuLine />
                    <HamburgerMenuLine />
                  </HamburgerMenuWrapper>
                  {isAnythingNew && <RedDot />}
                </MenuWrapper>
              )}
            </Navigation>
          </HeaderItemContainer>
          <Flex justifyContent={isMobile ? "flex-end" : "flex-start"}>
            {!!ifPriceUsd && !isMobile && (
              <IFPrice>
                <span>Price</span> IF: ${ifPriceUsd.toPrecision(4)}
              </IFPrice>
            )}
            {!isMobile && (
              <UserBlock
                account={account}
                login={login}
                logout={logout}
                useIFBalance={useIFBalance}
                useBnbBalance={useBnbBalance}
              />
            )}
          </Flex>
        </Flex>
      </StyledNav>
      {isMobile && (
        <MobileUserBlock
          account={account}
          login={login}
          logout={logout}
          useIFBalance={useIFBalance}
          useBnbBalance={useBnbBalance}
        />
      )}
      <BodyWrapper>
        <Inner isPushed={false} showMenu={showMenu}>
          {children}
        </Inner>
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
