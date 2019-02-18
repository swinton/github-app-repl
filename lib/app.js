const Octokit = require('@octokit/rest');
const OctokitApp = require('@octokit/app');
const Installation = require('./installation');
const { unpack } = require('./utils');

class App {
  constructor(params) {
    this.id = parseInt(params.id, 10);
    const api = new OctokitApp(params);
    unpack(api, propName => {
      App.prototype[propName] = api[propName];
    });
  }

  get octokit() {
    const auth = () => `Bearer ${this.getSignedJsonWebToken()}`;
    return new Octokit({
      auth
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
