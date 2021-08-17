import Metamask from './icons/Metamask'
import MathWallet from './icons/MathWallet'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import BinanceChain from './icons/BinanceChain'
import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask (Recommended)',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    fathomID: 'RPITS1R9',
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
    fathomID: '1AE78PKB',
  },
  {
    title: 'MathWallet',
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
    fathomID: 'MJNUFWDK',
  },
  {
    title: 'TokenPocket',
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
    fathomID: '1EQPEFNH',
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    fathomID: 'PBFYPUUQ',
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
    fathomID: 'S1FNEV6R',
  },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'
