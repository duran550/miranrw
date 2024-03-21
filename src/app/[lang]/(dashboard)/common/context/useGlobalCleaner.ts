import { useState } from 'react';

export const useGlobalCleaner = () => {
  const [myCleanerState, setMyCleanerState] = useState<string>('Initial Value');

  return { myCleanerState, setMyCleanerState };
};
