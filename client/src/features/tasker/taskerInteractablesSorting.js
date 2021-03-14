import {
  COMPLETION_ASC,
  COMPLETION_DESC,
  CREATED_AT_ASC,
  CREATED_AT_DESC,
  DEVICE_COUNT_ASC,
  DEVICE_COUNT_DESC
} from 'app/constants';

export const sortTaskerInteractables = (
  activeItem,
  byDevice,
  interactables,
  deviceEnts
) => sortingOrder => (a, b) => {
  const isArea = !!interactables.devicesByArea[a];
  const { getDateComp, getCompletionComp, getDeviceCountComp } = helperFns(
    activeItem,
    sortingOrder,
    byDevice,
    interactables,
    isArea,
    deviceEnts
  );
  switch (sortingOrder) {
    case CREATED_AT_ASC:
    case CREATED_AT_DESC:
      return getDateComp(a, b);
    case COMPLETION_ASC:
    case COMPLETION_DESC:
      return getCompletionComp(a, b);
    case DEVICE_COUNT_ASC:
    case DEVICE_COUNT_DESC:
      return getDeviceCountComp(a, b);
    default:
      return 0;
  }
};

const helperFns = (
  activeItem,
  sortingOrder,
  byDevice,
  interactables,
  isArea,
  deviceEnts
) => {
  const { id } = activeItem;
  const getDate = item => {
    if (isArea) {
      return new Date(
        Math.min(
          ...interactables.devicesByArea[item].map(
            device => new Date(byDevice[device][id].addedAt)
          )
        )
      );
    } else {
      return new Date(byDevice[item][id].addedAt);
    }
  };

  const getDateComp = (a, b) => {
    const dateA = getDate(a);
    const dateB = getDate(b);
    if (!isArea && dateA.valueOf() === dateB.valueOf()) {
      const nameA = deviceEnts[a].name;
      const nameB = deviceEnts[b].name;
      return sortingOrder === CREATED_AT_ASC
        ? compStrings(nameB, nameA)
        : compStrings(nameA, nameB);
    } else {
      return sortingOrder === CREATED_AT_ASC ? dateB - dateA : dateA - dateB;
    }
  };

  const getCompletionValue = item => {
    if (isArea) {
      const areaDevices = interactables.devicesByArea[item];
      return (
        areaDevices.filter(deviceId => byDevice[deviceId][id].isCheckedOff)
          .length / areaDevices.length
      );
    } else {
      return byDevice[item][id].isCheckedOff;
    }
  };

  const getCompletionComp = (a, b) => {
    const completionA = getCompletionValue(a);
    const completionB = getCompletionValue(b);
    if (completionA === completionB) {
      const dateA = getDate(a);
      const dateB = getDate(b);
      return dateA.valueOf() === dateB.valueOf() ? a - b : dateA - dateB;
    } else {
      return sortingOrder === COMPLETION_DESC
        ? completionB - completionA
        : completionA - completionB;
    }
  };

  const getDeviceCountComp = (a, b) => {
    const deviceCountA = interactables.devicesByArea[a].length;
    const deviceCountB = interactables.devicesByArea[b].length;
    if (deviceCountA === deviceCountB) {
      const dateA = getDate(a);
      const dateB = getDate(b);
      return dateA.valueOf() === dateB.valueOf() ? a - b : dateA - dateB;
    } else {
      return sortingOrder === DEVICE_COUNT_DESC
        ? deviceCountB - deviceCountA
        : deviceCountA - deviceCountB;
    }
  };

  const compStrings = (a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    }

    return 0;
  };
  return {
    getCompletionValue,
    getCompletionComp,
    getDeviceCountComp,
    getDateComp
  };
};
