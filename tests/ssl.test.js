describe('SSL tests', () => {
  const navigateToBaddSsl = async () => {
    await page.goto('https://expired.badssl.com/');
  };

  const navigateToNathanFriendIO = async () => {
    await page.goto('https://nathanfriend.io');
  };

  beforeEach(() => {
    expect.assertions(1);
  });

  it('fails because the SSL certificate is invalid', async () => {
    return expect(navigateToBaddSsl()).rejects.toThrow(
      new Error('net::ERR_CERT_DATE_INVALID at https://expired.badssl.com/'),
    );
  });

  it('succeeds if the SSL certificate is valid', async () => {
    return expect(navigateToNathanFriendIO()).resolves.not.toThrow(
      expect.any(Error),
    );
  });
});
