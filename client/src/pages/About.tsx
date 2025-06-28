import { assets } from '../assets/assets';
import { motion } from "framer-motion";

const About = () => {

    return (
        <div className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary mt-20">
            <header className="w-full max-w-6xl text-center mt-8">
                <h1 className="text-4xl font-semibold text-teal mb-4">Welcome to Insight Lane</h1>
                <p className="text-gray-600 max-w-4xl mx-auto">
                    The crossroads where ideas meet expression. We believe that everyone has a story to tell, a thought to share, or a perspective to contribute. Our platform is a vibrant space for thinkers, dreamers, and creators to connect, inspire, and grow through the power of words.
                </p>
            </header>
            <div className="mt-10">
                <img
                    src={assets.aboutus}
                    alt="Team working together"
                    className="rounded-lg shadow-lg lg:max-w-3xl md:max-w-xl"
                />
            </div>
            <motion.section
                className="mt-16 w-full max-w-6xl mb-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold text-teal mb-6 text-center">
                    I Will Show You How Our Team Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    <motion.div
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">01</h3>
                        <h4 className="font-semibold text-primary mb-4">Share Your Voice</h4>
                        <p className="text-gray-600">
                            Write and publish your thoughts, ideas, or experiences through engaging blogs.
                        </p>
                    </motion.div>
                    <motion.div
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">02</h3>
                        <h4 className="font-semibold text-primary mb-4">Join the Conversation</h4>
                        <p className="text-gray-600">
                            Dive into a world of diverse perspectives by reading and commenting on others’ posts.
                        </p>
                    </motion.div>
                    <motion.div
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">03</h3>
                        <h4 className="font-semibold text-primary mb-4">Build Connections</h4>
                        <p className="text-gray-600">
                            Connect with like-minded individuals who share your passions and interests.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            <div className="flex flex-col items-center justify-center text-center space-y-3 mt-10 mb-20">
                <h1 className="md:text-4xl text-2xl font-semibold text-teal">
                    Subscribe for Weekly Inspiration!
                </h1>
                <p className="md:text-lg text-gray-500/70 pb-8">
                    Get the latest stories and updates delivered directly to your inbox. Stay informed, stay inspired!
                </p>
                <form className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                    <input
                        className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                        type="text"
                        placeholder="Enter your email address"
                        required
                    />
                    <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary/75 transition-all cursor-pointer rounded-md rounded-l-none">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default About;

