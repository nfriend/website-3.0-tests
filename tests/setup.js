const { timeout } = require('./util');

// Add some space between each test to avoid pegging my server.
global.beforeEach(() => timeout(1000));
