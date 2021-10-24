import { FC } from 'react'
import { SvgProps } from '../../components/Svg/types'

export enum ConnectorNames {
  Injected = 'injected',
  WalletConnect = 'walletconnect',
  BSC = 'bsc',
  Blocto = 'blocto'
}

export type Login = (connectorId: ConnectorNames) => void

export interface Config {
  title: string
  icon: FC<SvgProps>
  connectorId: ConnectorNames
  fathomID?: string
}

export interface TokenBalance {
  symbol: string
  iconSrc: string
  balance: string
}

export interface Network {
  chainID: number
  iconSrc: string
  backgroundColor: string
  name: string
  switchNetworkCallback?: () => void
  isCurrent?: boolean
}

export interface KycInfo {
  status: string
  isLoading: boolean
  passMinRequirement: boolean
  minRequirementText: string
  verifiedSrc: string
  verifyKycCallback: () => void
  getIFUrl: string
  getIDIAUrl: string
}
