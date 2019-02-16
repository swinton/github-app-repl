require('dotenv').config();
const Repl = require('repl');
const App = require('./lib/app');
const { findPrivateKey } = require('./lib/private-key');
const { extendWith } = require('./lib/utils');

(async () => {
  // Instantiate a new app
  const app = new App({ id: process.env.APP_ID, privateKey: findPrivateKey() });
  await app.load();

  // Context initializer
  const initializeContext = extendWith({ app });

  const repl = Repl.start();

  // Place app in repl context as a read-only (immutable) property
  initializeContext(repl.context);

  // Listen for the reset event
  repl.on('reset', initializeContext);
})();
