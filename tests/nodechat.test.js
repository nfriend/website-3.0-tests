const { getElementText } = require('./util');

describe('NodeChat', () => {
  let response;

  beforeAll(async () => {
    response = await page.goto('https://nathanfriend.io/NodeChat');
  });

  it('returns a 200', () => {
    expect(response.status()).toBe(200);
  });

  it('allows a name to be entered', async () => {
    const nameFieldSelector = '#name-field';
    const chatInputSelector = '.chat-input';
    const lastChatMessageSelector =
      '.chat-message-container:last-child .message-container';
    const chatText = 'Hello from GitLab CI!';

    await page.waitForSelector(nameFieldSelector);

    // Select the orange color
    await page.click('.color-choice.orange');

    // Select the current text in the input by triple-clicking it
    const nameField = await page.$(nameFieldSelector);
    await nameField.click({ clickCount: 3 });

    await page.type(nameFieldSelector, 'GitLab CI');

    await page.keyboard.press('Enter');

    // Send a chat message
    await page.type(chatInputSelector, chatText);

    await page.keyboard.press('Enter');

    // Refresh the page to make sure chat messages are persisted
    await page.reload();

    await page.waitForSelector(lastChatMessageSelector);

    const text = await getElementText(lastChatMessageSelector);

    // Expect to see the text we sent before the page was refreshed
    expect(text).toBe(chatText);
  });
});
