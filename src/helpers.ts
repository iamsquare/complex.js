/**
 * Cartesian Coordinate type definition
 */
export type Cartesian = {
  x: number;
  y: number;
};

/**
 * An helper function that checks if an object is a Cartesian coordinate
 *
 * @export
 * @param x
 */
export function isCartesian(x: any): x is Cartesian {
  if (x === undefined) return false;
  return x.x !== undefined && x.y !== undefined;
}

/**
 * Polar coordinate type definition
 */
export type Polar = {
  r: number;
  p: number;
};

/**
 * An helper function that checks if an object is a Polar coordinate
 *
 * @export
 * @param x
 */
export function isPolar(x: any): x is Polar {
  if (x === undefined) return false;
  return x.r !== undefined && x.p !== undefined;
}
