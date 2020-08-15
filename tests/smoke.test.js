const { timeout, getElementText } = require('./util');

describe('Smoke tests', () => {
  it.each`
    url                                                | title                                | selector                    | text
    ${'https://nathanfriend.io'}                       | ${'Nathan Friend'}                   | ${'h1'}                     | ${'Nathan Friend'}
    ${'https://nathanfriend.io/about-me'}              | ${'About Me'}                        | ${'.content-section h1'}    | ${'About Me'}
    ${'https://nathanfriend.io/projects'}              | ${'Projects'}                        | ${'.content-section h1'}    | ${'Projects'}
    ${'https://nathanfriend.io/all-posts'}             | ${'Nathan Friend'}                   | ${'.content-section h1'}    | ${'Blog'}
    ${'https://nathanfriend.io/gitlab-contributions'}  | ${'My GitLab Contributions in a 🥜'} | ${'.content-section h1'}    | ${'My GitLab Contributions in a 🥜'}
    ${'https://nathanfriend.io/attributions'}          | ${'Attributions'}                    | ${'.content-section h1'}    | ${'Attributions'}
    ${'https://nathanfriend.io/inspirograph/'}         | ${'Inspirograph'}                    | ${'.gear-label'}            | ${'24'}
    ${'https://nathanfriend.io/inspirograph/gallery/'} | ${'Inspirograph'}                    | ${'.pagination-link'}       | ${'Previous'}
    ${'https://nathanfriend.io/roggle/'}               | ${'Roggle'}                          | ${'h1'}                     | ${'Roggle'}
    ${'https://nathanfriend.io/cooltojs/'}             | ${'CoolToJS'}                        | ${'h1'}                     | ${'CoolToJS'}
    ${'https://nathanfriend.io/theremin/'}             | ${'Theremin'}                        | ${'h1'}                     | ${'Theremin'}
    ${'https://nathanfriend.io/origins/'}              | ${'Nathan Friend: Origins'}          | ${'#origins-overlay > div'} | ${'Use the arrow keys And ENTER to select a file to run:'}
    ${'https://nathanfriend.io/webgl-chess/'}          | ${'WebGL Chess'}                     | ${'canvas'}                 | ${''}
    ${'https://nathanfriend.io/nfjs/'}                 | ${'NF.js Demo'}                      | ${'h1'}                     | ${'todo'}
    ${'https://nathanfriend.io/mandelbrot/'}           | ${'CMSC 305 Project 1: Fractals'}    | ${'.modal-header h3'}       | ${'Welcome!'}
    ${'https://nathanfriend.io/rook/'}                 | ${'Rook!'}                           | ${'#playername_button'}     | ${'Enter!'}
    ${'https://nathanfriend.io/ahholyjesus/'}          | ${'Ah, Holy Jesus'}                  | ${'#lyrics-container p'}    | ${'Ah, Holy Jesus'}
    ${'https://nathanfriend.io/site_archive/'}         | ${'Site Archive'}                    | ${'h1'}                     | ${'The History of nathanfriend.io'}
  `(
    '$url returns a 200, has a page title of $title, and includes a $selector content with the text $text',
    async ({ url, title, selector, text: expectedText }) => {
      const response = await page.goto(url);

      expect(response.status()).toBe(200);

      expect(await page.title()).toBe(title);

      await page.waitForSelector(selector);

      const elementText = (await getElementText(selector)).trim();
      expect(elementText).toBe(expectedText);

      // Wait between each test to avoid pegging the server
      // Note: this is addition to the global timeout
      // specified in setup.js
      await timeout(1000);
    },
  );
});
