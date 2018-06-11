export const convertToObject = (errors) => {
  return Object.keys(errors)
    .reduce((object, key) => {
      object[key] = errors[key][0];
      return object;
    }, {});
};
