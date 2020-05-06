const { Octokit } = require('@octokit/rest');
const { createAppAuth } = require('@octokit/auth-app');
const Installation = require('./installation');
const { unpack } = require('./utils');

class App {
  constructor({ id, privateKey }) {
    this.id = parseInt(id, 10);
    this.privateKey = privateKey;
  }

  get octokit() {
    return new Octokit({
      authStrategy: createAppAuth,
      auth: {
        id: this.id,
        privateKey: this.privateKey
      }
    });
  }

  async load() {
    const { data } = await this.octokit.apps.getAuthenticated({});
    unpack(data, propName => {
      this[propName] = data[propName];
    });
    return data;
  }

  async installations() {
    const list = await this.octokit.paginate('GET /app/installations', {
      headers: {
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    });
    return list.reduce(
      (o, installation) => Object.assign(o, { [installation.account.login]: new Installation(this, installation) }),
      {}
    );
  }
}

module.exports = App;
