const { timeout } = require('./util');

describe('DNS tests', () => {
  beforeEach(async () => {
    // Wait between each test to avoid pegging the server
    // Note: this is addition to the global timeout
    // specified in setup.js
    await timeout(1000);
  });

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
});
