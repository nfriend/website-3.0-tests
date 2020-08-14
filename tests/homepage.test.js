describe('https://nathanfriend.io', () => {
  beforeAll(async () => {
    await page.goto('https://nathanfriend.io');
  });

  it('should be titled "Nathan friend"', async () => {
    await expect(page.title()).resolves.toMatch('Nathan Friend');
  });
});
