import React from 'react';

const useReduceMotion: () => boolean = () => {
  const [matches, setMatch] = React.useState(true);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      setMatch(mq.matches);
    };
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => {
      mq.removeEventListener('change', handleChange);
    };
  }, []);
  return matches;
};

export default useReduceMotion;
