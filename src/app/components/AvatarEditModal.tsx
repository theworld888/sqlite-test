"use client"
import { useEffect, useState } from "react"
import AvatarUpload from "@/app/components/AvatarUpload"
import { XMarkIcon } from "@heroicons/react/24/outline"

export default function AvatarEditModal({ isOpen, onClose, onSave, defaultImage }: {
    isOpen: boolean,
    defaultImage?: string,
    onClose: () => void,
    onSave: (url: string) => void
}) {

    const [tempAvatar, setTempAvatar] = useState<string | null>(defaultImage || null)
    useEffect(() => {
        setTempAvatar(defaultImage || null)
    }, [defaultImage])


    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
            <button
                className="absolute left-2 top-2 text-gray-600 dark:text-gray-300 hover:text-black"
                onClick={onClose}
            >
                <XMarkIcon className="w-5 h-5" />
                {/* 如果没有 Icon，可以用：× */}
            </button>
            <div className="w-[90vw] h-[65vh]   flex flex-col items-center justify-around">
                {
                    tempAvatar ? <img
                        src={tempAvatar}
                        className="w-[90vw] h-[90vw] object-cover"
                    /> : <div className="w-[90vw] h-[90vw]  bg-sky-500"></div>
                }

                <AvatarUpload
                    onSuccess={(url) => {
                        console.log('上传成功：', url)
                        setTempAvatar(url)
                    }}
                    customTrigger={(open) => (
                        <div className="bg-[#313131] w-70 h-10 text-white text-center leading-10 rounded-sm" onClick={open}>更换头像</div>
                    )}
                />
                <div className="bg-[#313131] w-70 h-10 text-white text-center leading-10 rounded-sm">保存图片</div>
            </div>


            {/* <div className="bg-white dark:bg-[#17181a] p-4 rounded-md w-80 flex flex-col items-center space-y-4">

                <AvatarUpload onChange={(base64) => setTempAvatar(base64)} />

                <div className="flex w-full space-x-2">
                    <button
                        className="flex-1 bg-gray-300 dark:bg-gray-700 text-black dark:text-white py-2 rounded"
                        onClick={onClose}
                    >
                        取消
                    </button>
                    <button
                        className="flex-1 bg-blue-500 text-white py-2 rounded"
                        onClick={() => {
                            if (tempAvatar) {
                                onSave(tempAvatar)
                                onClose()
                            }
                        }}
                    >
                        保存
                    </button>
                </div>
            </div> */}
        </div>
    )
}
