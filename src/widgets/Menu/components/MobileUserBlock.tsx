import React from 'react'
import styled from 'styled-components'
import { Box, Flex } from '../../../components/Box'
import Button from '../../../components/Button/Button'
import Wallet from '../../../components/Svg/Icons/Wallet'
import Warning from '../icons/Warning'
import { useWalletModal } from '../../WalletModal'
import useNetworkModal from '../../../hooks/useNetworkModal'

import { Login, TokenBalance, KycInfo, Network } from '../../WalletModal/types'

interface Props {
  account?: string
  useIFBalance?: () => string
  useGasBalance?: () => string
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
  flex-direction: column;
  width: 100%;
  background: transparent;
  padding: 20px;
  margin-top: 80px;
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

const AccountWrapper = styled.div`
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: 30px;
  padding: 3px;
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
  align-items: center;
  justify-content: center;
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

const MobileUserBlock: React.FC<Props> = ({
  account,
  login,
  logout,
  balances,
  kycInfo,
  networks = [],
  isNetworkUnavailable,
  showNetworks,
}) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account, balances, kycInfo)
  const { onPresentNetworkModal, onPresentUnsupportedNetworkModal } = useNetworkModal(networks)

  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  const currentNetwork = networks.find((network) => network.isCurrent)

  const renderButton = () => {
    if (isNetworkUnavailable) {
      return (
        <Flex justifyContent="center">
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
        </Flex>
      )
    }
    if (account) {
      return (
        <Flex flexDirection="column" flex={1}>
          <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
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
          </Flex>
        </Flex>
      )
    }
    return (
      <Flex justifyContent="center">
        <WalletButton
          height="42px"
          width="230px"
          scale="md"
          endIcon={<WalletIcon />}
          onClick={() => {
            onPresentConnectModal()
          }}
        >
          Connect Wallet
        </WalletButton>
      </Flex>
    )
  }

  return <UserBlockWrapper>{renderButton()}</UserBlockWrapper>
}

export default MobileUserBlock
