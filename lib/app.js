const Octokit = require('@octokit/rest');
const OctokitApp = require('@octokit/app');

const unpack = (o, handler) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName of Object.getOwnPropertyNames(o)) {
    handler(propName);
  }
};

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
    return this.octokit.paginate('GET /app/installations', {
      headers: {
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    });
  }
}

module.exports = App;
