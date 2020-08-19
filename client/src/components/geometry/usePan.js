import { useState } from 'react';

const usePan = () => {
  const [panVLvl, setPanVLvl] = useState(0);
  const [panHLvl, setPanHLvl] = useState(0);
  const step = 40;

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + step * steps);
  };
  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + step * steps);
  };

  return { panVLvl, panHLvl, panV, panH };
};

export default usePan;
