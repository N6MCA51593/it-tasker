import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const areasAdapter = createEntityAdapter();
const initialState = areasAdapter.getInitialState({
  activeArea: null,
  toRedraw: null,
  mode: 'draw'
});

function polygonCentroid(pts) {
  pts = pts.map(e => {
    return { x: parseInt(e.split(',')[0]), y: parseInt(e.split(',')[1]) };
  });
  let first = pts[0],
    last = pts[pts.length - 1];
  if (first.x != last.x || first.y != last.y) pts.push(first);
  let twicearea = 0,
    x = 0,
    y = 0,
    nPts = pts.length,
    p1,
    p2,
    f;
  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = pts[i];
    p2 = pts[j];
    f =
      (p1.y - first.y) * (p2.x - first.x) - (p2.y - first.y) * (p1.x - first.x);
    twicearea += f;
    x += (p1.x + p2.x - 2 * first.x) * f;
    y += (p1.y + p2.y - 2 * first.y) * f;
  }
  f = twicearea * 3;
  return { x: x / f + first.x, y: y / f + first.y };
}

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    addArea: {
      reducer(state, { payload }) {
        const { point } = payload;
        if (state.activeArea) {
          let points = state.entities[state.activeArea].points;
          points.splice(points.length - 1, 1, point, point);
        } else {
          const points = [point, point];
          if (state.toRedraw) {
            state.activeArea = state.toRedraw;
            state.entities[state.toRedraw].points = points;
            state.toRedraw = null;
          } else {
            areasAdapter.addOne(state, {
              id: payload.id,
              points,
              name: `Area ${state.ids.length + 1}`
            });
            state.activeArea = payload.id;
          }
        }
      },
      prepare(point) {
        const id = nanoid();
        return {
          payload: { id, point }
        };
      }
    },
    updateActiveArea(state, { payload }) {
      state.entities[state.activeArea].points[
        state.entities[state.activeArea].points.length - 1
      ] = payload;
    },
    redrawArea(state, { payload }) {
      state.entities[payload].points = [];
      state.toRedraw = payload;
    },
    removeArea: areasAdapter.removeOne,
    saveArea(state) {
      state.entities[state.activeArea].points.pop();
      state.entities[state.activeArea].labelCoords = polygonCentroid(
        state.entities[state.activeArea].points
      );
      state.activeArea = null;
    }
  }
});

export const {
  setMode,
  addArea,
  updateActiveArea,
  saveArea,
  removeArea,
  redrawArea
} = areasSlice.actions;

export default areasSlice.reducer;
