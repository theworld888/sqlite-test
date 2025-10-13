'use client'
import { AnimatePresence, motion } from 'framer-motion'
import ToastItem from './ToastItem'
import { useToastStore } from '@/store/useToastStore'

export default function ToastContainer() {
    const { toasts } = useToastStore()

    return (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex flex-col items-center gap-2">
            <AnimatePresence>
                {toasts.map((t) => (
                    <motion.div
                        key={t.id}
                        initial={{ y: 30, opacity: 0 }}   // 从下方滑入
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ToastItem toast={t} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}