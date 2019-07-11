/**
 * author: starlee
 * Creates an array of elements split into groups the length of `size`.
 * 
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
const chunk = (array, size = 1) => {
  let length = array == null ? 0 : array.length;
  if (!length || size < 1) return []

  let index = 0,
    resIndex = 0,
    result = new Array(Math.ceil(length / size));

  while (index < length) {
    result[resIndex++] = baseSlice(array, index, (index += size))
  }

  return result
}


/**
 * author: starlee
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
const baseSlice = (array, start, end) => {
  let index = -1
  let length = array.length

  if (start < 0) start = -start > length ? 0 : (length + start)

  end = end > length ? length : end

  if (end < 0) end += length

  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let result = new Array(length)

  while (++index < length) {
    result[index] = array[index + start]
  }
  return result 
}

/**
 * author: starlee
 * flat array
 * 
 * @param {Array} array .
 * @returns {Array} Returns the new array of flat.
 * @example
 *
 * flat([['a'], ['b', 'c'], 'd']);
 * // => ['a', 'b', 'c', 'd']
 */
const flat = (array) => {
  let res = [],
    flatMap = (arr) => {
      arr.map((element, index, array) => {
        if (Object.prototype.toString.call(element).slice(8, -1) === 'Array') {
          flatMap(element);
        } else {
          res.push(element);
        }
      })
    };
  flatMap(array);
  return res;
}


module.exports = {
  chunk, 
  flat
}






