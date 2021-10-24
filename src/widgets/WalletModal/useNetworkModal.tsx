import React from 'react'
import { useModal } from '../Modal'
import { Network } from './types'
import NetworkModal from './NetworkModal'

interface ReturnType {
  onPresentNetworkModal: () => void
}

const useNetworkModal = (networks: Network[] = []): ReturnType => {
  const [onPresentNetworkModal] = useModal(<NetworkModal networks={networks} />)
  return { onPresentNetworkModal }
}

export default useNetworkModal
