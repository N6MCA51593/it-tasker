import { useState } from 'react';

const usePan = zoom => {
  const [panVLvl, setPanVLvl] = useState(0);
  const [panHLvl, setPanHLvl] = useState(0);
  const step = 50;

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + step * steps * zoom);
  };
  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + step * steps * zoom);
  };

  return { panVLvl, panHLvl, panV, panH };
};

export default usePan;
