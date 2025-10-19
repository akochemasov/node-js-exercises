import { isDivisibleBy3 } from './isDivisibleBy3.js';

describe('isDivisibleBy3', () => {
    test('should return true for numbers divisible by 3', () => {
        expect(isDivisibleBy3(0)).toBe(true);
        expect(isDivisibleBy3(3)).toBe(true);
        expect(isDivisibleBy3(6)).toBe(true);
        expect(isDivisibleBy3(9)).toBe(true);
        expect(isDivisibleBy3(-3)).toBe(true);
        expect(isDivisibleBy3(-6)).toBe(true);
    });

    test('should return false for numbers not divisible by 3', () => {
        expect(isDivisibleBy3(1)).toBe(false);
        expect(isDivisibleBy3(2)).toBe(false);
        expect(isDivisibleBy3(4)).toBe(false);
        expect(isDivisibleBy3(5)).toBe(false);
        expect(isDivisibleBy3(-1)).toBe(false);
        expect(isDivisibleBy3(-4)).toBe(false);
    });

    test('should handle decimal numbers', () => {
        expect(isDivisibleBy3(3.0)).toBe(true);
        expect(isDivisibleBy3(3.1)).toBe(false);
        expect(isDivisibleBy3(3.5)).toBe(false);
    });
});