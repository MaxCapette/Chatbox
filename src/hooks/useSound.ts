import { useEffect, useRef } from 'react';

const useSound = (sound: string, dependance) => {
  const myAudioRef = useRef(new Audio(sound));
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      myAudioRef.current.play();
    } else {
      isFirstRender.current = false;
    }
  }, [dependance]);
};

export default useSound;
