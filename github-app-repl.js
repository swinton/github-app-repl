#!/usr/bin/env node --experimental-repl-await
require('dotenv').config();

const repl = require('repl');
const path = require('path');
const homedir = require('os').homedir();

const App = require('./lib/app');
const { findPrivateKey } = require('./lib/private-key');

// Context initializer
const initializeContext = async context => {
  // Instantiate a new app
  const app = new App({ id: process.env.APP_ID, privateKey: findPrivateKey() });
  await app.load();

  // Get installations
  const installations = await app.installations();

  // Extent context, with app, and installations
  Object.entries({ app, installations }).forEach(([k, v]) => {
    Object.defineProperty(context, k, {
      configurable: false,
      enumerable: true,
      value: v
    });
  });
};

(async () => {
  // Start a repl
  const r = repl.start('> ');

  // Initialize
  await initializeContext(r.context);

  // Listen for the reset event
  r.on('reset', initializeContext);

  // Initialize a history log file
  r.setupHistory(path.join(homedir, '.node_repl_history'), () => {});
})();
