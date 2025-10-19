export const isDivisibleBy3 = (num) => num % 3 === 0;

export const countDivisibleBy3 = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (isDivisibleBy3(i)) {
      count++;
    }
  }
  return count;
}