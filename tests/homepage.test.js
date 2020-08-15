const {
  getElementText,
  expectElementNotToBeEmpty,
  expectElementToExist,
} = require('./util');

describe('https://nathanfriend.io', () => {
  describe('homepage content', () => {
    let response;

    beforeAll(async () => {
      response = await page.goto('https://nathanfriend.io');
    });

    it('returns a 200 HTTP status code', async () => {
      expect(response.status()).toBe(200);
    });

    it('has the correct title', async () => {
      expect(await page.title()).toBe('Nathan Friend');
    });

    it('has the correct header', async () => {
      expect(await getElementText('h1')).toBe('Nathan Friend');
    });

    it('has summary text', async () => {
      await expectElementNotToBeEmpty('.site-description');
    });

    it('has a GitLab corner', async () => {
      await expectElementToExist('.gitlab-corner');
    });

    describe('sidebar links', () => {
      it.each`
        display       | url
        ${'About Me'} | ${'/about-me'}
        ${'Projects'} | ${'/projects'}
        ${'Blog'}     | ${'/all-posts'}
      `(
        'has a "$display" link that points to $url',
        async ({ display, url }) => {
          const linkText = await getElementText(
            `.sidebar-links-container a[href="${url}"]`,
          );

          expect(linkText).toBe(display);
        },
      );
    });

    describe('contact links', () => {
      it.each`
        tooltip                            | url
        ${'Email: hello@nathanfriend.io'}  | ${'mailto:hello@nathanfriend.io'}
        ${'GitLab: nfriend'}               | ${'https://gitlab.com/nfriend'}
        ${'GitHub: nfriend'}               | ${'https://github.com/nfriend'}
        ${'LinkedIn: nfriend'}             | ${'https://www.linkedin.com/in/nfriend/'}
        ${'Stack Overflow: nathan-friend'} | ${'https://stackoverflow.com/users/1063392/nathan-friend'}
        ${'Twitter: NathanAFriend'}        | ${'https://twitter.com/NathanAFriend'}
        ${'Facebook: nathan.friend'}       | ${'https://www.facebook.com/nathan.friend'}
      `(
        'has a contact link with a tooltip of "$tooltip" that points to $url',
        async ({ tooltip: expectedTooltip, url }) => {
          const actualTooltip = await page.$eval(
            `.profile-links-container a[href="${url}"]`,
            (el) => el.dataset.originalTitle,
          );

          expect(actualTooltip).toBe(expectedTooltip);
        },
      );
    });

    describe('content section', () => {
      it("has the article's title, rendered as a link", async () => {
        await expectElementNotToBeEmpty('.content-section a h1');
      });

      it("has the article's date and approximate reading time", async () => {
        const articleDateAndLength = await getElementText(
          '.content-section > p',
        );

        // Should look something like "November 16, 2018 | 2 minutes to read"
        const regex = /[a-z]+ \d{1,2}, 20\d{2}\s+\|\s+.*to read/i;
        expect(articleDateAndLength).toMatch(regex);
      });

      it("has the article's content", async () => {
        await expectElementNotToBeEmpty('.content-section .content-container');
      });
    });

    it('has a search bar', async () => {
      await expectElementToExist('#footer-search-bar');
    });

    it('has a copyright info', async () => {
      const copyrightText = await getElementText('#legal');
      expect(copyrightText).toContain('Copyright Nathan Friend © 2012');
    });

    it('has a link to the "Attributions" pag', async () => {
      const attributionsLinkText = await getElementText(
        `#legal a[href="/attributions"]`,
      );

      expect(attributionsLinkText).toBe('Attributions');
    });

    describe('404 behavior', () => {
      it("has the article's title, rendered as a link", async () => {
        await expectElementNotToBeEmpty('.content-section a h1');
      });

      it("has the article's date and approximate reading time", async () => {
        const articleDateAndLength = await getElementText(
          '.content-section > p',
        );

        // Should look something like "November 16, 2018 | 2 minutes to read"
        const regex = /[a-z]+ \d{1,2}, 20\d{2}\s+\|\s+.*to read/i;
        expect(articleDateAndLength).toMatch(regex);
      });

      it("has the article's content", async () => {
        await expectElementNotToBeEmpty('.content-section .content-container');
      });
    });
  });

  describe('404 behavior', () => {
    let response;

    beforeAll(async () => {
      response = await page.goto('https://nathanfriend.io/not-a-real-page');
    });

    it('returns a 404 HTTP status code', async () => {
      expect(response.status()).toBe(404);
    });

    it('has 404 in the title', async () => {
      expect(await page.title()).toBe('404');
    });

    it('has a 404 header', async () => {
      expect(await getElementText('.content-section h1')).toBe('404');
    });
  });
});
