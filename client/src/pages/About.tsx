import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const About = () => {
    const navigate = useNavigate();
    return (
        <div className="relative flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 xl:px-32 text-secondary mt-20">
            {/* Background Image */}
            <img
                src={assets.gradientBackground}
                alt=""
                className="absolute top-0 left-0 w-full h-full -z-10 opacity-50"
            />

            {/* Content Card */}
            <div className=" bg-opacity-90 backdrop-blur-lg p-6 md:p-12 text-justify max-w-3xl">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
                    Welcome to Insight Lane
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                    The crossroads where ideas meet expression. We believe that everyone has a story to tell, a thought to share, or a perspective to contribute.
                    Our platform is a vibrant space for thinkers, dreamers, and creators to connect, inspire, and grow through the power of words.
                </p>
                <ul className="text-left text-gray-600 space-y-4 mb-6">
                    <li><strong>Share Your Voice:</strong> Write and publish your thoughts, ideas, or experiences through engaging blogs.</li>
                    <li><strong>Join the Conversation:</strong> Dive into a world of diverse perspectives by reading and commenting on others’ posts.</li>
                    <li><strong>Build Connections:</strong> Connect with like-minded individuals who share your passions and interests.</li>
                </ul>
                <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-6">
                    Whether you’re a seasoned writer or just looking for a space to express yourself, Insight Lane is here to celebrate your unique voice.
                    Let’s pave the way for meaningful conversations, one blog at a time.
                </p>
                {/* Call-to-Action */}
                <button onClick={() => navigate('/')} className="px-6 py-3 bg-primary text-white rounded-full shadow-md hover:bg-primary-dark transition-all duration-300">
                    Start Exploring
                </button>
            </div>
        </div>
    );
};

export default About;
