import { assets } from '../assets/assets';

const Hero = () => {
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
            </div>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
        </div>
    )
}

export default Hero

