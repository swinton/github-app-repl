const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');
const { graphql } = require('@octokit/graphql');
const { unpack } = require('./utils');

class Installation {
  constructor(app, params) {
    this.app = app;
    unpack(params, propName => {
      this[propName] = params[propName];
    });
  }

  get auth() {
    return {
      type: 'installation',
      installationId: this.id,
      privateKey: this.app.privateKey,
      id: this.app.id
    };
  }

  get octokit() {
    // Create new Octokit instance that is authenticated as a GitHub App installation
    return new Octokit({
      authStrategy: createAppAuth,
      auth: this.auth
    });
  }

  async graphql(query, options = {}) {
    const auth = createAppAuth(this.auth);
    const client = graphql.defaults({
      request: {
        hook: auth.hook
      }
    });
    return client(query, options);
  }
}

module.exports = Installation;
