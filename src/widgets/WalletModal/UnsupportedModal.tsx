import React from 'react'
import styled from 'styled-components'

import Text from '../../components/Text/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import { Network } from './types'
import Warning from './icons/Warning'

interface Props {
  onDismiss?: () => void
  networks?: Network[]
}

const NetworkBox = styled(Flex)`
  border: 1px solid #e9ebec;
  box-sizing: border-box;
  border-radius: 12px;
  padding: 8px 24px;
`

const UnsupportedModal: React.FC<Props> = ({ onDismiss = () => null, networks = [] }) => {
  return (
    <Modal title="" onDismiss={onDismiss} style={{ borderRadius: '16px' }} bodyPadding="0px 24px 24px 24px">
      <Flex marginBottom="36px" justifyContent="center">
        <Text fontSize="24px" fontWeight={500}>
          Network Unavailable
        </Text>
      </Flex>
      <Flex justifyContent="center">
        <Warning width="84px" />
      </Flex>
      <Flex marginTop="36px" marginBottom="24px" justifyContent="center">
        Please connect to one of our supported networks.
      </Flex>
      {networks.length > 0 && (
        <>
          {networks.map((network, index) => {
            return (
              <NetworkBox
                style={{ cursor: 'pointer' }}
                alignItems="center"
                marginTop={index > 0 ? '12px' : '0px'}
                onClick={() => {
                  if (network?.switchNetworkCallback) {
                    network.switchNetworkCallback()
                  }
                  onDismiss()
                }}
              >
                <img width="40px" alt={network.chainID.toString()} src={network.iconSrc} />
                <Text fontSize="16px" marginLeft="10px" fontWeight={500}>
                  {network.fullName || network.name}
                </Text>
              </NetworkBox>
            )
          })}
        </>
      )}
    </Modal>
  )
}

export default UnsupportedModal
