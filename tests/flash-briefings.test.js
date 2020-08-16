const { timeout } = require('./util');
const axios = require('axios').default;

describe('Flash briefing JSON files', () => {
  beforeEach(async () => {
    // Wait between each test to avoid pegging the server
    // Note: this is addition to the global timeout
    // specified in setup.js
    await timeout(1000);
  });

  it.each`
    url
    ${'https://nathanfriend.io/flash-briefings/fortune-cookie.json'}
    ${'https://nathanfriend.io/flash-briefings/oddly-specific-fortunes.json'}
  `(
    '$url returns a 200 and has the correct JSON structure',
    async ({ url }) => {
      const { data, status } = await axios.get(url);

      expect(status).toBe(200);

      expect(data).toMatchObject({
        // Something like "urn:uuid:b7e62abd-810d-4fc9-a715-c7cfc9d5d073"
        uid: expect.stringContaining('urn:uuid:'),

        // Something like "2020-08-16T03:23:48.534Z"
        updateDate: expect.stringMatching(
          /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/,
        ),

        // Something like "Fortune for August 16",
        titleText: expect.stringContaining('Fortune for '),

        // Something like "You will trip over a dog two days from now."
        mainText: expect.any(String),
      });
    },
  );
});
