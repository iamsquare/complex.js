# Contributing to Complex.js

Thank you for your interest in contributing to Complex.js! This document provides guidelines and instructions for contributing to the project.

## Getting Started

### Prerequisites

- **Node.js** (version 24.11.0 or compatible)
- **pnpm** (version 10.20.0 or compatible)
  - The project enforces pnpm usage via the `preinstall` script
  - Install pnpm: `npm install -g pnpm`

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/your-username/complex.js.git
   cd complex.js
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Verify the setup**
   ```bash
   pnpm test
   pnpm build
   ```

## Development Workflow

### Making Changes

1. **Create a branch** from `master`
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes** following the coding standards below

3. **Run tests** to ensure everything works
   ```bash
   pnpm test
   ```

4. **Check code quality**
   ```bash
   pnpm lint
   pnpm lint:fix  # Auto-fix issues when possible
   ```

5. **Build the project** to ensure it compiles
   ```bash
   pnpm build
   ```

6. **Run the full production check**
   ```bash
   pnpm prod  # Cleans, tests with coverage, and builds
   ```

## Code Style and Standards

### TypeScript

- Use TypeScript for all source code
- Follow the existing code style and patterns
- Use named exports (avoid default exports)
- Prefer type imports: `import type { ... } from '...'`

### Formatting

The project uses **Prettier** for code formatting. Configuration is in `.prettierrc`:

- Single quotes
- Semicolons
- 2-space indentation
- 120 character line width
- LF line endings
- Trailing commas

**Pre-commit hooks** will automatically format your code, but you can also run:
```bash
pnpm lint:fix
```

### Linting

The project uses **ESLint** with TypeScript support. Key rules:

- No unused variables (except those prefixed with `_`)
- Consistent type imports
- Import sorting (enforced automatically)
- Prettier integration

Run linting:
```bash
pnpm lint
pnpm lint:fix  # Auto-fix issues
```

### File Organization

- Source code: `src/`
- Tests: `tests/`
- Documentation: `docusaurus/docs/`

### Import Paths

The project uses path aliases configured in `tsconfig.json`:
- `~/complex` → `src/complex.ts`
- `~/functions` → `src/functions/`
- `~/operations` → `src/operations/`
- `~/helpers` → `src/helpers.ts`

## Testing

### Writing Tests

- All new features and bug fixes must include tests
- Tests are located in the `tests/` directory
- Use **Vitest** as the testing framework
- Follow the existing test patterns and structure

### Test Structure

```typescript
import { describe, expect, test } from 'vitest';
import { Complex, yourFunction } from '@iamsquare/complex.js';

describe('Your Feature', () => {
  test('should do something', () => {
    const result = yourFunction(new Complex(1, 1));
    expect(result).toBeComplexCloseTo(expectedValue);
  });
});
```

### Running Tests

```bash
pnpm test              # Run all tests
pnpm test:watch        # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage report
```

### Test Coverage

- Aim for high test coverage
- Coverage reports are generated in the `coverage/` directory
- The `pnpm prod` command includes coverage checks

## Commit Messages

The project uses **Conventional Commits** format enforced by commitlint.

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes

### Examples

```bash
feat: add nthroot function
fix: handle edge case in division operation
docs: update README with new features
test: add tests for nthroot function
chore: update dependencies
```

## Pull Request Process

### Before Submitting

1. **Ensure all checks pass**
   ```bash
   pnpm prod
   ```

2. **Update documentation** if needed
   - Update README.md for user-facing changes
   - Update docusaurus docs for API changes
   - Update JSDoc comments for code changes

3. **Write a clear PR description**
   - Describe what changes you made
   - Explain why you made them
   - Reference any related issues
   - Include examples if applicable

### PR Checklist

- [ ] Code follows the project's style guidelines
- [ ] All tests pass (`pnpm test`)
- [ ] Code is properly formatted (`pnpm lint:fix`)
- [ ] Build succeeds (`pnpm build`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventional commits format
- [ ] No linting errors (`pnpm lint`)

### Review Process

1. Submit your PR targeting the `master` branch
2. Ensure CI checks pass
3. Address any review feedback
4. Once approved, maintainers will merge your PR

## Documentation

### Code Documentation

- Add JSDoc comments for all public functions and classes
- Include parameter descriptions, return types, and examples
- Follow the existing JSDoc style

### User Documentation

- Update `README.md` for significant changes
- Update `docusaurus/docs/` for API documentation
- Add examples where appropriate

### Building Documentation Locally

```bash
cd docusaurus
pnpm install
pnpm start  # Start development server
pnpm build  # Build documentation
```

## Project Structure

```
complex.js/
├── src/              # Source code
│   ├── complex.ts    # Complex class
│   ├── functions/    # Mathematical functions
│   ├── operations/   # Basic operations
│   └── helpers.ts    # Helper functions
├── tests/            # Test files
├── docusaurus/      # Documentation website
├── dist/             # Build output (generated)
└── coverage/        # Test coverage (generated)
```

## Getting Help

- **Issues**: [Open an issue on GitHub](https://github.com/iamsquare/complex.js/issues) for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the [documentation website](https://complex-js.iamsquare.it)

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](../LICENSE).

---

Thank you for contributing to Complex.js! 🎉

