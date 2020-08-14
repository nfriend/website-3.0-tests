describe('DNS tests', () => {
  const NATHAN_FRIEND_IO = 'https://nathanfriend.io/';
  const WEDDING_WEBSITE = 'https://nathanfriend.io/wedding/';

  test.each`
    start                                 | end
    ${'nathanfriend.io'}                  | ${NATHAN_FRIEND_IO}
    ${'www.nathanfriend.io'}              | ${NATHAN_FRIEND_IO}
    ${'nathanfriend.com'}                 | ${NATHAN_FRIEND_IO}
    ${'www.nathanfriend.com'}             | ${NATHAN_FRIEND_IO}
    ${'bethany.and.nathanfriend.io'}      | ${WEDDING_WEBSITE}
    ${'www.bethany.and.nathanfriend.io'}  | ${WEDDING_WEBSITE}
    ${'bethany.and.nathanfriend.com'}     | ${WEDDING_WEBSITE}
    ${'www.bethany.and.nathanfriend.com'} | ${WEDDING_WEBSITE}
  `(
    'redirects a request to http(s)://$start to $end',
    async ({ start, end }) => {
      const protocols = ['http', 'https'];

      for (const p of protocols) {
        await page.goto(`${p}://${start}`);

        expect(page.url()).toBe(end);
      }
    },
  );
});
