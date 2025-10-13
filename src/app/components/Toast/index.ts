import { useToastStore } from '@/app/store/useToastStore'
import type { ToastType } from '@/app/store/useToastStore'

const toast = (type: ToastType, message: string, duration?: number) =>
  useToastStore.getState().add({ type, message, duration })

export default {
  success: (msg: string, duration?: number) => toast('success', msg, duration),
  error: (msg: string, duration?: number) => toast('error', msg, duration),
  warning: (msg: string, duration?: number) => toast('warning', msg, duration),
  info: (msg: string, duration?: number) => toast('info', msg, duration),
}