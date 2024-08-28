import React from 'react';
import { Button } from '@/app/components/button/Button';
import { clearFormCookies } from '@/cookies/cookies';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import { TwelvethStepProps } from './twelvethStep';
import { useRouter, usePathname } from 'next/navigation';
import AnimateClick from '@/app/components/animate-click/AnimateClick';
import forwardArrow from '@/../public/images/forwardarrow.svg'
import Image from 'next/image';
import { removeReportingPerson } from '@/cookies/cookies';

const TwelvethStepComponent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleClickButton = () => {
    clearFormCookies();
    window.location.href = '/' + pathname.split('/')[1] + '/about-us';
  };

  const redirectHome = () => {
    clearFormCookies();
    window.location.href = '/'
  }

  useScrollOnTop();
  return (
    <div className="">
      <div className=" py-4 rounded-lg">
        <div className="font-bold text-2xl">
        Vielen Dank für deine Meldung.
        </div>
        <div className="my-4">Hier gelangst Du zu unserer Seite mit Links zur Beratung.</div>
        <div className="">
          <div className='flex justify-between'>
            <AnimateClick>
              <Button onClick={() => handleClickButton()} className='w-fit h-10'>
                <span className='font-normal font-worksans'>
                  Verweisberatung
                </span>
              </Button>
            </AnimateClick>
            <AnimateClick>
              <Button onClick={() => redirectHome()} className='group w-fit h-10 bg-white bg-red text-red border-red-500 border-2 hover:bg-red-500'>
                {/* <Image src={forwardArrow} alt='forward arrow' className='w-8 mr-2'/> */}
                <span className='text-xs font-worksans text-red-500 font-bold group-hover:text-white'>Fertig</span>
              </Button>
            </AnimateClick>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwelvethStepComponent;
