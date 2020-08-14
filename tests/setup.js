const { timeout } = require('./util');

// Add some space between tests to avoid pegging my server.
global.beforeAll(() => timeout(1000));
