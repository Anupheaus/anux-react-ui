const path = require('path');

process.env['TS_NODE_FILES'] = true;

module.exports = {
  require: [
    'ts-node/register',
    'jsdom-global/register',
    'anux-common',
    path.resolve(__dirname, './tests/setup.js'),
  ],
  spec: './src/**/*.tests.+(ts|tsx)',
};
