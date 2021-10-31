import { MouseEvent, ReactNode } from 'react'

export type AlertTheme = {
  background: string
}

export const variants = {
  INFO: 'info',
  DANGER: 'danger',
  SUCCESS: 'success',
  WARNING: 'warning',
  ANNOUNCEMENT: 'announcement',
} as const

export type Variants = typeof variants[keyof typeof variants]

export interface AlertProps {
  variant?: Variants
  title: string | ReactNode
  children?: ReactNode
  onClick?: (evt: MouseEvent<HTMLButtonElement>) => void
  toastBackground?: string
  alertBackground?: string
  toastIcon?: string
  toastBorder?: string
}
