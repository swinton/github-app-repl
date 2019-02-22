# GitHub-App-REPL

> 🔁 A REPL (read–eval–print loop) for GitHub Apps

## Features

1. Uses [the Node `repl` module](https://nodejs.org/api/repl.html) :repeat:
1. With [experimental `await` support](https://nodejs.org/api/cli.html#cli_experimental_repl_await) enabled :ok_hand:
1. Loads your GitHub App and exposes it as `app` in a REPL session :zap:
1. So you can easily start playing around with it interactively :relaxed:

## Why?

I like using a REPL to experiment with ideas and get comfortable with an API before delving into actual code. This removes some of the boilerplate code required to start working with GitHub Apps in a REPL.

## Installation

```
npm install -D github-app-repl
```


## Configuration

A couple of environment variables are required for configuration:

1. **`APP_ID`**: This should be set to the ID of your GitHub App. 
    - This is available from the settings page of your GitHub App, as `App ID`.
1. **`PRIVATE_KEY_PATH`**: This should be set to a  local filesystem path to a private key for your GitHub App. 
    - More information on generating and downloading private keys for your GitHub Apps is [available in the documentation](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#generating-a-private-key).

These environment variables can either be set directly, or via a `.env` file that follows [this example](https://github.com/swinton/github-app-repl/blob/master/.env.example).

## Usage

```
npx github-app-repl
```

## API

- `app.id`: GitHub App ID
- `app.name`: GitHub App Name
- `app.description`: GitHub App Description
- `app.octokit`: Authenticated [`@octokit/rest`](https://github.com/octokit/rest.js) instance, scoped to your GitHub App
- `app.installations()`: Dictionary of GitHub App Installations, keyed by installation account login
- `installations`: Pre-loaded dictionary of GitHub App Installations, keyed by installation account login
- `installations[:login].octokit`: Authenticated [`@octokit/rest`](https://github.com/octokit/rest.js) instance, scoped to a specific GitHub App installation
- `installations[:login].graphql`: Authenticated [`@octokit/graphql`](https://github.com/octokit/graphql.js) instance, scoped to a specific GitHub App installation

## Examples

### Open a new issue

```javascript
await installations[owner].octokit.issues.create({owner, repo, title})
```

### Retrieve the last 3 issues from a repo

```javascript
await installations[owner].graphql(`query lastIssues($owner: String!, $repo: String!, $num: Int = 3) {
    repository(owner:$owner, name:$repo) {
      issues(last:$num) {
        edges {
          node {
            title
          }
        }
      }
    }
  }`, {
    owner: 'octokit',
    repo: 'graphql.js'
  }
})
```

## Credits

1. [Mastering the Node.js REPL (part 2) – Trabe – Medium](https://medium.com/trabe/mastering-the-node-js-repl-part-2-365c52a5203d)
