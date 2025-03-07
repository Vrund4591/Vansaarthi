import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const AnimateOnScroll = ({ children, animation, onAnimationComplete }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ 
    threshold: 0.3,
    triggerOnce: false // Changed to false to allow re-animation
  });

const animations = {
    fadeUp: {
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
      hidden: { opacity: 0, y: 50 }
    },
    fadeIn: {
      visible: { opacity: 1, transition: { duration: 0.6 } },
      hidden: { opacity: 0 }
    },
    slideIn: {
      visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
      hidden: { opacity: 0, x: -50 }
    },
    scale: {
      visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
      hidden: { opacity: 0, scale: 0.8 }
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible").then(() => {
        onAnimationComplete?.(); // Call the callback if provided
      });
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={animations[animation]}
    >
      {children}
    </motion.div>
  );
};