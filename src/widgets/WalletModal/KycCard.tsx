import React from 'react'
import styled from 'styled-components'
import Flex from '../../components/Box/Flex'
import Text from '../../components/Text/Text'
import Button from '../../components/Button/Button'
import { KycInfo } from './types'

interface Props {
  kycInfo: KycInfo
}

const ExternalLinkWrap = styled.a`
  text-decoration: none;
  margin: auto;
  color: #0ac6e5;
  font-size: 14px;
`

const SynapsText = styled.div`
  font-size: 12px;
  line-height: 16px;
  color: #616568;
`

const KycBox = styled.div`
  background: #F2F4F5;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
`

const ButtonContainer = styled.div`
  text-align: center;
`

// const KYCButton = styled.Button`
//   border-radius: 20px;
// `

const KYCOpen: React.FC<Props> = ({ kycInfo }) => {
  const { status, passMinRequirement, isLoading,
    verifyKycCallback, verifiedSrc, minRequirementText,
    getIFUrl, getIDIAUrl,
  } = kycInfo
  const getNonVerifiedState = () => {
    let Component: JSX.Element
    if (!passMinRequirement) {
      Component = (
        <Flex flexDirection="column">
          <Flex marginBottom="8px">
            {minRequirementText}
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            <a href={getIFUrl} target="_blank" rel="noopener noreferrer">
              <Button
                style={
                  { borderRadius: '20px', width: '120px' }
                }>
                Get IF
              </Button>
            </a>
            <Flex marginX="8px">
              <Text color="#D0D5D6">OR</Text>
            </Flex>
            <a href={getIDIAUrl} target="_blank" rel="noopener noreferrer">
              <Button
                style={
                  { borderRadius: '20px', width: '120px' }
                }>
                Get IDIA
              </Button>
            </a>
          </Flex>
        </Flex>
      )
    } else if (status === "FINAL_REJECTED") {
      Component = (
        <Flex flexDirection="column">
          <Text marginBottom="8px">
            Your KYC has been rejected, please contact <br /> our vendor if you need further support.
          </Text>
          <ButtonContainer>
            <Button
              disabled
              style={
                { color: 'white', background: "#FF5E67", borderRadius: '20px', width: '200px' }
              }
            >
              Rejected
            </Button>
          </ButtonContainer>
        </Flex >
      )
    } else {
      Component = (
        <Flex flexDirection="column">
          <Flex marginBottom="8px">
            {status === "PENDING" ? "Your KYC is under verifying by our vendor." : "Start the KYC verification with this address."}
          </Flex>
          <ButtonContainer>
            <Button
              disabled={isLoading}
              onClick={verifyKycCallback}
              style={
                status === "PENDING" ? { color: 'white', opacity: 0.5, borderRadius: '20px', width: '200px' } : { borderRadius: '20px', width: '200px' }
              }
            >
              {!status || status === "NOT_STARTED" ? 'Verify KYC' : 'Verifying'}
            </Button>
          </ButtonContainer>
        </Flex>
      )
    }

    return Component
  }

  if (status === "VERIFIED") {
    return (
      <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <Flex justifyContent="center" alignItems="center">
          <img src={verifiedSrc} alt="kyc" /> <Text fontSize="12px" marginLeft="4px">This address has verified KYC.</Text>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex flexDirection="column" width="100%">
      <Text color="#3B4346" fontWeight={700}>
        KYC Status
      </Text>
      <KycBox>
        {getNonVerifiedState()}
      </KycBox>
      <Flex marginTop="8px">
        <SynapsText>
          Contact <ExternalLinkWrap href="mailto:support@synaps.io">Synaps</ExternalLinkWrap> for KYC support.
        </SynapsText>
      </Flex>

    </Flex>
  )
}

export default KYCOpen