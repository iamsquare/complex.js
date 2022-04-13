/**
 * Cartesian Coordinate type definition
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * An helper function that checks if an object is a Cartesian coordinate.
 */
export function isCartesian(x: any): x is Cartesian {
  if (x === undefined) return false;
  return typeof x.x === 'number' && typeof x.y === 'number';
}

/**
 * Polar coordinate type definition
 */
export type Polar = {
  r: number;
  p: number;
};

/**
 * An helper function that checks if an object is a Polar coordinate.
 */
export function isPolar(x: any): x is Polar {
  if (x === undefined) return false;
  return typeof x.r === 'number' && typeof x.p === 'number';
}
