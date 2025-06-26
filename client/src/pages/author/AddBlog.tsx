import { useState, useRef, useEffect } from 'react';
import { assets, dropDownCategories } from '../../assets/assets';
import Quill from 'quill';
import { parse } from 'marked';
import { addBlog, generateAIContent } from '../../api/blogApi';
import { useAppSelector } from '../../redux/store/hooks';

const AddBlog = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const quillRef = useRef<Quill | null>(null);

    const [image, setImage] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [category, setCategory] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<{ field: string; message: string }[]>([]);

    const userToken = useAppSelector((state) => state.login.token);

    const validateFields = () => {
        const errors = [];
        if (!title.trim()) {
            errors.push({ field: 'title', message: 'Title is required' });
        }
        if (!subTitle.trim()) {
            errors.push({ field: 'subTitle', message: 'Sub Title is required' });
        }
        if (!quillRef.current?.root.innerHTML.trim() || quillRef.current?.root.innerHTML === '<p><br></p>') {
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

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setError([]);

        if (!validateFields()) return;

        try {
            setIsAdding(true);
            const blog = {
                title,
                subTitle,
                description: quillRef.current?.root.innerHTML,
                category,
            };
            const formData = new FormData();
            formData.append('blog', JSON.stringify(blog));
            if (image) {
                formData.append('image', image);
            }

            const data = await addBlog(userToken, formData);
            if (data) {
                setImage(null);
                setTitle('');
                setSubTitle('');
                if (quillRef.current) {
                    quillRef.current.root.innerHTML = '';
                }
                setCategory('Startup');
            } else {
                setError([{ field: 'general', message: data.message }]);
            }
        } catch (error) {
            setError([{ field: 'general', message: (error as Error).message }]);
        } finally {
            setIsAdding(false);
        }
    };

    const generateContent = async () => {
        if (!title) {
            setError([{ field: 'title', message: 'Please enter a title' }]);
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

    useEffect(() => {
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, { theme: 'snow' });
        }
    }, []);

    return (
        <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll p-4'>
            <div className='bg-white w-full max-w-3xl mx-auto p-6 shadow-lg rounded-lg'>
                <h1 className="text-2xl font-semibold mb-4 text-gray-700">Add New Blog</h1>
                <div className="space-y-1">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Upload Thumbnail</label>
                        <label htmlFor="image">
                            <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt=""
                                className='mt-2 h-16 rounded cursor-pointer' />
                            <input onChange={(e) => setImage(e.target.files?.[0] || null)}
                                type="file" id='image' hidden />
                        </label>
                        {error.filter(err => err.field === 'image').map((err, index) => (
                            <p key={index} className='text-red-500 text-xs'>{err.message}</p>
                        ))}
                    </div>

                    <p className='mt-4'>Blog Title</p>
                    <input type="text" placeholder='Type here'
                        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                        onChange={e => setTitle(e.target.value)} value={title} />
                    {error.filter(err => err.field === 'title').map((err, index) => (
                        <p key={index} className='text-red-500 text-xs'>{err.message}</p>
                    ))}

                    <p className='mt-4'>Sub Title</p>
                    <input type="text" placeholder='Type here'
                        className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
                        onChange={e => setSubTitle(e.target.value)} value={subTitle} />
                    {error.filter(err => err.field === 'subTitle').map((err, index) => (
                        <p key={index} className='text-red-500 text-xs'>{err.message}</p>
                    ))}

                    <p className="mt-4">Blog Description</p>
                    <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
                        <div ref={editorRef}></div>
                        {error.filter(err => err.field === 'description').map((err, index) => (
                            <p key={index} className='text-red-500 text-xs mt-2'>{err.message}</p>
                        ))}
                        {loading && (
                            <div className='absolute right-0 top-0 bottom-0 left-0
                        flex items-center justify-center bg-black/10 mt-2'>
                                <div className='w-8 h-8 rounded-full border-2 border-t-white
                            animate-spin'></div>
                            </div>
                        )}
                        <button disabled={loading} className='absolute bottom-1 right-2 ml-2 text-xs text-white
                    bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'
                            type='button'
                            onClick={generateContent}
                        >Generate with AI</button>
                    </div>

                    <p className="mt-6">Blog Category</p>
                    <select name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
                        onChange={e => setCategory(e.target.value)} value={category}>
                        <option value="">Select Category</option>
                        {dropDownCategories.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>;
                        })}
                    </select>
                    {error.filter(err => err.field === 'category').map((err, index) => (
                        <p key={index} className='text-red-500 text-xs'>{err.message}</p>
                    ))}

                    <div className='flex gap-2'>
                        <button disabled={isAdding} type='submit' className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
                            {isAdding ? 'Adding...' : 'Add Blog'}
                        </button>
                        {error.filter(err => err.field === 'general').map((err, index) => (
                            <p key={index} className='text-red-500 text-xs mt-2'>{err.message}</p>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AddBlog;
