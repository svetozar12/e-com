# E-Commerce App

Welcome to the repository for our e-commerce platform. This project uses [Nx](https://nx.dev/), a powerful set of tools designed for modern development to help us manage and scale our application efficiently.

## Quick Start

Below are the instructions to set up your environment, build the project, run tests, and launch the application. Ensure you have [Node.js](https://nodejs.org/) installed before proceeding.

### Install Dependencies

First, install the necessary dependencies for our project. Open your terminal and run:

```bash
yarn
```

This command fetches all packages required by the project, ensuring all our tools and libraries are up to date.

### Build the Project

To build all projects within this repository, use the following command:

```bash
yarn nx run-many --target=build --all
```

This compiles all the applications and libraries in the repository, preparing them for deployment or local testing.

### Test the Project

Run the following command to execute tests across all projects:

```bash
yarn nx run-many --target=test --all
```

This executes unit tests to ensure that existing features continue to work as expected as new code is added.

### Run the Project

To start all projects, use this command:

```bash
yarn nx run-many --target=serve --all
```

## Additional Commands

- **Linting**: Ensure your code conforms to our style guidelines by running `yarn nx lint`.
- **Dependency Graph**: Visualize the structure of your applications and libraries with `yarn nx dep-graph`.

This README is designed to be welcoming to newcomers and provides clear, actionable steps for common tasks they might need to perform, enhancing the overall developer experience.
