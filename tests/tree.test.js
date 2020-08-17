const { getElementText } = require('./util');

describe('tree.nathanfriend.io', () => {
  let response;

  beforeAll(async () => {
    response = await page.goto('https://tree.nathanfriend.io');
  });

  it('returns a 200 HTTP status code', async () => {
    expect(response.status()).toBe(200);
  });

  it('renders the correct title', async () => {
    expect(await page.title()).toBe('Tree');
  });

  it('renders the correct header', async () => {
    expect(await getElementText('h1')).toBe('tree.nathanfriend.io');
  });

  it('formats the input into a tree diagram', async () => {
    const inputSelector = '.input textarea';

    await page.evaluate((inputSelector) => {
      document.querySelector(inputSelector).value = '';
    }, inputSelector);

    await page.type(inputSelector, 'Hello');
    await page.keyboard.press('Enter');
    await page.type(inputSelector, '  from');
    await page.keyboard.press('Enter');
    await page.type(inputSelector, '  GitLab');
    await page.keyboard.press('Enter');
    await page.type(inputSelector, 'CI!');

    const expectedOutput = `.
└── Hello/
    └── from/
        ├── GitLab
        └── CI!`;

    expect(await getElementText('.tree')).toBe(expectedOutput);
  });
});
