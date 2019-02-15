require('dotenv').config();
const repl = require('repl');
const App = require('@octokit/app');
const { findPrivateKey } = require('./lib/private-key');

// Instantiate a new app and place it in global scope
const app = new App({ id: process.env.APP_ID, privateKey: findPrivateKey() });
global.app = app;

repl.start();
