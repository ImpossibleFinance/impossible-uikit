import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import { Login } from '../../WalletModal/types'

interface Props {
  account?: string
  useStaxBalance?: () => BigNumber
  useBnbBalance?: () => BigNumber
  login: Login
  logout: () => void
}

const UserBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const StaxBalance = styled.div`
  background: linear-gradient(249.75deg, #050a5a -14.92%, #0617bf 90.68%);
  padding: 12px 15px 9px;
  border-radius: 19px;
  color: ${({ theme }) => theme.colors.invertedContrast};
  margin-right: 12px;
`

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
  display: flex;
  flex-direction: row;
`

const BnbBalance = styled.div`
  display: flex;
  align-items: center;
  padding: 0 9px 0 13px;
`

const UserBlock: React.FC<Props> = ({ account, useBnbBalance, useStaxBalance, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  const staxBalance = useStaxBalance()
  const bnbBalance = useBnbBalance()
  return (
    <div>
      {account ? (
        <UserBlockWrapper>
          {staxBalance ? (
            <StaxBalance>
              <b>{getBalanceNumber(staxBalance).toPrecision(4)}</b> STAX
            </StaxBalance>
          ) : null}
          <AccountWrapper>
            {bnbBalance ? (
              <BnbBalance>
                <b>{getBalanceNumber(bnbBalance).toPrecision(4)}</b> BNB
              </BnbBalance>
            ) : null}
            <Button
              scale="sm"
              variant="tertiary"
              onClick={() => {
                onPresentAccountModal()
              }}
            >
              {accountEllipsis}
            </Button>
          </AccountWrapper>
        </UserBlockWrapper>
      ) : (
        <Button
          scale="sm"
          onClick={() => {
            onPresentConnectModal()
          }}
        >
          Connect
        </Button>
      )}
    </div>
  )
}

export default React.memo(UserBlock, (prevProps, nextProps) => prevProps.account === nextProps.account)
