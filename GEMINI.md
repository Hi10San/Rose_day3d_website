# GEMINI.md

## Project Overview

This is a 3D web application created to display a "Happy Rose Day" message. It renders a 3D model of a rose with special effects and animated text.

The project is built using the following technologies:

*   **Vite:** As the build tool and development server.
*   **React:** As the main UI library.
*   **Three.js / React Three Fiber:** For rendering the 3D scene and model.
*   **React Three Drei:** Provides useful helpers and abstractions for `react-three-fiber`.
*   **React Three Postprocessing:** Used for visual effects like Bloom, Noise, and Vignette.
*   **Framer Motion:** For animations and transitions.
*   **ESLint:** For code linting.

The main application logic is contained within `src/App.jsx`. It loads a 3D model from `public/assets/rose.glb` and displays it with animated text and a custom loader.

## Building and Running

### Development

To run the development server:

```bash
npm install
npm run dev
```

This will start a local development server, typically at `http://localhost:5173`.

### Production Build

To build the application for production:

```bash
npm run build
```

The output will be in the `dist` directory.

### Previewing the Production Build

To preview the production build locally:

```bash
npm run preview
```

## Development Conventions

The project uses ESLint for code quality and consistency. To run the linter:

```bash
npm run lint
```

The configuration for ESLint can be found in `eslint.config.js`. The project follows standard React and `react-three-fiber` coding practices.
