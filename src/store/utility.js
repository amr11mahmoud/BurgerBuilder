const updateObject = (oldObject, UpdatedProperties) => {
  return {
    ...oldObject,
    ...UpdatedProperties,
  };
};

export default updateObject;
