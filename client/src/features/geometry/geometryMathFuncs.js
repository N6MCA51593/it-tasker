const isCornerFunc = (x, y, r, { x1, y1, x2, y2 }) => {
  if (Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)) <= r) {
    return { x: x1, y: y1 };
  } else if (Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2)) <= r) {
    return { x: x2, y: y2 };
  }
  return false;
};

export const findFarthestCorner = ({ x, y }, { x1, y1, x2, y2 }) => {
  if (
    Math.sqrt(Math.pow(x1 - x, 2) + Math.pow(y1 - y, 2)) >
    Math.sqrt(Math.pow(x2 - x, 2) + Math.pow(y2 - y, 2))
  ) {
    return { x1, y1 };
  } else {
    return { x2, y2 };
  }
};

export const findNearestPoint = (A, B, P, r, coords) => {
  const isCorner = isCornerFunc(P.x, P.y, r, coords);
  if (isCorner) {
    return isCorner;
  }

  const AB = {
    x: B.x - A.x,
    y: B.y - A.y
  };
  const k =
    ((P.x - A.x) * AB.x + (P.y - A.y) * AB.y) / (AB.x * AB.x + AB.y * AB.y);

  return {
    x: A.x + k * AB.x,
    y: A.y + k * AB.y
  };
};

export const polygonCentroid = pts => {
  pts = pts.map(e => {
    return { x: parseInt(e.split(',')[0]), y: parseInt(e.split(',')[1]) };
  });
  let first = pts[0],
    last = pts[pts.length - 1];
  if (first.x !== last.x || first.y !== last.y) pts.push(first);
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
  return { x: x / f + first.x - 20, y: y / f + first.y };
};
