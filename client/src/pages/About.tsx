import { useEffect, useState } from 'react';
import { subscribeToNewsLetter } from '../api/newsLetterApi';
import { assets } from '../assets/assets';
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import { validateEmail } from '../utils/regex';
import { useAnalytics } from '../hooks/useAnalytics';

const About = () => {
    const [email, setEmail] = useState('');

    const { sendEvent, trackPageView } = useAnalytics();

    useEffect(() => {
        trackPageView(window.location.pathname);
    }, []);

    const handleSubscription = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.");
            return;
        }
        try {
            const data = await subscribeToNewsLetter(email);
            if (data.success) {
                toast.success(data.message);
                sendEvent("newsletter_subscription", { email });
                setEmail('');
            } else {
                toast.error(data.message);
                setEmail('');
            }
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    return (
        <main className="relative flex flex-col items-center px-6 md:px-16 lg:px-24 text-secondary mt-20"
            role='main' aria-labelledby="about-heading" >
            <header className="w-full max-w-6xl text-center mt-8">
                <h1 id="about-heading" className="text-4xl font-semibold text-teal mb-4">Welcome to Insight Lane</h1>
                <p className="text-gray-600 max-w-4xl mx-auto">
                    The crossroads where ideas meet expression. We believe that everyone has a story to tell, a thought to share, or a perspective to contribute. Our platform is a vibrant space for thinkers, dreamers, and creators to connect, inspire, and grow through the power of words.
                </p>
            </header>
            <figure className="mt-10">
                <img
                    src={assets.aboutus}
                    alt="A diverse team working together around a desk"
                    className="rounded-lg shadow-lg lg:max-w-3xl md:max-w-xl"
                    loading="lazy"
                />
                <figcaption className="sr-only">Team collaboration at Insight Lane</figcaption>
            </figure>
            <motion.section
                className="mt-16 w-full max-w-6xl mb-10"
                aria-labelledby="team-process-heading"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
            >
                <h2 id="team-process-heading" className="text-2xl font-semibold text-teal mb-6 text-center">
                    How Our Team Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                    <motion.article
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Step 1: Share Your Voice"
                        onClick={() => sendEvent("team_step_1_click", { step: 1, name: "Share Your Voice" })}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">01</h3>
                        <h4 className="font-semibold text-primary mb-4">Share Your Voice</h4>
                        <p className="text-gray-600">
                            Write and publish your thoughts, ideas, or experiences through engaging blogs.
                        </p>
                    </motion.article>

                    <motion.article
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Step 2: Join the Conversation"
                        onClick={() => sendEvent("team_step_2_click", { step: 2, name: "Join the Conversation" })}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">02</h3>
                        <h4 className="font-semibold text-primary mb-4">Join the Conversation</h4>
                        <p className="text-gray-600">
                            Dive into a world of diverse perspectives by reading and commenting on others’ posts.
                        </p>
                    </motion.article>
                    <motion.article
                        className="p-6 bg-blue-50/50 rounded-lg"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Step 3: Build Connections"
                        onClick={() => sendEvent("team_step_3_click", { step: 3, name: "Build Connections" })}
                    >
                        <h3 className="text-5xl font-bold text-teal mb-2">03</h3>
                        <h4 className="font-semibold text-primary mb-4">Build Connections</h4>
                        <p className="text-gray-600">
                            Connect with like-minded individuals who share your passions and interests.
                        </p>
                    </motion.article>
                </div>
            </motion.section>

            <section className="flex flex-col items-center justify-center text-center space-y-3 mt-10 mb-20"
                aria-labelledby="newsletter-heading">
                <h2 id="newsletter-heading" className="md:text-4xl text-2xl font-semibold text-teal">
                    Subscribe for Weekly Inspiration!
                </h2>
                <p className="md:text-lg text-gray-500/70 pb-8">
                    Get the latest stories and updates delivered directly to your inbox. Stay informed, stay inspired!
                </p>
                <form onSubmit={handleSubscription} aria-label="Newsletter subscription form"
                    className="flex items-center justify-between max-w-2xl w-full md:h-13 h-12">
                    <label htmlFor="email-input" className="sr-only">Email address</label>
                    <input id="email-input"
                        className="border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-required="true"
                        aria-describedby="newsletter-heading"
                    />
                    <button type="submit" className="md:px-12 px-8 h-full text-white bg-primary hover:bg-primary/75 transition-all cursor-pointer rounded-md rounded-l-none"
                        aria-label="Subscribe to newsletter">
                        Subscribe
                    </button>
                </form>
            </section>
        </main>
    );
};

export default About;

