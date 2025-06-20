import { useRef, useState } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {

    const [input, setInput] = useState('');

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputRef.current) {
            setInput(inputRef.current.value);
        }
    }

    const onClear = () => {
        setInput('');
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    return (
        <div className='flex flex-col justify-center px-6 md:px-16 
        lg:px-24 xl:px-32 text-white mt-20'>
            <div className='text-center mt-20 mb-8'>
                <div className='inline-flex items-center justify-center gap-4 px-6 py-1.5
                mb-4 border border-primary/40 bg-primary/10 rounded-full text-sm'>
                    <p className='text-secondary'>New: AI-enabled features</p>
                    <img src={assets.star_icon} alt="" className='w-2.5' />
                </div>
                <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700'>
                    <p>A space to <span className='text-primary'>dream</span>, <br /> share, and create.</p>
                </h1>
                <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-secondary'>
                    Welcome to your space for writing, reflecting, and sharing what matters most. Every word is a step forward.
                </p>
                <form onSubmit={onSubmitHandler} className='flex justify-between max-w-lg max-sm:scale-75 mx-auto
                border border-gray-300 bg-white rounded overflow-hidden'>
                    <input ref={inputRef} type="text" placeholder='Search for blogs' required
                        className='w-full pl-4 outline-none placeholder:text-gray-400' />
                    <button type='submit' className='bg-primary text-white px-8 py-2 m-1.5
                    rounded hover:scale-105 transition-all cursor-pointer'>Search</button>
                </form>
            </div>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
        </div>
    )
}

export default Hero