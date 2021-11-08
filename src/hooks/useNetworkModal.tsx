import React from 'react'
import { useModal } from '../widgets/Modal'
import { Network } from '../widgets/WalletModal/types'
import NetworkModal from '../widgets/WalletModal/NetworkModal'
import UnsupportedModal from '../widgets/WalletModal/UnsupportedModal'

interface ReturnType {
  onPresentNetworkModal: () => void
  onPresentUnsupportedNetworkModal: () => void
}

const useNetworkModal = (networks: Network[] = []): ReturnType => {
  const [onPresentNetworkModal] = useModal(<NetworkModal networks={networks} />)
  const [onPresentUnsupportedNetworkModal] = useModal(<UnsupportedModal networks={networks} />)
  return { onPresentNetworkModal, onPresentUnsupportedNetworkModal }
}

export default useNetworkModal
