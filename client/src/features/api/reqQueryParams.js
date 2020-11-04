export const reqQueryParams = (toDelete, param) => {
  const reducer = (accum, cv, ci, arr) => {
    return ci === arr.length - 1 ? accum + cv : accum + cv + `&${param}=`;
  };

  const delQuery =
    toDelete.length > 0 ? toDelete.reduce(reducer, `${param}=`) : '';

  return delQuery;
};
