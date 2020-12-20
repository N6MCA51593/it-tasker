import { useCallback } from 'react';

const useCoordinates = ({
  isGrid,
  gridStep,
  zoomLvl,
  panHLvl,
  panVLvl,
  ref
}) => {
  const findClosestNode = (x, y, gridStep) => {
    const diff = gridStep / 4;
    const divX = Math.trunc(x / gridStep) * gridStep;
    const divY = Math.trunc(y / gridStep) * gridStep;
    const nodes = [
      [divX, divY],
      [divX + gridStep, divY],
      [divX - gridStep, divY],
      [divX, divY + gridStep],
      [divX, divY - gridStep],
      [divX + gridStep, divY + gridStep],
      [divX - gridStep, divY - gridStep],
      [divX + gridStep, divY - gridStep],
      [divX - gridStep, divY + gridStep]
    ];

    for (const node of nodes) {
      if (
        Math.sqrt(Math.pow(node[0] - x, 2) + Math.pow(node[1] - y, 2)) <= diff
      ) {
        return { x: Math.round(node[0]), y: Math.round(node[1]) };
      }
    }

    return { x, y };
  };

  const getRelCoord = useCallback(
    (e, checkGrid = false) => {
      const boundingRect = ref.current.getBoundingClientRect();
      const x = Math.round((e.clientX - boundingRect.left) * zoomLvl + panHLvl);
      const y = Math.round((e.clientY - boundingRect.top) * zoomLvl + panVLvl);

      if (isGrid && checkGrid) {
        return findClosestNode(x, y, gridStep);
      } else {
        return { x, y };
      }
    },
    [gridStep, isGrid, panHLvl, panVLvl, ref, zoomLvl]
  );
  return { getRelCoord };
};

export default useCoordinates;
