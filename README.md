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

We welcome contributions to the Contler project. Before contributing, please read our contribution guidelines, which provide detailed instructions on how to make a contribution.

For more information about Nx, visit the [Nx Documentation](https://nx.dev).

Enjoy building with Contler!


