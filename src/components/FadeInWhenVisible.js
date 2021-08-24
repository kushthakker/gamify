import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const FadeInWhenVisible = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.4 }}
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.3, ...transition },
        },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
