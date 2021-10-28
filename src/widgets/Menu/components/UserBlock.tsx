import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import useNetworkModal from "../../WalletModal/useNetworkModal";
import { Box } from "../../../components/Box";
import { Login, TokenBalance, KycInfo, Network } from "../../WalletModal/types";
import Wallet from "../../../components/Svg/Icons/Wallet";

interface Props {
  account?: string;
  useIFBalance?: () => string;
  useGasBalance?: () => string;
  gasToken?: string;
  login: Login;
  logout: () => void;
  ifIcon?: string;
  balances?: TokenBalance[]
  kycInfo?: KycInfo
  networks?: Network[]
}

const UserBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const IFBalance = styled.div`
  background: linear-gradient(249.75deg, #050a5a -14.92%, #0617bf 90.68%);
  padding: 12px 15px 9px;
  border-radius: 19px;
  color: ${({ theme }) => theme.colors.invertedContrast};
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const BnbBalance = styled.div`
  display: flex;
  align-items: center;
  padding: 0 9px 0 13px;
`;

const WalletButton = styled(Button)`
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.invertedContrast};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09);
`;

const WalletIcon = () => (
  <Box ml="8px">
    <Wallet />
  </Box>
);

const UserBlock: React.FC<Props> = ({ account, useGasBalance, gasToken, useIFBalance, ifIcon, login, logout, balances = [], kycInfo, networks = [] }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, balances, kycInfo);
  const { onPresentNetworkModal } = useNetworkModal(networks)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  const gasBalance = useGasBalance && useGasBalance();
  const currentNetwork = networks.find(network => network.isCurrent);

  return (
    <div>
      {account ? (
        <UserBlockWrapper>
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
            {gasBalance ? (
              <BnbBalance>
                <b>{gasBalance}</b>{" "} {gasToken}
              </BnbBalance>
            ) : null}
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
        </UserBlockWrapper>
      ) : (
        <WalletButton
          height="42px"
          width="200px"
          scale="md"
          endIcon={<WalletIcon />}
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          Connect Wallet
        </WalletButton>
      )}
    </div>
  );
};

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account && prevProps.balances === nextProps.balances);
