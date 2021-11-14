<h1 align="center">Printer Manager</h1>
<p align="center">
  <a href="https://www.npmjs.com/" target="_blank"><img src="https://img.shields.io/badge/Packages-NPM-%23CB3837.svg?logo=npm&link=https://www.npmjs.com"></a>
  <a href="https://webpack.js.org/" target="_blank"><img src="https://img.shields.io/badge/Bundler-Webpack-%238DD6F9.svg?logo=Webpack"></a>
  <a href="https://reactjs.org/" target="_blank"><img src="https://img.shields.io/badge/View-React-blue.svg?logo=React"></a>
  <a href="https://github.com/prettier/prettier" target="_blank"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"></a>
</p>


## Description

React application bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) for using with `REST API` and `React Reducer` for state managing.


## File structure

```
├── README.md
└── src/
    ├── assetc/        => images
    ├── context/       => represents react-query
    ├── components/    => all react components
    └── utils/         => global constants and helper functions
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Storybook

We use Storybook to ease the component development process. It allows a "UI
First" development pattern as well as an easy to use component browsers for
developers, project managers and customers.

See the [Storybook README](./storybook/README.md) for more information.

## React-Query

We use reqct-query for performant and powerful data synchronization for React.

[More...](https://react-query.tanstack.com/)

## Code Style

We use [TypeScript](https://www.typescriptlang.org/),
[Prettier](https://prettier.io/) to
ensure a consistent code style and prevent bad basic coding patterns.

## VS Code

VS Code is the recommended IDE/editor to use for developing this app. Some
[useful settings](./.vscode/README.md) for VS Code are included in this
repository.