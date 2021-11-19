import Metamask from './icons/Metamask'
import MathWallet from './icons/MathWallet'
import TokenPocket from './icons/TokenPocket'
import TrustWallet from './icons/TrustWallet'
import WalletConnect from './icons/WalletConnect'
import BinanceChain from './icons/BinanceChain'
import Blocto from './icons/Blocto'
import Coin98 from './icons/Coin98'

import { Config, ConnectorNames } from './types'

const connectors: Config[] = [
  {
    title: 'Metamask (Recommended)',
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    fathomID: 'RPITS1R9',
    walletID: 'metamask',
  },
  {
    title: 'Blocto',
    icon: Blocto,
    connectorId: ConnectorNames.Blocto,
    fathomID: 'AXOFZIML',
    walletID: 'blocto',
  },
  {
    title: 'Coin98',
    icon: Coin98,
    connectorId: ConnectorNames.Injected,
    fathomID: 'PLVUGNVO',
    walletID: 'coin98',
  },
  {
    title: 'TrustWallet',
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
    fathomID: '1AE78PKB',
    walletID: 'trustWallet',
  },
  {
    title: 'MathWallet',
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
    fathomID: 'MJNUFWDK',
    walletID: 'mathWallet',
  },
  {
    title: 'TokenPocket',
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
    fathomID: '1EQPEFNH',
    walletID: 'tokenPocket',
  },
  {
    title: 'WalletConnect',
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    fathomID: 'PBFYPUUQ',
    walletID: 'walletConnect',
  },
  {
    title: 'Binance Chain Wallet',
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
    fathomID: 'S1FNEV6R',
    walletID: 'binanceChain',
  },
]

export default connectors
export const connectorLocalStorageKey = 'connectorId'
export const walletLocalStorageKey = 'walletId'

