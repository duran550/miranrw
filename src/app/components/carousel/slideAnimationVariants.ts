export const slideVariants = {
  hiddenRight: {
    opacity: '50',
  },
  hiddenLeft: {
    opacity: '50',
  },
  visible: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    transition: {
      duration: 0.2,
    },
  },
};
export const slidersVariants = {
  hover: {
    backgroundColor: '#ff00008e',
  },
};
export const dotsVariants = {
  initial: {
    y: 0,
  },
  animate: {
    y: -2,
    scale: 1,
    transition: { type: 'spring', stiffness: 1000, damping: '10' },
  },
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};
