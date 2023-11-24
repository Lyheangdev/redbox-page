/**
 *
 * @param obj
 * @returns as an object in the form of camel case
 */

export function convertToCamelCase (obj: any){
  const keys = Object.keys(obj);
  const camelCaseObj: any = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const words = key.split("_");
    let camelCaseKey = words[0];

    for (let j = 1; j < words.length; j++) {
      const capitalizedWord =
        words[j].charAt(0).toUpperCase() + words[j].slice(1);
      camelCaseKey += capitalizedWord;
    }

    camelCaseObj[camelCaseKey] = obj[key];
  }

  return camelCaseObj;
};


