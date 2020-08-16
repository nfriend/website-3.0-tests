const { timeout, getElementText } = require('./util');

/**
 * Currently skipping these tests since they occasionally
 * cause an error in the console like:
 * "DOMException: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD"
 * ... which causes the tests to fail.
 */
describe.skip('Roggle', () => {
  let response;

  /**
   * Test if two arrays contain the same values
   * @param {Array} arr1 Array #1
   * @param {Array} arr2 Array #2
   */
  const arraysContainSameValues = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;
  };

  /**
   * Gets the 16 letters of the game board.
   * Automatically waits until the letters
   * have stopped "spinning".
   * @param {Array} previousLetters Used for internal recursion
   */
  const getLetters = async (previousLetters = null) => {
    const selector = '.roggle-die';

    await page.waitForSelector(selector);

    const letters = await page.$$eval(selector, (dice) =>
      dice.map((d) => d.textContent),
    );

    if (previousLetters && arraysContainSameValues(previousLetters, letters)) {
      return letters;
    } else {
      await timeout(250);

      return getLetters(letters);
    }
  };

  beforeAll(async () => {
    response = await page.goto('https://nathanfriend.io/roggle');
  });

  it('returns a 200', () => {
    expect(response.status()).toBe(200);
  });

  it('renders a random game board', async () => {
    const letters = await getLetters();
    expect(letters).toHaveLength(16);
  });

  it('renders a URL for sharing', async () => {
    expect(await getElementText('.share-link')).toBe(page.url());
  });

  it('shows the same game board on another page with the same URL', async () => {
    const board1Letters = await getLetters();

    await page.goto(page.url());

    const board2Letters = await getLetters();

    expect(board1Letters).toEqual(board2Letters);
  });
});
