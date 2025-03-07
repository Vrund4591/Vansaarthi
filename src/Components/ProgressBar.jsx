import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ProgressBar = ({ title, items }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const barVariants = (progress) => ({
    hidden: { width: "0%" },
    visible: { 
      width: `${progress}%`,
      transition: { 
        duration: 1.5,
        ease: "easeOut"
      }
    }
  });

  const numberVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div ref={ref} className="w-full flex items-center justify-center">
      <div className="p-2 md:p-4 w-full max-w-[600px]">
        {items.map((item, i) => (
          <div key={i} className="mb-4 md:mb-6">
            <motion.div 
              className="flex justify-between mb-2 text-sm md:text-base"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={numberVariants}
              custom={i}
            >
              <span>{item.label}</span>
              <span>{item.value}+</span>
            </motion.div>
            <div className="w-full bg-gray-200 rounded-full h-2 md:h-3 overflow-hidden">
              <motion.div
                className="bg-[#3BDE3B] h-full rounded-full"
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={barVariants(item.progress)}
                transition={{
                  duration: 1.5,
                  delay: i * 0.2,
                  ease: "easeOut"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;