//
// generic empty check on various types
//

module.exports = function(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'string' && value.trim().length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};
