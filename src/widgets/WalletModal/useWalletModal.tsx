import React from 'react'
import { useModal } from '../Modal'
import ConnectModal from './ConnectModal'
import AccountModal from './AccountModal'
import { KycInfo, Login, TokenBalance } from './types'

interface ReturnType {
  onPresentConnectModal: () => void
  onPresentAccountModal: () => void
}

const useWalletModal = (
  login: Login,
  logout: () => void,
  account?: string,
  balances: TokenBalance[] = [],
  kycInfo?: KycInfo,
): ReturnType => {
  const [onPresentConnectModal] = useModal(<ConnectModal login={login} />)
  const [onPresentAccountModal] = useModal(
    <AccountModal account={account || ''} logout={logout} balances={balances} kycInfo={kycInfo} />,
  )
  return { onPresentConnectModal, onPresentAccountModal }
}

export default useWalletModal
