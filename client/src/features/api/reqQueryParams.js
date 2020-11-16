export const reqQueryParams = (arr, param) => {
  const reducer = (accum, cv, ci, arr) => {
    return ci === arr.length - 1 ? accum + cv : accum + cv + `&${param}=`;
  };

  const query = arr.length > 0 ? arr.reduce(reducer, `${param}=`) : '';

  return query;
};
