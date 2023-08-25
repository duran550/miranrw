'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import NavItem from '../nav-item/NavItem';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import FadinOutAnimation from '@/app/components/fade-in-out-animation/FadeInOutAnimation';
import { useClickOutside } from '@/app/hooks/useClickOutside';

const Profile = () => {
  const [toggle, setToggle] = useState(false);

  const wrapperRef = useRef<HTMLInputElement>(null);

  useClickOutside(wrapperRef, () => {
    setToggle(false);
  });

  return (
    <div className="flex  flex-col items-center relative">
      <AnimateClick>
        <Image
          onClick={() => setToggle(!toggle)}
          src={''}
          className="shadow-md bg-white p-1 w-10 h-10 rounded-full"
          alt="Profile"
        />
      </AnimateClick>
      {toggle ? (
        <FadinOutAnimation>
          <div
            ref={wrapperRef}
            className="flex flex-col bg-white shadow-lg p-4 right-0 top-12 absolute rounded-md"
          >
            <div className="font-bold px-2 text-sm">Signed in as</div>
            <div className="text-sm px-2">John@doe.com</div>
            <div className="flex flex-col mt-2">
              <NavItem href={'/profile'}>My profile</NavItem>
              <NavItem href={'/Logout'}>Logout</NavItem>
            </div>
          </div>
        </FadinOutAnimation>
      ) : (
        ''
      )}
    </div>
  );
};

export default Profile;
