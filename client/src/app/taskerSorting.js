const calcCompletion = byDevice => item => {
  const { devices, id, name } = item;
  if (devices) {
    console.log(
      `name: ${name} completion: ${
        devices.filter(deviceId => byDevice[deviceId][id]).length /
        devices.length
      }`
    );
    return (
      devices.filter(deviceId => byDevice[deviceId][id]).length / devices.length
    );
  } else {
    return 0;
  }
};

export const sortTaskerItems = (entities, sortingOrder, byDevice) => (a, b) => {
  const itemA = entities[a];
  const itemB = entities[b];
  const completion = calcCompletion(byDevice);
  switch (sortingOrder) {
    case 'created_at_asc':
      return new Date(itemB.createdAt) - new Date(itemA.createdAt);
    case 'created_at_desc':
      return new Date(itemA.createdAt) - new Date(itemB.createdAt);
    case 'edited_at_asc':
      return new Date(itemB.lastEditedAt) - new Date(itemA.lastEditedAt);
    case 'edited_at_desc':
      return new Date(itemA.lastEditedAt) - new Date(itemB.lastEditedAt);
    case 'completion_desc':
      if (!itemA.isCheckedOff && !itemB.isCheckedOff) {
        return completion(itemB) - completion(itemA);
      } else if (itemA.isCheckedOff) {
        return -1;
      } else if (itemB.isCheckedOff) {
        return 1;
      }
      return 0;
    case 'completion_asc':
      if (!itemA.isCheckedOff && !itemB.isCheckedOff) {
        return completion(itemA) - completion(itemB);
      } else if (itemA.isCheckedOff) {
        return 1;
      } else if (itemB.isCheckedOff) {
        return -1;
      }
      return 0;
    default:
      return 0;
  }
};
