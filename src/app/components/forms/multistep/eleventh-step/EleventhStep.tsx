import React from 'react';
import { Button } from '@/app/components/button/Button';
import { clearFormCookies } from '@/cookies/cookies';

const EleventhStep = () => {
  const handleClickButton = () => {
    clearFormCookies();
    window?.location?.reload();
  };
  return (
    <div className="h-96">
      <div className="border border-primaryColor p-8 rounded-lg">
        <div className="font-bold text-2xl">Vielen Dank für deine Meldung.</div>
        <div className="my-4">
          Hier gelangst Du zu unserer Seite mit Links zur Beratung.
        </div>
        <div className="max-w-xs">
          <Button onClick={() => handleClickButton()}>Verweisberatung</Button>
        </div>
      </div>
    </div>
  );
};

export default EleventhStep;
