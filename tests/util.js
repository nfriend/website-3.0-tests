/**
 * An Promise version of setTimeout
 * @param {Number} ms The number of milliseconds to wait
 */
const timeout = async (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const getElementText = async (selector) =>
  await page.$eval(selector, (el) => el.textContent);

const expectElementToExist = async (selector) =>
  expect(await page.$(selector)).toBeTruthy();

const expectElementNotToBeEmpty = async (selector) => {
  const elementContent = await getElementText(selector);
  expect(elementContent.trim().length).toBeGreaterThan(0);
};

module.exports = {
  timeout,
  getElementText,
  expectElementToExist,
  expectElementNotToBeEmpty,
};
