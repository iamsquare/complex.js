/**
 * Cartesian Coordinate type definition
 */
type Cartesian = {
  x: number;
  y: number;
};

/**
 * An helper function that checks if an object is a Cartesian coordinate.
 * @param x
 */
function isCartesian(x: any): x is Cartesian {
  if (x === undefined) return false;
  return x.x !== undefined && x.y !== undefined;
}

/**
 * Polar coordinate type definition
 */
type Polar = {
  r: number;
  p: number;
};

/**
 * An helper function that checks if an object is a Polar coordinate.
 * @param x
 */
function isPolar(x: any): x is Polar {
  if (x === undefined) return false;
  return x.r !== undefined && x.p !== undefined;
}

export { Cartesian, isCartesian, Polar, isPolar };
