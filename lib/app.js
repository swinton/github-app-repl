const OctokitApp = require('@octokit/app');
const request = require('@octokit/request');

class App {
  constructor(properties) {
    const api = new OctokitApp(properties);
    // eslint-disable-next-line no-restricted-syntax
    for (const method of Object.getOwnPropertyNames(api)) {
      App.prototype[method] = api[method];
    }
  }

  async getInstallations() {
    const { data } = await request('GET /app/installations', {
      headers: {
        authorization: `Bearer ${this.getSignedJsonWebToken()}`,
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    });
    return data;
  }
}

module.exports = App;
