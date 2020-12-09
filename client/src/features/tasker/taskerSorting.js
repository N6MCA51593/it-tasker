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
        return completionTable[itemB.id] - completionTable[itemA.id];
      } else if (itemA.isCheckedOff) {
        return -1;
      } else if (itemB.isCheckedOff) {
        return 1;
      }
      return 0;
    case COMPLETION_ASC:
      if (!itemA.isCheckedOff && !itemB.isCheckedOff) {
        return completionTable[itemA.id] - completionTable[itemB.id];
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
