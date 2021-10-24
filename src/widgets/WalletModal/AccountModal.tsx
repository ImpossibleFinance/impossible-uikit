import React from 'react'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import LinkExternal from '../../components/Link/LinkExternal'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import KYCOpen from './KycCard'
import { connectorLocalStorageKey } from './config'
import { TokenBalance, KycInfo } from './types'

interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  balances?: TokenBalance[]
  kycInfo?: KycInfo
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, balances = [], kycInfo }) => {
  return (
    <Modal title="Account" onDismiss={onDismiss} style={{ borderRadius: '16px' }}>
      <Text
        fontSize="20px"
        bold
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}
      >
        {account}
      </Text>
      <Flex mb="16px">
        <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
          View on BscScan
        </LinkExternal>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
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
