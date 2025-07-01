import React, { useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import ProfilePhotoSelector from './ProfilePhotoSelector';
import { updateUserProfile } from '../api/userApi';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import toast from 'react-hot-toast';
import { userProfileDetails } from '../redux/store/slice/userProfileSlice';
import type { User } from '../utils/interface';

const EditProfileModal: React.FC<{ data: User; isOpen: boolean; onViewClose: () => void; }> = ({ data, isOpen, onViewClose }) => {
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState(data.name || '');
    const [bio, setBio] = useState(data.bio || '');
    const [loading, setLoading] = useState(false);
    const [socialLinks, setSocialLinks] = useState({
        facebook: data.socialLinks?.facebook || '',
        twitter: data.socialLinks?.twitter || '',
        linkedin: data.socialLinks?.linkedin || ''
    });

    const userToken = useAppSelector((state) => state.login.token);
    const dispatch = useAppDispatch();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('bio', bio);
            formData.append('socialLinks', JSON.stringify(socialLinks));
            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            const response = await updateUserProfile(userToken, formData);
            if (response) {
                dispatch(userProfileDetails({
                    data: response
                }))
                toast.success("User details updated successfully");
                onViewClose();
            }
        } catch (error) {
            setError('Failed to update profile. Please try again.');
            toast.error((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={onViewClose}>
            <div
                className="relative bg-white rounded-lg shadow-sm w-full max-w-2xl h-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 md:p-5">
                    <h3 className="text-lg font-medium text-gray-900">Edit Profile</h3>
                    <button
                        type="button"
                        onClick={onViewClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <IoCloseOutline className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-2">
                    <div>
                        <label className="text-xs font-medium text-slate-600">Name</label>
                        <input
                            type="text"
                            className="form-input mt-1"
                            placeholder="Enter your name"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600">Bio</label>
                        <textarea
                            rows={6}
                            className="form-input mt-1"
                            placeholder="Enter your bio"
                            value={bio}
                            onChange={({ target }) => setBio(target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600">Social Links</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            <input
                                type="text"
                                className="form-input flex-1"
                                placeholder="Facebook"
                                value={socialLinks.facebook}
                                onChange={({ target }) =>
                                    setSocialLinks((prev) => ({ ...prev, facebook: target.value }))
                                }
                            />
                            <input
                                type="text"
                                className="form-input flex-1"
                                placeholder="X (formerly Twitter)"
                                value={socialLinks.twitter}
                                onChange={({ target }) =>
                                    setSocialLinks((prev) => ({ ...prev, twitter: target.value }))
                                }
                            />
                            <input
                                type="text"
                                className="form-input flex-1"
                                placeholder="LinkedIn"
                                value={socialLinks.linkedin}
                                onChange={({ target }) =>
                                    setSocialLinks((prev) => ({ ...prev, linkedin: target.value }))
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-600">Profile Picture</label>
                        <ProfilePhotoSelector
                            image={profilePicture || data.profilePicture}
                            setImage={setProfilePicture}
                        />
                    </div>

                    {error && <p className="text-xs font-medium text-red-500 mt-5">{error}</p>}

                    <div className="p-4 md:p-5 flex justify-end">
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={onViewClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`add-btn ml-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
