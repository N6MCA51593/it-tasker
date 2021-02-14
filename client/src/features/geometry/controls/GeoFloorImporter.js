import { selectActiveFloor, selectAllFloorItemsSorted } from 'app/selectors';
import { importFromFloor } from 'features/geometry/walls/wallSlice';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const GeoFloorImporter = button => {
  const [isShowing, setIsShowing] = useState(false);
  const dispatch = useDispatch();
  const floors = useSelector(selectAllFloorItemsSorted);
  const activeFloor = useSelector(selectActiveFloor);
  const walls = useSelector(state => state.walls.entities);
  const floorsFiltered = floors.filter(floor => floor.id !== activeFloor);
  console.log(button);

  return (
    <Fragment>
      {button.render(() => setIsShowing(!isShowing))}
      {isShowing && (
        <div className='controls-floor-list geo-import'>
          {floorsFiltered.map(floor => (
            <div
              key={floor.id}
              onClick={() => {
                dispatch(
                  importFromFloor({
                    payload: {
                      walls: Object.values(walls).filter(
                        wall => wall.floor === floor.id
                      ),
                      newFloor: activeFloor
                    }
                  })
                );
                setIsShowing(false);
              }}
            >
              {floor.shortName ? floor.shortName : floor.name}
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default GeoFloorImporter;
