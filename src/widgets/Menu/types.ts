import { Login } from '../WalletModal/types'

export interface LangType {
  code: string
  language: string
}

export interface Profile {
  username?: string
  image?: string
  profileLink: string
  noProfileLink: string
  showPip?: boolean
}

export interface PushedProps {
  isPushed: boolean
  pushNav: (isPushed: boolean) => void
}

export interface NavTheme {
  impossible?: string
  background: string
  hover: string
}

export interface MenuSubEntry {
  label: string
  href: string
  calloutClass?: string
}

export interface MenuEntry {
  icon: string;
  items: MenuSubEntry[];
  isSidebar?: boolean
  isNewTab?: boolean
  isNew?: boolean
  label: string
  href?: string
  calloutClass?: string
  initialOpenState?: boolean
}

export interface PanelProps {
  isDark: boolean
  toggleTheme: (isDark: boolean) => void
  cakePriceUsd?: number
  currentLang: string
  langs: LangType[]
  setLang: (lang: LangType) => void
  links: Array<MenuEntry>
}

export interface NavProps extends PanelProps {
  account?: string
  ifPriceUsd?: number
  useIFBalance?: () => string
  useBnbBalance?: () => string
  login: Login
  profile?: Profile
  logout: () => void
}
