#!/usr/bin/env node --experimental-repl-await

require('dotenv').config();
const path = require('path');
const homedir = require('os').homedir();
const Repl = require('repl');
const App = require('./lib/app');
const { findPrivateKey } = require('./lib/private-key');
const { extendWith } = require('./lib/utils');

(async () => {
  // Instantiate a new app
  const app = new App({ id: process.env.APP_ID, privateKey: findPrivateKey() });
  await app.load();

  // Get installations
  const installations = await app.installations();

  // Context initializer
  const initializeContext = extendWith({ app, installations });

  const repl = Repl.start();

  // Place app in repl context as a read-only (immutable) property
  initializeContext(repl.context);

  // Listen for the reset event
  repl.on('reset', initializeContext);

  // Initialize a history log file
  if (repl.setupHistory) {
    repl.setupHistory(path.join(homedir, '.node_repl_history'));
  }
})();
