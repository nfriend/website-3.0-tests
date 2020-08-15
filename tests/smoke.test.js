const { timeout, getElementText } = require('./util');
const axios = require('axios').default;

describe('Smoke tests', () => {
  beforeEach(async () => {
    // Wait between each test to avoid pegging the server
    // Note: this is addition to the global timeout
    // specified in setup.js
    await timeout(1000);
  });

  describe('web pages', () => {
    it.each`
      url                                                | title                                | selector                           | text
      ${'https://nathanfriend.io'}                       | ${'Nathan Friend'}                   | ${'h1'}                            | ${'Nathan Friend'}
      ${'https://nathanfriend.io/about-me'}              | ${'About Me'}                        | ${'.content-section h1'}           | ${'About Me'}
      ${'https://nathanfriend.io/projects'}              | ${'Projects'}                        | ${'.content-section h1'}           | ${'Projects'}
      ${'https://nathanfriend.io/all-posts'}             | ${'Nathan Friend'}                   | ${'.content-section h1'}           | ${'Blog'}
      ${'https://nathanfriend.io/gitlab-contributions'}  | ${'My GitLab Contributions in a 🥜'} | ${'.content-section h1'}           | ${'My GitLab Contributions in a 🥜'}
      ${'https://nathanfriend.io/attributions'}          | ${'Attributions'}                    | ${'.content-section h1'}           | ${'Attributions'}
      ${'https://nathanfriend.io/inspirograph/'}         | ${'Inspirograph'}                    | ${'.gear-label'}                   | ${'24'}
      ${'https://nathanfriend.io/inspirograph/gallery/'} | ${'Inspirograph'}                    | ${'.pagination-link'}              | ${'Previous'}
      ${'https://nathanfriend.io/roggle/'}               | ${'Roggle'}                          | ${'h1'}                            | ${'Roggle'}
      ${'https://nathanfriend.io/cooltojs/'}             | ${'CoolToJS'}                        | ${'h1'}                            | ${'CoolToJS'}
      ${'https://nathanfriend.io/theremin/'}             | ${'Theremin'}                        | ${'h1'}                            | ${'Theremin'}
      ${'https://nathanfriend.io/origins/'}              | ${'Nathan Friend: Origins'}          | ${'#origins-overlay > div'}        | ${'Use the arrow keys And ENTER to select a file to run:'}
      ${'https://nathanfriend.io/webgl-chess/'}          | ${'WebGL Chess'}                     | ${'canvas'}                        | ${''}
      ${'https://nathanfriend.io/nfjs/'}                 | ${'NF.js Demo'}                      | ${'h1'}                            | ${'todo'}
      ${'https://nathanfriend.io/mandelbrot/'}           | ${'CMSC 305 Project 1: Fractals'}    | ${'.modal-header h3'}              | ${'Welcome!'}
      ${'https://nathanfriend.io/rook/'}                 | ${'Rook!'}                           | ${'#playername_button'}            | ${'Enter!'}
      ${'https://nathanfriend.io/ahholyjesus/'}          | ${'Ah, Holy Jesus'}                  | ${'#lyrics-container p'}           | ${'Ah, Holy Jesus'}
      ${'https://nathanfriend.io/site_archive/'}         | ${'Site Archive'}                    | ${'h1'}                            | ${'The History of nathanfriend.io'}
      ${'https://nathanfriend.io/WordCloud/'}            | ${'SoyRIM Word Cloud'}               | ${'#soybean-container > canvas'}   | ${''}
      ${'https://nathanfriend.io/wedding/'}              | ${'Bethany and Nathan'}              | ${'.title-container'}              | ${'BETHANYandNATHAN'}
      ${'https://nathanfriend.io/speller/'}              | ${'Speller'}                         | ${'h2'}                            | ${'Speller'}
      ${'https://nathanfriend.io/portfolio/'}            | ${'Portfolio'}                       | ${'.portfolio-content > p > span'} | ${'Welcome.'}
      ${'https://nathanfriend.io/NodeChat/'}             | ${'NodeChat'}                        | ${'.modal-header'}                 | ${'Welcome to NodeChat'}
      ${'https://nathanfriend.io/battleship/'}           | ${'Battleship'}                      | ${'#grid .cell[title="alpha"]'}    | ${'A'}
      ${'https://nathanfriend.io/rookkeeper/'}           | ${'Rookkeeper'}                      | ${'h1'}                            | ${'Rookkeeper'}
    `(
      '$url returns a 200, has a page title of $title, and includes a $selector content with the text $text',
      async ({ url, title, selector, text: expectedText }) => {
        const response = await page.goto(url);

        expect(response.status()).toBe(200);

        expect(await page.title()).toBe(title);

        await page.waitForSelector(selector);

        const elementText = (await getElementText(selector)).trim();
        expect(elementText).toBe(expectedText);
      },
    );
  });

  describe('files', () => {
    it.each`
      url
      ${'https://nathanfriend.io/battleship.pdf'}
      ${'https://nathanfriend.io/LegoGitLabTanukiInstructions.pdf'}
      ${'https://nathanfriend.io/skills/stuff-ryan-says/hey.mp3'}
      ${'https://nathanfriend.io/skills/tone-drone/A4.mp3'}
    `('$url returns a 200', async ({ url }) => {
      const response = await axios.get(url);

      expect(response.status).toBe(200);
    });
  });
});
