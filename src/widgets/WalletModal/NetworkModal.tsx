import React from 'react'
import styled from 'styled-components'

import Text from '../../components/Text/Text'
import Flex from '../../components/Box/Flex'
import { Modal } from '../Modal'
import { Network } from './types'
import { Checkmark } from '../Menu/icons'

interface Props {
  onDismiss?: () => void
  networks?: Network[]
}


const CheckmarkBox = styled.div`
  position: absolute;
  right: -10px;
  bottom: -10px;
  border-radius: 50%;
  border: 4px solid white;
`

const CheckmarkInnerBox = styled.div`
  background: #0AC6E5;
  border-radius: 50%;
  padding: 2px;
  height: 20px;
  width: 20px;
`

const NetworkModal: React.FC<Props> = ({ onDismiss = () => null, networks = [] }) => {
  const currentNetwork = networks.find(network => network.isCurrent);
  return (
    <Modal title="Select a Network" onDismiss={onDismiss} style={{ borderRadius: '16px' }}>
      {
        networks.length > 0 && <>
          {networks.map((network, index) => {
            return (<Flex style={{ cursor: "pointer" }} alignItems="center" marginTop={index > 0 ? "24px" : "0px"} onClick={() => {
              if (network?.switchNetworkCallback) {
                network.switchNetworkCallback();
              }
              onDismiss();
            }}>
              <div style={{ position: "relative" }}>
                <img width="40px" alt={network.chainID.toString()} src={network.iconSrc} />
                {currentNetwork?.chainID === network.chainID &&
                  <CheckmarkBox>
                    <CheckmarkInnerBox>
                      <Checkmark />
                    </CheckmarkInnerBox>
                  </CheckmarkBox>
                }
              </div>
              <Text
                fontSize="16px"
                marginLeft="10px"
                fontWeight={network.isCurrent ? 700 : 500}
              >
                {network.fullName || network.name}
              </Text>
            </Flex>)
          })}
        </>
      }
    </Modal >
  )
}

export default NetworkModal
