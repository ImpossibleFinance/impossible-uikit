// eslint-disable-next-line no-nested-ternary
import React from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button/Button'
import { useWalletModal } from '../../WalletModal'
import useNetworkModal from '../../../hooks/useNetworkModal'
import { Box } from '../../../components/Box'
import Warning from '../icons/Warning'
import { Login, TokenBalance, KycInfo, Network } from '../../WalletModal/types'
import Wallet from '../../../components/Svg/Icons/Wallet'

interface Props {
  account?: string
  useGasBalance?: () => string
  gasToken?: string
  login: Login
  logout: () => void
  balances?: TokenBalance[]
  kycInfo?: KycInfo
  networks?: Network[]
  isNetworkUnavailable?: boolean
  showNetworks?: boolean
}

const UserBlockWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

const NetworkButton = styled(Button)<{ backgroundColor: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 12px;
  border-radius: 22px;
  color: ${({ theme }) => theme.colors.invertedContrast};
  margin-right: 12px;
  display: flex;
  height: 42px;
  align-items: center;
  justify-content: center;
`

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
  display: flex;
  height: 42px;
  flex-direction: row;
  align-items: center;
`

const BnbBalance = styled.div`
  display: flex;
  align-items: center;
  padding: 0 9px 0 13px;
`

const WalletButton = styled(Button)`
  border-radius: 30px;
  background: ${({ theme }) => theme.colors.invertedContrast};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09);
`

const UnsupportedButton = styled(Button)`
  background: #ff5e67;
  border-radius: 30px;
  color: white;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.09);
`

const WalletIcon = () => (
  <Box ml="8px">
    <Wallet />
  </Box>
)

const WarningIcon = () => (
  <Box ml="8px">
    <Warning />
  </Box>
)

const UserBlock: React.FC<Props> = ({
  account,
  useGasBalance,
  gasToken,
  login,
  logout,
  balances = [],
  kycInfo,
  networks = [],
  isNetworkUnavailable,
  showNetworks,
}) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, balances, kycInfo)
  const { onPresentNetworkModal, onPresentUnsupportedNetworkModal } = useNetworkModal(networks)
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  // eslint-disable-next-line
  const gasBalance = useGasBalance && useGasBalance()
  const currentNetwork = networks.find((network) => network.isCurrent)

  const renderButton = () => {
    if (isNetworkUnavailable) {
      return (
        <UnsupportedButton
          height="42px"
          width="250px"
          scale="md"
          endIcon={<WarningIcon />}
          onClick={() => {
            onPresentUnsupportedNetworkModal()
          }}
        >
          Network Unavailable
        </UnsupportedButton>
      )
    }
    if (account) {
      return (
        <UserBlockWrapper>
          {showNetworks && currentNetwork && (
            <NetworkButton
              onClick={() => {
                onPresentNetworkModal()
              }}
              backgroundColor={currentNetwork.backgroundColor}
            >
              <img width="20px" alt="NetworkIcon" src={currentNetwork.iconSrc} />
              <b style={{ marginLeft: '4px' }}>{currentNetwork.name}</b>
            </NetworkButton>
          )}
          <AccountWrapper>
            {gasBalance ? (
              <BnbBalance>
                <b>{gasBalance}</b> {gasToken}
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
      )
    }
    return (
      <WalletButton
        height="42px"
        width="200px"
        scale="md"
        endIcon={<WalletIcon />}
        onClick={() => {
          onPresentConnectModal()
        }}
      >
        Connect Wallet
      </WalletButton>
    )
  }

  return <div>{renderButton()}</div>
}

export default React.memo(
  UserBlock,
  (prevProps, nextProps) => prevProps.account === nextProps.account && prevProps.balances === nextProps.balances,
)
