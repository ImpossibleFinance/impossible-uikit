import React from 'react'
import styled from 'styled-components'
// @ts-ignore
import { Player } from '@lottiefiles/react-lottie-player'
import Loading from './loading.json'
import { SpinnerProps } from './types'

const Container = styled.div`
  position: relative;
`

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <Player src={Loading} autoplay loop style={{ width: size, height: size }} />
    </Container>
  )
}

export default Spinner
