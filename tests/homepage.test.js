describe('https://nathanfriend.io', () => {
  beforeAll(async () => {
    await page.goto('https://nathanfriend.io');
  });

  it('has the correct title', async () => {
    const title = await page.title();
    expect(title).toBe('Nathan Friend');
  });

  it('has the correct header', async () => {
    const headerText = await page.$eval('h1', (el) => el.textContent);
    expect(headerText).toBe('Nathan Friend');
  });

  it('has summary text', async () => {
    const summary = (
      await page.$eval('.site-description', (el) => el.textContent)
    ).trim();
    expect(summary.length).toBeGreaterThan(0);
  });

  it('has a GitLab corner', async () => {
    const gitlabCorner = await page.$('.gitlab-corner');
    expect(gitlabCorner).toBeTruthy();
  });

  describe('sidebar links', () => {
    it.each`
      display       | url
      ${'About Me'} | ${'/about-me'}
      ${'Projects'} | ${'/projects'}
      ${'Blog'}     | ${'/all-posts'}
    `('has a "$display" link that points to $url', async ({ display, url }) => {
      const linkText = await page.$eval(
        `.sidebar-links-container a[href="${url}"]`,
        (el) => el.textContent,
      );

      expect(linkText).toBe(display);
    });
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

  it('has a search bar', async () => {
    const searchBar = await page.$('#footer-search-bar');
    expect(searchBar).toBeTruthy();
  });

  it('has a copyright info', async () => {
    const copyrightText = await page.$eval('#legal', (el) => el.textContent);
    expect(copyrightText).toContain('Copyright Nathan Friend © 2012');
  });

  it('has a link to the "Attributions" pag', async () => {
    const attributionsLinkText = await page.$eval(
      `#legal a[href="/attributions"]`,
      (el) => el.textContent,
    );

    expect(attributionsLinkText).toBe('Attributions');
  });
});
