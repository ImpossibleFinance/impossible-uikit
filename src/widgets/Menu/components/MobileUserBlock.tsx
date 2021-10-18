import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Box, Flex } from "../../../components/Box";
import Button from "../../../components/Button/Button";
import Wallet from "../../../components/Svg/Icons/Wallet";
import { useWalletModal } from "../../WalletModal";
import { Login, TokenBalance } from "../../WalletModal/types";

interface Props {
  account?: string;
  useIFBalance?: () => string;
  useBnbBalance?: () => string;
  login: Login;
  logout: () => void;
  balances?: TokenBalance[]
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

const ShowBalance = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
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

const MobileUserBlock: React.FC<Props> = ({ account, useIFBalance, useBnbBalance, login, logout, balances }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, balances);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  const ifBalance = useIFBalance && useIFBalance();
  const bnbBalance = useBnbBalance && useBnbBalance();
  const [showBalance, setShowBalance] = useState(false);
  const showBalanceClick = useCallback(() => {
    setShowBalance(!showBalance);
  }, [setShowBalance, showBalance]);
  return (
    <UserBlockWrapper>
      {account ? (
        <Flex flexDirection="column" flex={1}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
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
            <ShowBalance onClick={showBalanceClick}>{showBalance ? "Hide Balance" : "Show balance"}</ShowBalance>
          </Flex>
          {showBalance && (
            <Flex mt="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Label>IF</Label>
              <Label>{ifBalance}</Label>
            </Flex>
          )}
          {showBalance && (
            <Flex mt="12px" flexDirection="row" justifyContent="space-between" alignItems="center">
              <Label>BNB</Label>
              <Label>{bnbBalance}</Label>
            </Flex>
          )}
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
