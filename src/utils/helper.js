/**
 * function to get unique values for non-obj array
 * @param {*} list e.g. [1,2,2,3]
 * @returns e.g. [1,2,3]
 */
export const getUniqueArray = (list) => {
  return [...new Set(list)];
};

/**
 * function to get unique value for object array based on one special field
 * @param {*} list
 * @param {*} compareKey
 */
export const getUniqueObjArray = (list, compareKey) => {
  const map = new Map();
  let uniqueList = [];
  list.forEach((item) => {
    const isExist = map.has(item[compareKey]);
    if (!isExist) {
      map.set(item[compareKey], true);
      uniqueList = [...uniqueList, item];
    }
  });

  return uniqueList;
};
