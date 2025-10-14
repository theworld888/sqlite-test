import { create } from 'zustand'

interface ConfirmState {
  open: boolean
  title: string
  onConfirm: () => void
  onCancel?: () => void
  confirm: (title: string, onConfirm: () => void, onCancel?: () => void) => void
  close: () => void
}

export const useConfirmStore = create<ConfirmState>()((set, get) => ({
  open: false,
  title: '',
  onConfirm: () => {},
  onCancel: undefined,
  confirm: (title, onConfirm, onCancel) => {
    set({ open: true, title, onConfirm, onCancel })
  },
  close: () => {
    set({ open: false })
  },
}))