import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import throttle from "lodash/throttle";
import { useLocation } from "react-router";
import Flex from "../../components/Box/Flex";
import { useMatchBreakpoints } from "../../hooks";
import UserBlock from "./components/UserBlock";
import MobileUserBlock from "./components/MobileUserBlock";
import { NavProps } from "./types";
import Logo from "./components/Logo";
import Panel from "./components/Panel";
import { MENU_HEIGHT, SIDEBAR_WIDTH_REDUCED, SIDEBAR_WIDTH_FULL } from "./config";
import Overlay from "../../components/Overlay/Overlay";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;


const StyledNav = styled.nav<{ showMenu: boolean }>`
  position: fixed;
  top: ${({ showMenu }) => (showMenu ? 0 : `-${MENU_HEIGHT}px`)};
  left: 0;
  transition: top 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 8px;
  padding-right: 16px;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  background-color: ${({ theme }) => theme.nav.background};
  z-index: 20;
  transform: translate3d(0, 0, 0);
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
  ${({ theme }) => theme.mediaQueries.nav} {
    margin-left: ${({ isPushed }) => `${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px`};
    max-width: ${({ isPushed }) => `calc(100% - ${isPushed ? SIDEBAR_WIDTH_FULL : SIDEBAR_WIDTH_REDUCED}px)`};
  }
  height: 100vh;
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

const MobileOnlyOverlay = styled(Overlay)`
  position: fixed;
  height: 100%;
  ${({ theme }) => theme.mediaQueries.nav} {
    display: none;
  }
`;
const Menu: React.FC<NavProps> = ({
  account,
  login,
  logout,
  links,
  children,
  useBnbBalance,
  useIFBalance,
  ifIcon,
  ifPriceUsd,
  toggleTheme,
  langs,
  setLang,
  currentLang,
  balances = [],
}) => {
  const { isXl } = useMatchBreakpoints();
  const isMobile = isXl === false;
  const [isPushed, setIsPushed] = useState(!isMobile);
  const [showMenu, setShowMenu] = useState(true);
  const refPrevOffset = useRef(window.pageYOffset);

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

  return (
    <Wrapper>
      <StyledNav showMenu={showMenu}>
        <Logo
          isPushed={isPushed}
          togglePush={() => setIsPushed((prevState: boolean) => !prevState)}
          isDark={false}
          href={process.env.REACT_APP_LANDING_DOMAIN || ''}
        />
        <Flex flexDirection={isMobile ? "column" : "row"} flex={5} justifyContent="flex-end">
          <Flex justifyContent="flex-end">
            {!!ifPriceUsd && (
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
                ifIcon={ifIcon}
                useBnbBalance={useBnbBalance}
                balances={balances}
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
        <Panel
          isPushed={!isMobile ? true : isPushed}
          isMobile={isMobile}
          showMenu={!isMobile ? true : showMenu}
          isDark={false}
          toggleTheme={toggleTheme}
          langs={langs}
          setLang={setLang}
          currentLang={currentLang}
          cakePriceUsd={ifPriceUsd}
          pushNav={setIsPushed}
          links={links}
        />
        <Inner isPushed={isPushed} showMenu={showMenu}>
          {children}
        </Inner>
        <MobileOnlyOverlay show={isPushed} onClick={() => setIsPushed(false)} role="presentation" />
      </BodyWrapper>
    </Wrapper>
  );
};

export default Menu;
