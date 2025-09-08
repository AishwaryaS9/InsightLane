import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';
import { assets } from '../assets/assets';
import type { ProfilePhotoSelectorProps } from '../utils/interface';
import { analytics, logEvent } from "../config/firebase";
import { useAppSelector } from '../redux/store/hooks';


const ProfilePhotoSelector: React.FC<ProfilePhotoSelectorProps> = ({ image, setImage }) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const userId = useAppSelector((state) => state.login.userId);

    const trackProfilePhotoUploaded = (fileName: string, userId: string | null) => {
        if (analytics) {
            logEvent(analytics, "profile_photo_uploaded", {
                file_name: fileName,
                user_id: userId,
            });
        }
    };

    const trackProfilePhotoRemoved = (userId: string | null) => {
        if (analytics) {
            logEvent(analytics, "profile_photo_removed", {
                user_id: userId,
            });
        }
    };

    const trackProfilePhotoError = (errorMessage: string, userId: string | null) => {
        if (analytics) {
            logEvent(analytics, "profile_photo_error", {
                error_message: errorMessage,
                user_id: userId,
            });
        }
    };

    useEffect(() => {
        if (image) {
            if (typeof image === 'string') {
                setPreviewUrl(image);
            } else {
                const preview = URL.createObjectURL(image);
                setPreviewUrl(preview);
                return () => URL.revokeObjectURL(preview);
            }
        } else {
            setPreviewUrl(null);
        }
    }, [image]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
            trackProfilePhotoUploaded(file.name, userId || null);
        }
    };

    const handleImageError = () => {
        setPreviewUrl(assets.defaultAvatar);
        trackProfilePhotoError("Image load failed - fallback to default avatar", userId || null);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        trackProfilePhotoRemoved(userId || null);
    };

    const onChooseFile = () => {
        inputRef?.current?.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
                aria-label="Upload profile photo"
            />
            {!previewUrl ? (
                <div role="button"
                    tabIndex={0}
                    onClick={onChooseFile} aria-label="Choose profile photo"
                    className="w-20 h-20 flex items-center justify-center rounded-full relative cursor-pointer
                               bg-blue-100/50 dark:bg-blue-900/50"
                >
                    <LuUser className="text-4xl text-primary dark:text-cyan-400" />
                    <button
                        type="button" aria-label="Upload profile photo"
                        className="w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-1 -right-1
                                   bg-primary dark:bg-cyan-600 text-white"
                    >
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className="relative">
                    <img
                        src={previewUrl}
                        alt="Profile photo preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300 dark:border-gray-600"
                        onError={handleImageError}
                    />
                    <button
                        type="button"
                        onClick={handleRemoveImage} aria-label="Remove profile photo"
                        className="w-8 h-8 flex items-center justify-center rounded-full absolute -bottom-1 -right-1
                                   bg-red-500 dark:bg-red-600 text-white"
                    >
                        <LuTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;