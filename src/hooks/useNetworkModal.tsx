import React from 'react'
import { useModal } from '../widgets/Modal'
import { Network } from '../widgets/WalletModal/types'
import NetworkModal from '../widgets/WalletModal/NetworkModal'

interface ReturnType {
  onPresentNetworkModal: () => void
}

const useNetworkModal = (networks: Network[] = []): ReturnType => {
  const [onPresentNetworkModal] = useModal(<NetworkModal networks={networks} />)
  return { onPresentNetworkModal }
}

export default useNetworkModal
