# Contler Project

Contler is a monorepo project managed using Nx, which is a suite of powerful, extensible dev tools that help you develop, test, build, and scale React & Angular apps with fully integrated support for TypeScript, Cypress, Jest, and more.

## Getting Started
To get started with the Contler project, make sure you have `npm` and `Nx` installed globally. If you do not have Nx installed, you can install it using the following command:

```bash
npm install -g nx
```

Once Nx is installed, you can install the project dependencies by running:

```bash
npm install
```

Run prepare command:
```bash
npm run prepare
```

From there, you can serve, build, and test your applications and libraries.

## Directory Structure

The project is organized into applications (apps) and libraries (libs), as follows:

```
.
├── apps
│   ├── admin                   # Admin application
│   │   └── src
│   │       ├── app             # Application logic for the admin panel
│   │       └── assets          # Static assets for the admin application
│   └── admin-e2e               # End-to-end tests for the admin application
│       └── src
└── libs
    └── share
        ├── styles              # Shared stylesheets
        ├── tailwind-preset     # TailwindCSS preset configurations
        └── ui                  # UI components and directives
            └── src
                ├── components  # Reusable components
                └── directives  # Custom directives
```

## Applications

### Admin

The admin app is the main interface for administrators to interact with the system.

- **Develop:** To start the development server for the admin application, run:

```bash
nx serve admin
```

- **Build**: To build the admin application, run:

```bash
nx build admin
```

## Libraries

### Share

The `share` library includes shared resources across applications.

- **Styles:** Contains global style definitions that can be imported into any application or component.

- **Tailwind Preset:** Includes a TailwindCSS preset that ensures a consistent design system across the different apps within the Contler project.

- **UI Components:** Houses reusable UI components that can be shared across multiple applications to ensure a consistent look and feel. For information on how to use the UI components, see the [UI Components README](libs/share/ui/README.md).

## Development Practices

When working within the Contler project, follow these best practices:

- **Code Reusability:** Always check existing libraries (`libs`) before writing new code. If a similar feature exists, extend it or make it configurable instead of duplicating code.

- **Consistency:** Adhere to the styling, naming, and architectural conventions present in the project for consistency.

- **Testing:** Maintain and write new tests when adding or modifying features to ensure stability.

- **Documentation:** Update the documentation in case of adding new features or changing the existing functionality.

## Contributing

Contributions are vital to the success and evolution of the Contler project, and your willingness to contribute is greatly appreciated. Please adhere to our contribution guidelines which incorporate the GitHub Flow to ensure a smooth and consistent workflow.

### Using GitHub Flow

When contributing to the project, we follow the GitHub Flow. It is a simple yet effective branching strategy suited for projects that deploy regularly. Here's the step-by-step guide:

1. **Create a Branch**:
- Branch off from the `main` branch and use a descriptive name that reflects the changes you intend to make. Here are some branch naming conventions:
  - `feature/<feature-name>` for new features
  - `fixbug/<bug-description>` for bug fixes
  - `hotfix/<hotfix-description>` for critical fixes
  - `docs/update-<section>` for documentation updates
  - `improve/<improvement-description>` for general improvements

2. **Make Changes**:
- Commit your changes with clear, descriptive commit messages.
- Push your branch to the remote repository.


3. **Open a Pull Request (PR)**:
- Once your branch has been pushed, open a pull request against the `main` branch.
- Request reviews from team members and engage in any necessary discussions.

4. **Code Review and Collaboration**:
- Make any changes based on feedback, committing and pushing as necessary.
- Your pull request will update automatically with each push.

5. **Deploy**:
- If possible, test your branch in a live environment to ensure everything works as expected.

6. **Merge and Close**:
- After your pull request is approved and tests pass, merge it into `main`.
- Delete the feature branch if no longer needed and pull the changes into your local `main` branch.

### Branch Naming Conventions

Please use the following naming patterns for your branches:
- `feature/<short-feature-description>` for new features
- `fixbug/<short-bug-description>` for bug fixes
- `hotfix/<short-hotfix-description>` for critical fixes
- `docs/<short-doc-update-description>` for documentation updates
- `improve/<short-improvement-description>` for improvements
- `refactor/<short-refactor-description>` for code refactoring
- `test/<short-test-description>` for testing
- `misc/<short-task-description>` for miscellaneous tasks

These conventions are crucial for maintaining a clear and organized repository.

For more detailed information on GitHub Flow, refer to the [GitHub Flow Guide](https://guides.github.com/introduction/flow/).

We're excited to see the contributions you'll make to Contler! If you have any questions or need help, don't hesitate to ask the project maintainers.

Thank you for your dedication to improving Contler!

For further details about Nx, visit the [Nx Documentation](https://nx.dev).
