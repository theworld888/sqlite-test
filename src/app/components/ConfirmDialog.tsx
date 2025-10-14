'use client'
import { useConfirmStore } from '@/app/store/useConfirmStore'
import { useEffect } from 'react'

export default function ConfirmDialog() {
    const { open, title, onConfirm, onCancel, close } = useConfirmStore()

    useEffect(() => {
        if (open) {
            const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && handleCancel()
            document.addEventListener('keydown', handleEsc)
            return () => document.removeEventListener('keydown', handleEsc)
        }
    }, [open])

    const handleConfirm = () => {
        onConfirm()
        close()
    }

    const handleCancel = () => {
        onCancel?.()
        close()
    }

    if (!open) return null

    return (
        <>
            {/* 毛玻璃背景 */}
            <div className="fixed inset-0 z-50 bg-black/50" onClick={handleCancel} />

            {/* 对话框 */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-70  rounded-[5px] bg-[#f6f7f9] pt-8 text-center shadow-xl backdrop-blur">
                    <div className="text-lg font-medium text-gray-900">{title}</div>

                    {/* 按钮组 */}
                    <div className=" w-full mt-10 flex border-t border-gray-300">
                        <button
                            onClick={handleCancel}
                            className="flex-1   py-2.5 text-lg text-gray-700 active:bg-gray-50"
                        >
                            取消
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 text-pink-500 py-2.5 text-lg   active:bg-pink-600"
                        >
                            确定
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}