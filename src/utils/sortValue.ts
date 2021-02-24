/**
 * function that sort a pseudo-random integer using Math.random() method
 * @param amplitude Range size of the generated numbers
 * @param initialValue Start point to generate values
 */
export function sortValue(amplitude:number, initialValue:number = 0) {
  return Math.floor(Math.random() * amplitude) + initialValue
}