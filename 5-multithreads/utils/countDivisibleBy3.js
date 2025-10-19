import { isDivisibleBy3 } from './index.js';

export const countDivisibleBy3 = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (isDivisibleBy3(i)) {
      count++;
    }
  }
  return count;
}