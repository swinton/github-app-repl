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

It expects a `APP_ID` environment variable, and corresponding `.pem` file. Most Probot projects should have this. 

To find these details for a GitHub App you have installed, log into GitHub and from your profile view go to `Settings > Developer Settings > GitHub Apps > YOUR_APP > EDIT`

From here, you can generate a new private key if you'd like. You will need either need to move the `.pem` file into `gitHub-app-repl`'s directory or update the `.env` file to include a file path to your key. 

## Usage

```
npx github-app-repl
```

## API

- `app.id`: GitHub App ID
- `app.name`: GitHub App Name
- `app.description`: GitHub App Description
- `app.octokit`: Authenticated Octokit instance, scoped to your GitHub App
- `app.installations()`: Dictionary of GitHub App Installations, keyed by installation account login
- `installations`: Pre-loaded dictionary of GitHub App Installations, keyed by installation account login
- `installations[:login].octokit`: Authenticated Octokit instance, scoped to a specific GitHub App installation

## Examples

### Open a new issue

```javascript
await installations[owner].octokit.issues.create({owner, repo, title})
```

## Credits

1. [Mastering the Node.js REPL (part 2) – Trabe – Medium](https://medium.com/trabe/mastering-the-node-js-repl-part-2-365c52a5203d)
