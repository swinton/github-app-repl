const Octokit = require('@octokit/rest');
const { unpack } = require('./utils');

class Installation {
  constructor(app, params) {
    this.app = app;
    unpack(params, propName => {
      Installation.prototype[propName] = params[propName];
    });
  }

  get octokit() {
    const auth = async () => {
      const installationAccessToken = await this.app.getInstallationAccessToken({
        installationId: this.id
      });
      return `token ${installationAccessToken}`;
    };

    return new Octokit({
      auth
    });
  }
}

module.exports = Installation;
