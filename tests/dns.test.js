describe('DNS tests', () => {
  const protocols = ['http', 'https'];
  const subdomains = ['www.', ''];
  const tlds = ['io', 'com'];

  const testSite = (name, endUrl) => {
    for (const protocol of protocols) {
      for (const subdomain of subdomains) {
        for (const tld of tlds) {
          const startUrl = `${protocol}://${subdomain}${name}.${tld}`;

          it(`redirects a request to ${startUrl} to ${endUrl}`, async () => {
            await page.goto(startUrl);

            expect(page.url()).toBe(endUrl);
          });
        }
      }
    }
  };

  describe('main website', () => {
    testSite('nathanfriend', 'https://nathanfriend.io/');
  });

  describe('wedding website', () => {
    testSite('bethany.and.nathanfriend', 'https://nathanfriend.io/wedding/');
  });

  describe('a broken test', () => {
    it('fails', () => {
      expect(1).toBe(2);
    });
  });
});
