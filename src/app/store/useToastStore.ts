import { create } from 'zustand'
import { nanoid } from 'nanoid'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastMessage {
  id: string
  type: ToastType
  message: string
  duration?: number
}

interface ToastState {
  toasts: ToastMessage[]
  add: (msg: Omit<ToastMessage, 'id'>) => void
  remove: (id: string) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  add: (msg) =>
    set((state) => ({
      toasts: [...state.toasts, { ...msg, id: nanoid() }],
    })),
  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}))