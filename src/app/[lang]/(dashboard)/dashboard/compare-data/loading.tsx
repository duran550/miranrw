import { Spinner } from '@nextui-org/react';
import React from 'react';

const loading = () => {
  return (
    <div className="text-center text-2xl h-[70vh] flex place-items-center w-full justify-center">
      {/* <p>chargement patientez...</p> */}
      <Spinner label="Loading . . . " color="primary" size="lg" />
    </div>
  );
};

export default loading;
