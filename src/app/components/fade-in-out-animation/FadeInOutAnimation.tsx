'use client';
import React from 'react';

import { motion } from 'framer-motion';

const FadinOutAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div initial={{ x: 0, y: 0 }} animate={{ opacity: [0, 1] }}>
      {children}
    </motion.div>
  );
};

export default FadinOutAnimation;
