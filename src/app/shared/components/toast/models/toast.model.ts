export interface ToastData {
  type: 'success' | 'error' | 'info'
  titleKey: string
  messageKey: string
  id?: string
}
