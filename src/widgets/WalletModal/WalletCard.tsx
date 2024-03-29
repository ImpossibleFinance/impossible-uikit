import React from 'react'
import Button from '../../components/Button/Button'
import Text from '../../components/Text/Text'
import { connectorLocalStorageKey, walletLocalStorageKey } from './config'
import { Login, Config } from './types'

interface Props {
  walletConfig: Config
  login: Login
  onDismiss: () => void
  mb: string
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig
  return (
    <Button
      width="100%"
      variant="tertiary"
      onClick={() => {
        login(walletConfig.connectorId)
        if (window.fathom) {
          window.fathom.trackGoal(walletConfig.fathomID, 0);
        }
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId)
        window.localStorage.setItem(walletLocalStorageKey, walletConfig.walletID || '')
        onDismiss()
      }}
      style={{ justifyContent: 'space-between' }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text bold color="primary" mr="16px">
        {title}
      </Text>
      <Icon width="32px" />
    </Button>
  )
}

export default WalletCard
