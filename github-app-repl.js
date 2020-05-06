#!/usr/bin/env node --experimental-repl-await
require('dotenv').config();

const repl = require('repl');
const path = require('path');
const homedir = require('os').homedir();

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

  const r = repl.start('> ');

  // Place app in repl context as a read-only (immutable) property
  initializeContext(r.context);

  // Listen for the reset event
  r.on('reset', initializeContext);

  // Initialize a history log file
  r.setupHistory(path.join(homedir, '.node_repl_history'), () => {});
})();
