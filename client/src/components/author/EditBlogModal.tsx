import { IoCloseOutline } from 'react-icons/io5';
import { assets, dropDownCategories } from '../../assets/assets';
import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import { useAppSelector } from '../../redux/store/hooks';
import { generateAIContent, updateBlog } from '../../api/blogApi';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import type { Blogs } from '../../utils/interface';

const EditBlogModal: React.FC<{
    data: Blogs;
    isOpen: boolean;
    onViewClose: () => void;
    onRefresh: () => void;
}> = ({ data, isOpen, onViewClose, onRefresh }) => {
    const [error, setError] = useState<{ field: string; message: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(data.title || '');
    const [subTitle, setSubTitle] = useState(data.subTitle || '');
    const [description, setDescription] = useState(data.description || '');
    const [category, setCategory] = useState(data.category || '');
    const [image, setImage] = useState<string | null>(data.image || null);
    const [file, setFile] = useState<File | null>(null);

    const userToken = useAppSelector((state) => state.login.token);

    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
                placeholder: 'Write your blog description here...',
            });

            if (description) {
                quillRef.current.root.innerHTML = description;
            }

            quillRef.current.on('text-change', () => {
                setDescription(quillRef.current!.root.innerHTML);
            });
        }
    }, [description]);

    useEffect(() => {
        return () => {
            if (image && typeof image === 'string' && image.startsWith('blob:')) {
                URL.revokeObjectURL(image);
            }
        };
    }, [image]);

    const validateFields = () => {
        const errors = [];
        if (!title.trim()) {
            errors.push({ field: 'title', message: 'Title is required' });
        }
        if (!subTitle.trim()) {
            errors.push({ field: 'subTitle', message: 'Sub Title is required' });
        }
        const descriptionContent = quillRef.current?.root.innerHTML.trim() || '';
        if (!descriptionContent || descriptionContent === '<p><br></p>') {
            errors.push({ field: 'description', message: 'Description is required' });
        }
        if (!image) {
            errors.push({ field: 'image', message: 'Thumbnail image is required' });
        }
        if (!category.trim()) {
            errors.push({ field: 'category', message: 'Category is required' });
        }

        if (errors.length > 0) {
            setError(errors);
            return false;
        }
        setError([]);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setError([]);
        if (!validateFields()) {
            setLoading(false);
            return;
        }
        try {
            setIsEditing(true);
            const formData = new FormData();
            formData.append('title', title);
            formData.append('subTitle', subTitle);
            formData.append('description', description);
            formData.append('category', category);
            if (file) {
                formData.append('image', file);
            }
            const response = await updateBlog(userToken, data._id, formData);

            if (response) {
                toast.success(response.message);
                onRefresh();
                onViewClose();
            } else {
                setError([{ field: 'general', message: data.message }]);
            }
        } catch (error) {
            toast.error((error as Error).message);
            setError([{ field: 'general', message: (error as Error).message }]);
        } finally {
            setLoading(false);
        }
    };

    const generateContent = async () => {
        if (!title && !subTitle) {
            setError([{ field: 'title', message: 'Please enter a title' }]);
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            const data = await generateAIContent(userToken, title);
            if (data) {
                if (quillRef.current) {
                    const content = await parse(data.content);
                    quillRef.current.root.innerHTML = content;
                }
            } else {
                setError([{ field: 'general', message: data.message }]);
            }
        } catch (error) {
            setError([{ field: 'general', message: (error as Error).message }]);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={onViewClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-blog-title"
            aria-describedby="edit-blog-description"
        >
            <div
                className="relative bg-white rounded-2xl shadow-lg w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 md:p-5">
                    <h3 className="text-lg font-medium text-gray-900">Edit Blog</h3>
                    <button
                        type="button" aria-label="Close edit blog modal"
                        onClick={onViewClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                    >
                        <IoCloseOutline className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="space-y-1 p-4 md:p-5 overflow-y-auto" id="edit-blog-description">
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-600">Upload Thumbnail</label>
                        <label htmlFor="image">
                            {image ? (
                                <img
                                    src={image}
                                    alt="Current blog thumbnail"
                                    className="mt-2 h-16 rounded cursor-pointer"
                                />
                            ) : (
                                <img
                                    src={assets.upload_area}
                                    alt="Default thumbnail placeholder"
                                    className="mt-2 h-16 rounded cursor-pointer"
                                />
                            )}
                            <input
                                type="file"
                                id="image"
                                hidden
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setFile(file);
                                        setImage(URL.createObjectURL(file));
                                    }
                                }}
                            />
                        </label>
                        {error
                            .filter((err) => err.field === 'image')
                            .map((err, index) => (
                                <p key={index} className="text-red-500 text-xs" id="error-image">
                                    {err.message}
                                </p>
                            ))}
                    </div>

                    <p className="mt-4">Blog Title</p>
                    <input id="title"
                        type="text"
                        placeholder="Type here"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        aria-describedby="error-title"
                        className="w-full max-w-2xl mt-2 p-2 border border-gray-300 outline-none rounded"
                    />
                    {error
                        .filter((err) => err.field === 'title')
                        .map((err, index) => (
                            <p key={index} className="text-red-500 text-xs" id="error-title">
                                {err.message}
                            </p>
                        ))}

                    <p className="mt-4">Sub Title</p>
                    <input id="subTitle" aria-describedby="error-subTitle"
                        type="text"
                        placeholder="Type here"
                        className="w-full max-w-2xl mt-2 p-2 border border-gray-300 outline-none rounded"
                        onChange={(e) => setSubTitle(e.target.value)}
                        value={subTitle}
                    />
                    {error
                        .filter((err) => err.field === 'subTitle')
                        .map((err, index) => (
                            <p key={index} id="error-subTitle" className="text-red-500 text-xs">
                                {err.message}
                            </p>
                        ))}

                    <p className="mt-4">Blog Description</p>
                    <div id="description" className="max-w-2xl h-74 pb-16 sm:pb-10 pt-2 relative">
                        <div ref={editorRef}></div>
                        {error
                            .filter((err) => err.field === 'description')
                            .map((err, index) => (
                                <p key={index} className="text-red-500 text-xs mt-2" id="error-description">
                                    {err.message}
                                </p>
                            ))}
                        {loading && (
                            <div role="status"
                                aria-live="polite" className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
                                <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
                            </div>
                        )}
                        <button
                            disabled={loading}
                            className="absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer"
                            type="button"
                            onClick={generateContent}
                            aria-label="Generate blog description with AI"
                        >
                            Generate with AI
                        </button>
                    </div>

                    <p className="mt-6">Blog Category</p>
                    <select id="category"
                        name="category"
                        className="mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        aria-describedby="error-category"
                    >
                        <option value="">Select Category</option>
                        {dropDownCategories.map((item, index) => (
                            <option key={index} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    {error
                        .filter((err) => err.field === 'category')
                        .map((err, index) => (
                            <p key={index} className="text-red-500 text-xs" id="error-category">
                                {err.message}
                            </p>
                        ))}

                    <div className="flex gap-2">
                        <button
                            disabled={isEditing}
                            type="submit"
                            className="mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm"
                            onClick={handleSubmit}
                            aria-label="Update blog"
                        >
                            {isEditing ? 'Updating...' : 'Update Blog'}
                        </button>
                        {error
                            .filter((err) => err.field === 'general')
                            .map((err, index) => (
                                <p key={index} className="text-red-500 text-xs mt-2">
                                    {err.message}
                                </p>
                            ))}
                    </div>
                </div>
            </div >
        </div >
    );
};

export default EditBlogModal;
