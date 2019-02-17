# GitHub-App-REPL

> 🔁 A REPL (read–eval–print loop) for GitHub Apps

## Features

1. Uses the Node `repl` module
1. With experimental `await` support enabled
1. Loads your GitHub App and exposes it as `app` in a repl session. 
1. So you can easily start playing around with it interactively :relaxed:.

## Why?

I like using a repl to experiment with ideas and get comfortable with an API before delving into actual code. This removes some of the boilerplate code required to start working with GitHub Apps in a repl. 

## Installation

```
npm install -D github-app-repl
```

### Usage

```
npx github-app-repl
```

It expects a `APP_ID` environment variable, and corresponding `.pem` file. Most Probot projects should have this. 

## API

- app.id
- app.name
- app.description
- app.installations()
- :soon: app.installation({})
