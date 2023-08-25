'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dotsVariants,
  slideVariants,
  slidersVariants,
} from './slideAnimationVariants';
import LeftArrow from './icons/LeftArrow';
import RIghtArrow from './icons/RIghtArrow';

type CarouselProps = {
  content: any;
};

const Carousel: React.FC<CarouselProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string>('');

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === content.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection('left');

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? content.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <div className="w-full relative top-0  left-0 right-0 bottom-0 h-screen md:h-[70vh]  md:relative overflow-hidden h-[50vh]">
      <div className="carousel-content h-full w-full">
        <AnimatePresence>
          {/* Putting content here */}

          <motion.div
            className="bg-blue-300 pt-1/2 h-full"
            key={currentIndex}
            initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
            animate="visible"
            exit="exit"
            variants={slideVariants}
          >
            {content[currentIndex]}
          </motion.div>
        </AnimatePresence>

        {/* End content here */}
        <div className="flex relative w-full top-1/2 z-10  my-auto  justify-between">
          <motion.div
            variants={slidersVariants}
            whileHover="hover"
            className="left"
            onClick={handlePrevious}
          >
            {/* Left arrow */}
            <LeftArrow />
          </motion.div>
          <motion.div
            variants={slidersVariants}
            whileHover="hover"
            className="right"
            onClick={handleNext}
          >
            {/* Right arrow */}
            <RIghtArrow />
          </motion.div>
        </div>
      </div>
      <div className="flex left-1/2 absolute  -translate-x-1/2 items-center bottom-64 md:bottom-4 justify-between mx-auto w-24 ">
        {content.map((_: any, index: any) => (
          <motion.div
            key={index}
            className={` w-3 h-3 rounded-full bg-white ${
              currentIndex === index ? 'active' : ''
            }`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? 'animate' : ''}
            whileHover="hover"
            variants={dotsVariants}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
