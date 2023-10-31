import { useCallback, useEffect } from 'react';

export const useScrollOnTop = () => {
  let scrollOnTopOnce = useCallback(() => {
    scrollTo(0, 0);
  }, []);

  useEffect(() => {
    scrollOnTopOnce();
  }, [scrollOnTopOnce]);
};
