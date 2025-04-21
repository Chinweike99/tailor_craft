# Contributing Guide

## Development Environment Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [pnpm](https://pnpm.io/) (version 8.x or higher)
- Git

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/username/repository.git
   cd repository
   ```

2. **Install pnpm version 8 or higher:**
   ```bash
   npm install -g pnpm@^8
   ```
   
   Verify that the correct version is installed:
   ```bash
   pnpm --version
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Set up environment variables:**
   Create a `.env.local` file based on the `.env.example` template.

5. **Start the development server:**
   ```bash
   pnpm dev
   ```

## Project Structure

```
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and helpers
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   └── api/              # API interfaces
├── tests/                # Test files
├── .github/              # GitHub configuration
│   └── workflows/        # GitHub Actions workflows
├── pnpm-lock.yaml        # Lock file for pnpm
└── package.json          # Project dependencies and scripts
```

## Development Workflow

1. **Create a new branch for your feature or bug fix:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/issue-you-are-fixing
   ```

2. **Make your changes and commit them with descriptive messages:**
   ```bash
   git commit -m "feat: add new component for user profile"
   ```

3. **Push your branch to the remote repository:**
   ```bash
   git push -u origin your-branch-name
   ```

4. **Open a pull request against the appropriate branch (usually `dev`).**

## Code Style and Standards


- **build your code:**
  ```bash
  pnpm build
  ```

### Core Principles

- Write clear, readable, and maintainable code
- Follow the DRY principle (Don't Repeat Yourself)
- Use TypeScript for type safety
- Document your code, especially complex functions or components
- Keep components small and focused on a single responsibility

## Git Workflow

We follow a standard branching strategy:

- `main`: Production-ready code
- `dev`: Development branch, base for new features
- `feature/*`: New features or enhancements
- `fix/*`: Bug fixes
- `hotfix/*`: Urgent fixes for production

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

Common types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `test`: Adding or updating tests
- `chore`: Changes to build process or tooling

## Pull Request Process

1. **Fill out the PR template** with a clear description of your changes
2. **Link any related issues** by using keywords like "Fixes #123" or "Relates to #456"
3. **Pass all CI checks** including linting, tests, and build verification
4. **Request reviews** from at least one team member
5. **Address all review comments** before merging
6. **Squash and merge** your PR once approved

## Testing

We use [Jest](https://jestjs.io/) for unit tests and [Cypress](https://www.cypress.io/) for integration tests.


### Test Guidelines

- Write tests for all new features and bug fixes
- Aim for high code coverage
- Test edge cases and error conditions
- Use descriptive test names that explain what's being tested

## Continuous Integration

We use GitHub Actions for CI/CD. Every pull request triggers the following checks:

- Linting
- Unit tests
- Build verification
- Type checking

The CI workflow is defined in `.github/workflows/ci.yml`. Pull requests cannot be merged if any CI checks fail.

## Documentation

Good documentation is essential for our project:

- Add JSDoc comments to functions and components
- Update README.md with any new features or changes to setup instructions
- Document APIs and important workflows
- Create or update documentation for significant changes

## Troubleshooting

### Common Issues

#### pnpm Command Not Found

If you encounter a "command not found" error with pnpm:
```bash
npm install -g pnpm@^8
```

#### Dependency Installation Issues

If you face issues installing dependencies:
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

#### Build Errors

If you encounter build errors, check:
1. That all dependencies are installed: `pnpm install`
2. That your Node.js version matches requirements
3. That any required environment variables are set

For additional help, please open an issue with detailed information about your environment and the error you're encountering.
