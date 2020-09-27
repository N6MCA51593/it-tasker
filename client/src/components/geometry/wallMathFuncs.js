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
