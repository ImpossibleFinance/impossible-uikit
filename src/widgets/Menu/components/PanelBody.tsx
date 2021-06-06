import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { SvgProps } from "../../../components/Svg";
import { Button } from "../../../components/Button";
import * as IconModule from "../icons";
import Accordion from "./Accordion";
import { MenuEntry, LinkLabel } from "./MenuEntry";
import MenuLink from "./MenuLink";
import { PanelProps, PushedProps } from "../types";

interface Props extends PanelProps, PushedProps {
  isMobile: boolean;
}

const Icons = (IconModule as unknown) as { [key: string]: React.FC<SvgProps> };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
`;

const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 24px;
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
    height: 25px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    transform: rotate(-45deg);
  }
  &:before{
    position: absolute;
    left: 15px;
    content: ' ';
    height: 25px;
    width: 2px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    transform: rotate(45deg);
  }
`

const PanelBody: React.FC<Props> = ({ isPushed, pushNav, isMobile, links }) => {
  const location = useLocation();

  // Close the menu when a user clicks a link on mobile
  const handleClick = isMobile ? () => pushNav(false) : undefined;

  return (
    <Container>
      {isMobile && 
        <CloseContainer onClick={() => pushNav(false)}><CloseIcon /></CloseContainer>     
      }
      {links.map((entry) => {
        const Icon = Icons[entry.icon];
        const iconElement = <Icon width="24px" mr="8px" />;
        const calloutClass = entry.calloutClass ? entry.calloutClass : undefined;

        if (entry.items) {
          const itemsMatchIndex = entry.items.findIndex((item: { href: string; }) => item.href === location.pathname);
          const initialOpenState = entry.initialOpenState === true ? entry.initialOpenState : itemsMatchIndex >= 0;

          return (
            <Accordion
              key={entry.label}
              isPushed={isPushed}
              pushNav={pushNav}
              icon={iconElement}
              label={entry.label}
              initialOpenState={initialOpenState}
              className={calloutClass}
              isActive={entry.items.some((item: { href: string; }) => item.href === location.pathname)}
            >
              {isPushed &&
                entry.items.map((item: { href: string, label: string; }) => (
                  <MenuEntry key={item.href} secondary isActive={item.href === location.pathname} onClick={handleClick}>
                    <MenuLink href={item.href}>{item.label}</MenuLink>
                  </MenuEntry>
                ))}
            </Accordion>
          );
        }
        return (
          <MenuEntry key={entry.label} isActive={entry.href === location.pathname} className={calloutClass}>
            <MenuLink href={entry.href} onClick={handleClick}>
              {iconElement}
              <LinkLabel isPushed={isPushed}>{entry.label}</LinkLabel>
            </MenuLink>
          </MenuEntry>
        );
      })}
    </Container>
  );
};

export default PanelBody;