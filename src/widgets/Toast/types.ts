export const types = {
  SUCCESS: 'success',
  DANGER: 'danger',
  WARNING: 'warning',
  INFO: 'info',
  ANNOUNCEMENT: 'announcement',
}

export type Types = typeof types[keyof typeof types]

export interface ToastAction {
  text: string
  url: string
}

export interface Toast {
  id: string
  type: Types
  title: string
  description?: string
  action?: ToastAction
  alertBackground?: string
  toastBackground?: string
  alwaysShow?: boolean
  icon?: string
  onClick?: Function
}

export interface ToastContainerProps {
  toasts: Toast[]
  stackSpacing?: number
  ttl?: number
  onRemove: (id: string) => void
}

export interface ToastProps {
  toast: Toast
  onRemove: ToastContainerProps['onRemove']
  ttl: number
  style: Partial<CSSStyleDeclaration>
}
