"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import {
  AddImageIconSVG,
  ProfileBackgroundSVG,
  ProfileHeaderSVG,
  ProfileIconSVG,
} from "../assets/svgPaths";
// Simulated API response object
const profileData = {
  username: "JohnDoe",
  round: "Round 2",
  totalScore: 750,
};

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedImage) {
      try {
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulated successful response
        const imageUrl = URL.createObjectURL(selectedImage);
        setProfileImage(imageUrl);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="roboto relative h-[700px] w-[352px]">
      {/* Background shape with white border */}
      <ProfileBackgroundSVG className="absolute left-0 top-0" />

      {/* Content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Profile header with white border */}
        <div className="relative w-full">
          <ProfileHeaderSVG />
          <h1 className="s-sling absolute left-4 top-2 px-8 text-4xl font-normal text-[#F14A16]">
            PROFILE
          </h1>
        </div>

        {/* Profile picture placeholder */}
        <div className="group mt-8 flex h-[146px] w-[149px] items-center justify-center overflow-hidden rounded-full bg-[#2F2F2F]">
          {profileImage ? (
            <Image
              src={profileImage}
              alt="Profile"
              layout="fill"
              className="group-hover:rotate-360 object-cover transition-transform duration-500 ease-in-out"
            />
          ) : (
            <ProfileIconSVG className="group-hover:rotate-360 transition-transform duration-500 ease-in-out" />
          )}
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 flex items-center gap-2 rounded-md bg-[#2F2F2F] px-4 py-2 text-white transition-colors duration-200 hover:bg-[#3F3F3F]"
        >
          Add Image
          <AddImageIconSVG />
        </button>

        {/* Input fields */}
        <div className="mt-9 w-full space-y-9 px-4">
          <input
            type="text"
            value={profileData.username}
            readOnly
            className="h-12 w-full rounded-xl bg-[#2F2F2F] px-4 text-white"
          />
          <input
            type="text"
            value={profileData.round}
            readOnly
            className="h-12 w-full rounded-xl bg-[#2F2F2F] px-4 text-white"
          />
          <input
            type="text"
            value={profileData.totalScore}
            readOnly
            className="h-12 w-full rounded-xl bg-[#2F2F2F] px-4 text-white"
          />
        </div>
      </div>

      {/* Image Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6">
            <h2 className="mb-4 text-2xl font-bold text-black">
              Upload Profile Image
            </h2>
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
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedImage}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
