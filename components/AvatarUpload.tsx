'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Image from 'next/image'

interface AvatarUploadProps {
    uid: string
    url: string | null
    onUpload: (url: string) => void
    size?: number
}

export default function AvatarUpload({ uid, url, onUpload, size = 150 }: AvatarUploadProps) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
    const [uploading, setUploading] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        if (url) setAvatarUrl(url)
    }, [url])

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }

            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const filePath = `${uid}/${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('profile-pictures')
                .upload(filePath, file)

            if (uploadError) {
                throw uploadError
            }

            // Get public URL
            const { data } = supabase.storage
                .from('profile-pictures')
                .getPublicUrl(filePath)

            setAvatarUrl(data.publicUrl)
            onUpload(data.publicUrl)

        } catch (error: any) {
            alert(error.message || 'Error uploading avatar!')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <div
                className="relative overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100"
                style={{ width: size, height: size }}
            >
                {avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt="Avatar"
                        className="object-cover"
                        fill
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        <svg
                            className="h-16 w-16"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                )}
            </div>

            <div className="relative">
                <label
                    htmlFor="single"
                    className={`btn btn-outline btn-sm cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                    {uploading ? 'Uploading...' : 'Change Photo'}
                </label>
                <input
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    )
}
