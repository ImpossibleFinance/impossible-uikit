import React from 'react'
import Text from '../../components/Text/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import { Network } from './types'

interface Props {
  onDismiss?: () => void
  networks?: Network[]
}

const NetworkModal: React.FC<Props> = ({ onDismiss = () => null, networks = [] }) => {
  const currentNetwork = networks.find(network => network.isCurrent);
  return (
    <Modal title="Select a Network" onDismiss={onDismiss} style={{ borderRadius: '16px' }}>
      <Text
        fontSize="16px"
        marginBottom="8px"
      >
        You are currently on {currentNetwork?.name}
      </Text>
      {
        networks.length > 0 && <>
          {networks.map(network => {
            return (<Flex style={{ cursor: "pointer" }} alignItems="center" marginTop="24px" onClick={() => {
              if (network?.switchNetworkCallback) {
                network.switchNetworkCallback();
              }
              onDismiss();
            }}>
              <img width="28px" alt={network.chainID.toString()} src={network.iconSrc} />
              <Text
                fontSize="16px"
                marginLeft="8px"
                fontWeight={network.isCurrent ? 700 : 500}
              >
                {network.name}
              </Text>
            </Flex>)
          })}
        </>
      }
    </Modal>
  )
}

export default NetworkModal
