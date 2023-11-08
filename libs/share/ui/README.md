# Contler Common UI Components Library

Welcome to the Contler Common UI Components Library repository. This repository is part of a monorepo managed with NX and is designed for use with Angular v16.

## Description

The Contler UI Components Library provides a suite of standalone, reusable UI components for enterprise-level applications. Each component is meticulously crafted to ensure modularity, ease of use, and high performance.

## Components

All components are standalone, meaning they can be imported and used independently of each other without any unnecessary dependencies.

Each component comes with its respective `.stories.ts` file, which documents how to use the component, lists all the input properties and outputs, and provides examples in the form of stories.

## Getting Started

To get started using the Contler UI Components Library, make sure you have the NX CLI installed, as our monorepo leverages its power for managing the project.


### Commands

To build the library, run:

```
nx run ui:build
```

To lint the library, use:

```
nx run ui:lint
```

To interact with components and see them in action, launch Storybook:

```
nx run ui:storybook
```

## Usage

To use a component from the library, first import it into your Angular module:

```typescript
import { ComponentName } from '@Contler/ui';

@NgModule({
  declarations: [
    AppComponent,
    // other components
    ComponentName,
  ],
  // ...
})
export class AppModule {}
```

