export const getProperty = (val, properties) =>
  properties?.find((property) => property.key === val)?.value;
