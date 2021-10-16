import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Box } from "../../../components/Box";
import { Login, TokenBalance } from "../../WalletModal/types";
import Wallet from "../../../components/Svg/Icons/Wallet";

interface Props {
  account?: string;
  useIFBalance?: () => string;
  useBnbBalance?: () => string;
  login: Login;
  logout: () => void;
  ifIcon?: string;
  balances?: TokenBalance[]
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

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
  display: flex;
  flex-direction: row;
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

const UserBlock: React.FC<Props> = ({ account, useBnbBalance, useIFBalance, ifIcon, login, logout, balances = [] }) => {
  console.log(balances, 'harimu')

  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, [...balances]);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  const ifBalance = useIFBalance && useIFBalance();
  const bnbBalance = useBnbBalance && useBnbBalance();
  return (
    <div>
      {account ? (
        <UserBlockWrapper>
          {ifBalance ? (
            <IFBalance>
              {ifIcon ? <img width="20px" alt="IFIcon" src={ifIcon} /> : 'IF'}<b style={{ marginLeft: "4px" }}>{ifBalance}</b>
            </IFBalance>
          ) : null}
          <AccountWrapper>
            {bnbBalance ? (
              <BnbBalance>
                <b>{bnbBalance}</b> BNB
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
