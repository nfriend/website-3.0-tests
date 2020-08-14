/**
 * An Promise version of setTimeout
 * @param {Number} ms The number of milliseconds to wait
 */
const timeout = async (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

module.exports = { timeout };
