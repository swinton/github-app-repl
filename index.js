require('dotenv').config();
const Repl = require('repl');
const App = require('@octokit/app');
const { findPrivateKey } = require('./lib/private-key');
const { extendWith } = require('./lib/utils');

// Instantiate a new app
const app = new App({ id: process.env.APP_ID, privateKey: findPrivateKey() });

// Context initializer
const initializeContext = extendWith({ app });

const repl = Repl.start();

// Place app in repl context as a read-only (immutable) property
initializeContext(repl.context);

// Listen for the reset event
repl.on('reset', initializeContext);
