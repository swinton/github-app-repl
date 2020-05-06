const unpack = (o, handler) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.getOwnPropertyNames(o)) {
    handler(propName);
  }
};

module.exports.unpack = unpack;
