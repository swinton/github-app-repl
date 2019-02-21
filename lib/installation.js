const Octokit = require('@octokit/rest');
const OctokitGraphql = require('@octokit/graphql');
const { unpack } = require('./utils');

class Installation {
  constructor(app, params) {
    this.app = app;
    unpack(params, propName => {
      this[propName] = params[propName];
    });
  }

  async getInstallationAccessToken() {
    const token = await this.app.getInstallationAccessToken({
      installationId: this.id
    });
    return `token ${token}`;
  }

  get octokit() {
    return new Octokit({
      auth: this.getInstallationAccessToken.bind(this)
    });
  }

  async graphql(query, options = {}) {
    const token = await this.getInstallationAccessToken();
    // Create new options with default headers
    const newOptions = { ...{ headers: {} }, ...options };
    // Override options.headers.authorization
    newOptions.headers = { ...options.headers, ...{ authorization: token } };
    // Return query
    return OctokitGraphql(query, newOptions);
  }
}

module.exports = Installation;
