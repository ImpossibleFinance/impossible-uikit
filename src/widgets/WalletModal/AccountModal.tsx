import React from 'react'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import LinkExternal from '../../components/Link/LinkExternal'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import CopyToClipboard from './CopyToClipboard'
import { connectorLocalStorageKey } from './config'
import { TokenBalance } from './types'


interface Props {
  account: string
  logout: () => void
  onDismiss?: () => void
  balances?: TokenBalance[]
}

const AccountModal: React.FC<Props> = ({ account, logout, onDismiss = () => null, balances = [] }) => {
  console.log(balances, 'banyak')
  return (
    <Modal title="Account" onDismiss={onDismiss}>
      <Text
        fontSize="20px"
        bold
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '8px' }}
      >
        {account}
      </Text>
      <Flex mb="32px">
        <LinkExternal small href={`https://bscscan.com/address/${account}`} mr="16px">
          View on BscScan
        </LinkExternal>
        <CopyToClipboard toCopy={account}>Copy Address</CopyToClipboard>
      </Flex>
      <Text
        fontSize="18px"
        bold
      >
        Balance
      </Text>
      {balances.map(balance => {
        return <Text
          fontSize="18px"
          bold
        >
          {balance.balance} {balance.symbol}
        </Text>
      })}
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
