/**
 * Parser for complex number expressions.
 * Parses expressions like:
 * - Complex numbers: "1+2i", "3-4i", "5i", "6", "i"
 * - Functions: "sin(z)", "cos(1+2i)", "exp(i)"
 * - Operations: "1+2i + 3+4i", "z * w", "sin(z) / cos(z)"
 */

export type ASTNode =
  | { type: 'complex'; re: number; im: number }
  | { type: 'function'; name: string; arg: ASTNode }
  | { type: 'binary'; op: '+' | '-' | '*' | '/' | '^'; left: ASTNode; right: ASTNode }
  | { type: 'unary'; op: '-' | '+'; operand: ASTNode }
  | { type: 'group'; expr: ASTNode }
  | { type: 'assignment'; name: string; value: ASTNode }
  | { type: 'variable'; name: string }
  | { type: 'constant'; name: string };

export class Parser {
  private input: string;
  private pos: number;

  constructor(input: string) {
    this.input = input.replace(/\s+/g, '');
    this.pos = 0;
  }

  parse(): ASTNode {
    const assignment = this.parseAssignment();

    if (assignment !== null) {
      if (this.pos < this.input.length) {
        throw new Error(`Unexpected character at position ${this.pos}: ${this.input[this.pos]}`);
      }

      return assignment;
    }

    const expr = this.parseExpression();

    if (this.pos < this.input.length) {
      throw new Error(`Unexpected character at position ${this.pos}: ${this.input[this.pos]}`);
    }

    return expr;
  }

  private parseAssignment(): ASTNode | null {
    const startPos = this.pos;

    if (!this.isPositionInRange({ condition: this.isLetter })) {
      this.pos = startPos;

      return null;
    }

    const name = this.parseIdentifier();

    if (!name) {
      this.pos = startPos;

      return null;
    }

    if (!this.isPositionInRange({ condition: (peek) => /\=/.test(peek) })) {
      this.pos = startPos;

      return null;
    }

    this.consume('=');

    return { type: 'assignment', name, value: this.parseExpression() };
  }

  private parseExpression(): ASTNode {
    let left = this.parseMultiplicative();

    while (this.isPositionInRange({ condition: (peek) => /[+-]/.test(peek) })) {
      const op = this.peek();

      this.consume(op);

      const right = this.parseMultiplicative();

      left = { type: 'binary', op: op as '+' | '-', left, right };
    }

    return left;
  }

  private parseMultiplicative(): ASTNode {
    let left = this.parsePower();

    while (this.isPositionInRange({ condition: (peek) => /[*\/]/.test(peek) })) {
      const op = this.peek();

      if (/[*\/]/.test(op)) {
        this.consume(op);

        const right = this.parsePower();

        left = { type: 'binary', op: op as '*' | '/', left, right };
      } else if (this.isImplicitMultiplication(left)) {
        const right = this.parsePower();

        left = { type: 'binary', op: '*', left, right };
      } else {
        break;
      }
    }

    return left;
  }

  private isImplicitMultiplication(left: ASTNode): boolean {
    if (
      !this.isPositionInRange() ||
      (left.type !== 'complex' && left.type !== 'variable' && left.type !== 'constant' && left.type !== 'group')
    ) {
      return false;
    }

    const next = this.peek();

    return this.isDigit(next) || this.isLetter(next) || next === '(' || next === 'i';
  }

  private parsePower(): ASTNode {
    const left = this.parseUnary();

    if (this.isPositionInRange({ condition: (peek) => /[\^]/.test(peek) })) {
      const op = this.peek();

      this.consume(op);

      const right = this.parseUnary();

      return { type: 'binary', op: op as '^', left, right };
    }

    return left;
  }

  private parseUnary(): ASTNode {
    const op = this.peek();

    if (/[-+]/.test(op)) {
      this.consume(op);

      return { type: 'unary', op: op as '-' | '+', operand: this.parseUnary() };
    }

    return this.parsePrimary();
  }

  private parsePrimary(): ASTNode {
    this.isPositionInRange({ errorMessage: 'Unexpected end of input', shouldThrow: true });

    if (this.peek() === '(') {
      this.consume('(');

      const expr = this.parseExpression();

      if (this.peek() !== ')') {
        throw new Error(`Expected ')' at position ${this.pos}`);
      }

      this.consume(')');

      return { type: 'group', expr };
    }

    if (this.isLetter(this.peek())) {
      const identifierStart = this.pos;
      const name = this.parseIdentifier();

      if (this.peek() === '(') {
        this.consume('(');
        const arg = this.parseExpression();
        if (this.peek() !== ')') {
          throw new Error(`Expected ')' at position ${this.pos}`);
        }
        this.consume(')');
        return { type: 'function', name, arg };
      }
      // Special case: 'i' should be parsed as part of a complex number, not as a variable/constant
      if (name === 'i') {
        // Backtrack to before parsing 'i' and let parseComplex handle it
        this.pos = identifierStart;
        return this.parseComplex();
      }
      // Check if it's a built-in constant
      if (this.isConstant(name)) {
        return { type: 'constant', name };
      }
      // Not a function or constant, treat as variable reference
      return { type: 'variable', name };
    }

    // Complex number or number
    return this.parseComplex();
  }

