import {
  COMPLETION_ASC,
  COMPLETION_DESC,
  CREATED_AT_ASC,
  CREATED_AT_DESC,
  LAST_EDITED_AT_ASC,
  LAST_EDITED_AT_DESC
} from 'app/constants';

export const sortTaskerItems = (entities, sortingOrder, completionTable) => (
  a,
  b
) => {
  const itemA = entities[a];
  const itemB = entities[b];
  const sortByCompletion = sortByCompletionFn(sortingOrder, completionTable);

  switch (sortingOrder) {
    case CREATED_AT_ASC:
      return new Date(itemB.createdAt) - new Date(itemA.createdAt);
    case CREATED_AT_DESC:
      return new Date(itemA.createdAt) - new Date(itemB.createdAt);
    case LAST_EDITED_AT_ASC:
      return new Date(itemB.lastEditedAt) - new Date(itemA.lastEditedAt);
    case LAST_EDITED_AT_DESC:
      return new Date(itemA.lastEditedAt) - new Date(itemB.lastEditedAt);
    case COMPLETION_DESC:
      if (!itemA.isCheckedOff && !itemB.isCheckedOff) {
        return sortByCompletion(itemA, itemB);
      } else if (itemA.isCheckedOff) {
        return -1;
      } else if (itemB.isCheckedOff) {
        return 1;
      }
      return 0;
    case COMPLETION_ASC:
      if (!itemA.isCheckedOff && !itemB.isCheckedOff) {
        return sortByCompletion(itemA, itemB);
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

const sortByCompletionFn = (order, completionTable) => (itemA, itemB) => {
  const itemADeviceCount = itemA.devices?.length ?? 0;
  const itemBDeviceCount = itemB.devices?.length ?? 0;
  const completionA = completionTable[itemA.id];
  const completionB = completionTable[itemB.id];
  if (order === COMPLETION_DESC) {
    if (completionB === completionA) {
      return itemADeviceCount - itemBDeviceCount;
    } else {
      return completionB - completionA;
    }
  } else if (order === COMPLETION_ASC) {
    if (completionB === completionA) {
      return itemBDeviceCount - itemADeviceCount;
    } else {
      return completionA - completionB;
    }
  }
  return 0;
};
