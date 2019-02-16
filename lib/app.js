const OctokitApp = require('@octokit/app');
const request = require('@octokit/request');

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

  async load() {
    const { data } = await request('GET /app', {
      headers: {
        authorization: `Bearer ${this.getSignedJsonWebToken()}`,
        accept: 'application/vnd.github.machine-man-preview+json'
      }
    });
    unpack(data, propName => {
      this[propName] = data[propName];
    });
    return data;
  }

  async installations() {
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
