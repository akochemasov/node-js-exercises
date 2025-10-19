import { countDivisibleBy3 } from './countDivisibleBy3.js';

describe('countDivisibleBy3', () => {
    test('should return 1 for range [0, 0]', () => {
        expect(countDivisibleBy3(0, 0)).toBe(1);
    });

    test('should return 0 for range [1, 2]', () => {
        expect(countDivisibleBy3(1, 2)).toBe(0);
    });

    test('should return 1 for range [3, 3]', () => {
        expect(countDivisibleBy3(3, 3)).toBe(1);
    });

    test('should return 3 for range [1, 10]', () => {
        expect(countDivisibleBy3(1, 10)).toBe(3); // 3, 6, 9
    });

    test('should return 3 for range [-6, 0]', () => {
        expect(countDivisibleBy3(-6, 0)).toBe(3); // -6, -3, 0
    });

    test('should return 10 for range [1, 30]', () => {
        expect(countDivisibleBy3(1, 30)).toBe(10); // 3,6,9,12,15,18,21,24,27,30
    });

    test('should return 0 when start > end [10, 1]', () => {
        expect(countDivisibleBy3(10, 1)).toBe(0);
    });
});