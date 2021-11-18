import React from 'react'
import styled from 'styled-components'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import LinkExternal from '../../components/Link/LinkExternal'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import KYCOpen from './KycCard'
import connectors, { connectorLocalStorageKey, walletLocalStorageKey } from './config'
import { TokenBalance, KycInfo } from './types'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  balances?: TokenBalance[]
  kycInfo?: KycInfo
}

const AddressBox = styled(Flex)`
  padding: 8px;
  background: #F2F4F5;
  border-radius: 8px;
`

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, balances = [], kycInfo }) => {
  const walletID = window.localStorage.getItem(walletLocalStorageKey)
  const wallet = connectors.find(connector => connector.walletID === walletID)
  const Icon = wallet?.icon

  return (
    <Modal title="Account" onDismiss={onDismiss} style={{ borderRadius: '16px' }}>
      <AddressBox alignItems="center">
        {Icon && <Icon width="32px" />}
        <Text
          fontSize="15px"
          style={{ margin: '0 8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {account}
        </Text>
        <CopyToClipboard toCopy={account} />
      </AddressBox>
      <Flex mb="16px">
        <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
          View on BscScan
        </LinkExternal>
      </Flex>
      {
        kycInfo && <Flex marginY="8px">
          <KYCOpen kycInfo={kycInfo} />
        </Flex>
      }
      {
        balances.length > 0 && <>
          <Text
            fontSize="16px"
            bold
          >
            Balance
          </Text>
          {balances.map(balance => {
            return (<Flex alignItems="center" marginTop="24px">
              <img width="28px" alt={balance.symbol} src={balance.iconSrc} />
              <Text
                fontSize="16px"
                marginLeft="8px"
              >
                {balance.balance} {balance.symbol.toUpperCase()}
              </Text>
            </Flex>)
          })}
        </>
      }
      <Flex justifyContent="center">
        <Button
          scale="sm"
          variant="secondary"
          onClick={() => {
            logout()
            window.localStorage.removeItem(connectorLocalStorageKey)
            onDismiss()
          }}
        >
          Logout
        </Button>
      </Flex>
    </Modal>
  )
}

export default AccountModal
