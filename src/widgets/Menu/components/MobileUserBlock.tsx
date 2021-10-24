import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box, Flex } from "../../../components/Box";
import Button from "../../../components/Button/Button";
import Wallet from "../../../components/Svg/Icons/Wallet";
import { useWalletModal } from "../../WalletModal";
import useNetworkModal from "../../WalletModal/useNetworkModal";

import { Login, TokenBalance, KycInfo, Network } from "../../WalletModal/types";

interface Props {
  account?: string;
  useIFBalance?: () => string;
  useBnbBalance?: () => string;
  login: Login;
  logout: () => void;
  balances?: TokenBalance[]
  kycInfo?: KycInfo
  networks?: Network[]
}

const UserBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: transparent;
  padding: 20px;
  margin-top: 80px;
`;

const WalletButton = styled(Button)`
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.invertedContrast};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09);
`;

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
  display: flex;
  flex-direction: row;
`;

const NetworkButton = styled(Button) <{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 12px;
  border-radius: 22px;
  color: ${({ theme }) => theme.colors.invertedContrast};
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Label = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
`;
const WalletIcon = () => (
  <Box ml="8px">
    <Wallet />
  </Box>
);

const MobileUserBlock: React.FC<Props> = ({ account, useIFBalance, useBnbBalance, login, logout, balances, kycInfo, networks = [] }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, balances, kycInfo);
  const { onPresentNetworkModal } = useNetworkModal(networks)

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;

  const currentNetwork = networks.find(network => network.isCurrent);

  return (
    <UserBlockWrapper>
      {account ? (
        <Flex flexDirection="column" flex={1}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
            {currentNetwork && (
              <NetworkButton
                onClick={() => {
                  onPresentNetworkModal();
                }}
                backgroundColor={currentNetwork.backgroundColor}
              >
                <img width="20px" alt="NetworkIcon" src={currentNetwork.iconSrc} /><b style={{ marginLeft: "4px" }}>{currentNetwork.name}</b>
              </NetworkButton>
            )}
            <AccountWrapper>
              <Button
                scale="sm"
                variant="tertiary"
                onClick={() => {
                  onPresentAccountModal();
                }}
              >
                {accountEllipsis}
              </Button>
            </AccountWrapper>
          </Flex>
        </Flex>
      ) : (
        <Flex justifyContent="center">
          <WalletButton
            height="42px"
            width="230px"
            scale="md"
            endIcon={<WalletIcon />}
            onClick={() => {
              onPresentConnectModal();
            }}
          >
            Connect Wallet
          </WalletButton>
        </Flex>
      )}
    </UserBlockWrapper>
  );
};

export default MobileUserBlock;
