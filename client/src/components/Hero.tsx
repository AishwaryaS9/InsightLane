import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { useAnalytics } from "../hooks/useAnalytics";
import { useEffect } from "react";

const Hero = () => {
    const { trackPageView, sendEvent } = useAnalytics();

    useEffect(() => {
        trackPageView(window.location.pathname);
    }, []);

    return (
        <section className="relative flex flex-col justify-center items-center px-4 sm:px-8 md:px-16 
        lg:px-24 xl:px-32 text-center mt-24 sm:mt-32">

            {/* Badge */}
            <div
                className="inline-flex items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-1.5
                mb-6 sm:mb-8 border border-primary/40 bg-primary/10 rounded-full text-xs sm:text-sm cursor-pointer"
                onClick={() => sendEvent("hero_badge_click", { badge: "AI-enabled features" })}
            >
                <p className="text-secondary">New: AI-enabled features</p>
                <motion.img
                    src={assets.star_icon}
                    alt="Rotating star icon"
                    className="w-3 sm:w-4"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "linear",
                    }}
                />
            </div>

            {/* Title */}
            <motion.h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug sm:leading-tight text-gray-700"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <p>
                    A space to <span className="text-primary">dream</span>, <br className="hidden sm:block" /> share, and create.
                </p>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="mt-4 sm:mt-6 md:mt-8 max-w-lg sm:max-w-2xl text-xs sm:text-sm md:text-base text-secondary px-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
            >
                Welcome to your space for writing, reflecting, and sharing what matters most.
                Every word is a step forward.
            </motion.p>

            {/* Background Decoration */}
            <img
                src={assets.gradientBackground}
                alt="Gradient background decoration"
                aria-hidden="true"
                className="absolute -top-20 sm:-top-40 -z-10 opacity-50 w-full max-w-4xl"
            />
        </section>
    );
};

export default Hero;
