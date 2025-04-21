# Webpack Template

A modern webpack template for JavaScript projects with SCSS support.

## Features

- 📦 Webpack 5
- 🔥 Hot Module Replacement
- 🎨 SCSS support
- 📱 Production optimization
- 🎯 Asset management
- 🛠 Babel configuration
- ✨ ESLint for code quality

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone this repository:
```bash
git clone https://github.com/chwebe/template-webpack
cd webpack-template
```

2. Install dependencies using the setup script:
```bash
npm run setup
```

This will install all necessary dependencies including:
- Webpack and related plugins
- ESLint for code linting
- Development server

### Development

Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`.

### Production Build

Create a production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Linting

This project uses ESLint to enforce code quality and style consistency. We use the Airbnb base style guide with some custom configurations.

### ESLint Configuration

The ESLint configuration can be found in `.eslintrc.json`:
- Environment: Browser, ES2021, and Node.js
- Style Guide: Airbnb base
- Custom Rules:
  - `no-console`: Warns on console.log but allows console.warn and console.error
  - `import/prefer-default-export`: Rule is disabled
  - `max-len`: Maximum line length of 100 characters

### Available Linting Commands

```bash
# Check for linting errors
npm run lint

# Fix automatically fixable issues
npm run lint:fix

# Check specific file
npx eslint src/file.js

# Fix specific file
npx eslint src/file.js --fix
```

### VS Code Integration

1. Install the ESLint extension for VS Code
2. Add the following to your VS Code settings for automatic fixing on save:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Ignored Files

The following files and directories are ignored by ESLint (configured in `.eslintignore`):
- `node_modules/`
- `dist/`
- `webpack/`
- `*.config.js`

## Available Scripts

- `npm start` - Starts the development server
- `npm run build` - Creates a production build
- `npm run build:dev` - Creates a development build
- `npm run lint` - Runs ESLint check
- `npm run lint:fix` - Runs ESLint and fixes issues

## Project Structure

```
webpack-template/
├── src/                    # Source files
│   ├── styles/           # Global styles
│   ├── app.js           # Example module
│   └── index.js         # Entry point
├── webpack/              # Webpack configurations
│   ├── webpack.common.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
└── package.json
```

## License

This project is licensed under the MIT License.