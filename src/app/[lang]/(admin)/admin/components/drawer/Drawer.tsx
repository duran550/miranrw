'use client';
import React, { ReactNode, useState } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import { SHOW_DRAWER } from '../../context/constants';
import { motion } from 'framer-motion';

type DrawerProps = {
  children: ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const { showDrawer, dispatch } = useDrawer();

  return showDrawer ? (
    <div className=" backdrop-blur  top-0 right-0 absolute w-full h-screen z-10">
      <motion.div
        exit={{ opacity: 0, x: 100 }}
        className="w-2/3 flex justify-center items-center p-8 md:w-3/12 ml-auto h-full bg-white relative"
      >
        <div
          onClick={() => dispatch({ type: SHOW_DRAWER, payload: '' })}
          className="absolute underline right-8 cursor-pointer hover:text-red-700 top-8"
        >
          Close
        </div>
        <div className="bg-red-200">{children}</div>
      </motion.div>
    </div>
  ) : (
    ''
  );
};

export default Drawer;