  private parseComplex(): ASTNode {
    let re = 0;
    let im = 0;
    let hasReal = false;
    let hasImag = false;

    // Check if we start with 'i' (imaginary unit)
    if (this.isPositionInRange({ condition: (peek) => /i/.test(peek) })) {
      this.consume('i');

      im = 1;
      hasImag = true;

      return { type: 'complex', re, im };
    }

    // Parse optional sign for real part
    let realSign = 1;

    if (this.isPositionInRange({ condition: (peek) => /[-]/.test(peek) })) {
      realSign = -1;
      this.pos++;
    }

    // Parse real part (optional)
    const realStart = this.pos;
    const realStr = this.parseNumber();
    if (realStr !== null && this.pos > realStart) {
      re = realSign * parseFloat(realStr);
      hasReal = true;
    } else if (realSign === -1 && this.pos === realStart + 1) {
      // We consumed a '-' but no number, might be for imaginary part
      this.pos--; // Backtrack
      realSign = 1;
    }

    // Check for imaginary part directly (e.g., "2i", "i")
    if (this.pos < this.input.length && this.peek() === 'i') {
      this.consume('i');
      if (!hasImag) {
        im = hasReal ? 1 : 1; // Default coefficient is 1
        hasImag = true;
      }
      return { type: 'complex', re, im };
    }

    // Check if there's a sign followed by imaginary part (e.g., "1+2i", "3-4i", "1+i", "1-i")
    if (this.isPositionInRange({ condition: (peek) => /[+-]/.test(peek) })) {
      const beforeSign = this.pos;
      const sign = this.peek() === '+' ? 1 : -1;
      this.consume(this.peek());

      // Check for 'i' directly
      if (this.isPositionInRange({ condition: (peek) => /i/.test(peek) })) {
        this.consume('i');
        im = sign;
        hasImag = true;
        return { type: 'complex', re, im };
      }

      // Parse number followed by 'i'
      const imagStart = this.pos;
      const imagStr = this.parseNumber();
      if (imagStr !== null && this.pos > imagStart) {
        if (this.isPositionInRange({ condition: (peek) => /i/.test(peek) })) {
          this.consume('i');
          im = sign * parseFloat(imagStr);
          hasImag = true;
          return { type: 'complex', re, im };
        } else {
          // Number but no 'i', backtrack
          this.pos = imagStart;
        }
      }

      // Backtrack the sign if we didn't find imaginary part
      this.pos = beforeSign;
    }

    // If we have a real part but no imaginary, return it
    if (hasReal && !hasImag) {
      return { type: 'complex', re, im };
    }

    // If we have nothing, it's an error
    throw new Error(`Unexpected character at position ${this.pos}: ${this.input[this.pos] || 'end of input'}`);
  }

  private parseNumber() {
    const start = this.pos;
    let hasDigit = false;

    if (this.isPositionInRange({ condition: (peek) => /[+-]/.test(peek) })) {
      this.pos++;
    }

    while (this.isPositionInRange({ condition: this.isDigit })) {
      this.pos++;

      hasDigit = true;
    }

    if (this.isPositionInRange({ condition: (peek) => /\./.test(peek) })) {
      this.pos++;

      while (this.isPositionInRange({ condition: this.isDigit })) {
        this.pos++;
        hasDigit = true;
      }
    }

    // Scientific notation
    if (this.isPositionInRange({ condition: (peek) => /[eE][+-]/.test(peek) })) {
      this.pos = this.pos + 2;

      while (this.isPositionInRange({ condition: this.isDigit })) {
        this.pos++;
        hasDigit = true;
      }
    }

    if (!hasDigit) {
      this.pos = start;

      return null;
    }

    return this.input.substring(start, this.pos);
  }

  private parseIdentifier(): string {
    const start = this.pos;

    while (
      this.isPositionInRange({
        condition: (peek) => this.isLetter(peek) || this.isDigit(peek),
      })
    ) {
      this.pos++;
    }

    return this.input.substring(start, this.pos);
  }

  private peek() {
    return this.input[this.pos];
  }

  private isPositionInRange({
    condition = () => true,
    errorMessage = 'Not in range',
    shouldThrow = false,
  }: { condition?: (peek: string) => boolean; errorMessage?: string; shouldThrow?: boolean } = {}) {
    if (this.pos < this.input.length && condition(this.peek())) return true;

    if (shouldThrow) {
      const error = new Error(errorMessage);
      console.error(error.stack);
      throw error;
    }

    return false;
  }

  private consume(expected: string): void {
    if (
      this.isPositionInRange({
        condition: () => this.peek() === expected,
        errorMessage: `Expected '${expected}' at position ${this.pos}`,
        shouldThrow: true,
      })
    ) {
      this.pos++;
    }
  }

  private isDigit(ch: string) {
    return /[0-9]/.test(ch);
  }

  private isLetter(ch: string) {
    return /[a-zA-Z]/.test(ch);
  }

  private isConstant(name: string): name is 'pi' | 'e' {
    return name === 'pi' || name === 'e';
  }
}
