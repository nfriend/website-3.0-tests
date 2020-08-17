#!/usr/bin/env node

const axios = require('axios').default;

axios
  .post('https://api.pushover.net/1/messages.json', {
    // Required fields
    token: process.env.PUSHOVER_TOKEN,
    user: process.env.PUSHOVER_USER,
    message: 'Some nathanfriend.io integration tests failed!',

    // Optional fields
    device: process.env.PUSHOVER_DEVICE,
    title: 'nathanfriend.io',
    url: process.env.CI_PIPELINE_URL,
    url_title: 'View pipeline',
    sound: 'falling',
  })
  .then(() => {
    console.log('Successfully sent a Pushover notification.');
  })
  .catch(() => {
    console.error('Failed to send a Pushover notification!');
    process.exit(1);
  });
