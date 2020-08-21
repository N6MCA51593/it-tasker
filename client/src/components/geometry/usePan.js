import { useState } from 'react';

const usePan = zoom => {
  const [panVLvl, setPanVLvl] = useState(0);
  const [panVPos, setPanVPos] = useState(0);
  const [panHLvl, setPanHLvl] = useState(0);
  const [panHPos, setPanHPos] = useState(0);
  const step = 50;

  const panV = (steps = 1) => {
    setPanVLvl(panVLvl + step * steps * zoom);
    setPanVPos(panVPos + steps);
  };
  const panH = (steps = 1) => {
    setPanHLvl(panHLvl + step * steps * zoom);
    setPanHPos(panHPos + steps);
  };

  return { panVLvl, panVPos, panHLvl, panHPos, panV, panH };
};

export default usePan;
