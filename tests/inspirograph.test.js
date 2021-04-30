const { getElementText, expectElementToExist } = require('./util');

describe('Inspiral Web', () => {
  let response;

  describe('main page', () => {
    beforeAll(async () => {
      response = await page.goto('https://nathanfriend.io/inspiral-web');
    });

    it('returns a 200', () => {
      expect(response.status()).toBe(200);
    });

    it('renders a gear', async () => {
      await expectElementToExist('.gear.ring-gear path');
    });
  });

  describe('gallery', () => {
    beforeAll(async () => {
      response = await page.goto(
        'https://nathanfriend.io/inspiral-web/gallery',
      );

      await page.waitForSelector('.image-thumbnail');
    });

    it('returns a 200', () => {
      expect(response.status()).toBe(200);
    });

    it('renders 72 gallery images', async () => {
      const imageCount = await page.$$eval(
        '.image-thumbnail',
        (images) => images.length,
      );

      expect(imageCount).toBe(72);
    });

    it('renders a pagination', async () => {
      const pageCount = await getElementText('.ellipsis-container + div');

      expect(parseInt(pageCount, 10)).toBeGreaterThan(3500);
    });
  });
});
