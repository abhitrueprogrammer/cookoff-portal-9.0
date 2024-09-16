'use client'

import React, { useRef, useState } from 'react';
import { svgPaths } from '../assests/svgPaths';

// Simulated API response object
const profileData = {
    username: "JohnDoe",
    round: "Round 2",
    totalScore: 750,
}

export default function Component() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [profileImage, setProfileImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (selectedImage) {
            try {
                const formData = new FormData()
                formData.append('image', selectedImage)

                // Simulated API call
                await new Promise(resolve => setTimeout(resolve, 1000))

                // Simulated successful response
                const imageUrl = URL.createObjectURL(selectedImage)
                setProfileImage(imageUrl)
                setIsModalOpen(false)
            } catch (error) {
                console.error('Error uploading image:', error)
            }
        }
    }

    return (
        <div className="relative w-[352px] h-[700px] roboto">
            {/* Background shape with white border */}
            <svg className="absolute top-0 left-0" width="352" height="702" viewBox="0 0 352 702" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={svgPaths.backgroundShape} fill="#202020" stroke="white" strokeWidth="1" />
            </svg>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Profile header with white border */}
                <div className="w-full relative">
                    <svg width="352" height="61" viewBox="0 0 352 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d={svgPaths.profileHeader} fill="black" stroke="white" strokeWidth="1" />
                    </svg>
                    <h1 className="absolute top-2 left-4 text-[#F14A16] text-4xl font-normal px-8 s-sling">
                        PROFILE
                    </h1>
                </div>

                {/* Profile picture placeholder */}
                <div className="mt-8 w-[149px] h-[146px] bg-[#2F2F2F] rounded-full flex items-center justify-center overflow-hidden group">
                    {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:rotate-360" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="155" height="152" viewBox="0 0 155 152" fill="none" className="transition-transform duration-500 ease-in-out group-hover:rotate-360">
                            <path d={svgPaths.profileIcon} stroke="#C1BBB3" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-4 px-4 py-2 bg-[#2F2F2F] text-white rounded-md flex items-center gap-2 hover:bg-[#3F3F3F] transition-colors duration-200"
                >
                    Add Image
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                        <path d={svgPaths.addImageIcon} stroke="#B7AB98" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Input fields */}
                <div className="mt-9 w-full space-y-9 px-4">
                    <input
                        type="text"
                        value={profileData.username}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                    <input
                        type="text"
                        value={profileData.round}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                    <input
                        type="text"
                        value={profileData.totalScore}
                        readOnly
                        className="w-full h-12 px-4 bg-[#2F2F2F] text-white rounded-xl"
                    />
                </div>
            </div>

            {/* Image Upload Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-black">Upload Profile Image</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="mb-4 w-full"
                                ref={fileInputRef}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!selectedImage}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}