# Complex.js REPL

This is a separate educational REPL (Read-Eval-Print Loop) tool for experimenting with complex number operations. It is **not part of the library** and is provided for educational purposes.

## Usage

Run the REPL using:

```bash
pnpm repl
```

Or directly with:

```bash
npx tsx repl/index.ts
```

## Features

### Complex Number Input

Complex numbers can be entered in the form `a+ib` where `a` and `b` can be omitted:

- Real numbers: `5`, `-3`, `1.5`
- Pure imaginary: `i`, `2i`, `-3i`
- Complex numbers: `1+2i`, `3-4i`, `-1+i`, `2-i`

**Note**: For binary operations (addition, subtraction), use spaces around operators:

- `1+2i` → parsed as a single complex number `1+2i`
- `1 + 2i` → parsed as addition: `1` + `2i`

### Functions

All available functions can be called with parentheses:

**Trigonometric:**

- `sin(z)`, `cos(z)`, `tan(z)`, `cot(z)`, `sec(z)`, `csc(z)`

**Inverse Trigonometric:**

- `asin(z)`, `acos(z)`, `atan(z)`, `acot(z)`, `asec(z)`, `acsc(z)`

**Hyperbolic:**

- `sinh(z)`, `cosh(z)`, `tanh(z)`, `coth(z)`, `sech(z)`, `csch(z)`

**Inverse Hyperbolic:**

- `asinh(z)`, `acosh(z)`, `atanh(z)`, `acoth(z)`, `asech(z)`, `acsch(z)`

**Other:**

- `exp(z)`, `log(z)`, `sqrt(z)`, `inverse(z)`

### Operations

Basic operations use their symbols:

- Addition: `+` (use spaces: `1+2i + 3+4i`)
- Subtraction: `-` (use spaces: `1+2i - 3+4i`)
- Multiplication: `*` (`1+2i * 3+4i`)
- Division: `/` (`1+2i / 3+4i`)
- Power: `^` (`2^3`, `(1+i)^2`)

### Examples

```
complex> 1+2i
  => 1 + 2i

complex> sin(1+2i)
  => 3.165778513216168 + 1.9596010414216063i

complex> (1+2i) * (3-4i)
  => 11 + 2i

complex> exp(i)
  => 0.5403023058681398 + 0.8414709848078965i

complex> sqrt(-1)
  => 1i

complex> (1+i)^2
  => 0 + 2i
```

### Commands

- `help` - Show help information
- `exit` or `quit` - Exit the REPL
- Empty line - Do nothing

## Implementation

The REPL consists of:

- **Parser** (`parser.ts`): Parses complex number expressions into an AST
- **Evaluator** (`evaluator.ts`): Evaluates AST nodes to Complex numbers
- **REPL** (`index.ts`): Interactive readline interface

This is a simple educational tool and may not handle all edge cases perfectly.
