import division from './division.js';

describe('division', () => {
    it('should divide two positive numbers', () => {
        expect(division(6, 3)).toBe(2);
    });

    it('should divide two negative numbers', () => {
        expect(division(-6, -3)).toBe(2);
    });

    it('should divide positive and negative numbers', () => {
        expect(division(6, -3)).toBe(-2);
    });

    it('should handle decimal numbers', () => {
        expect(division(5, 2)).toBeCloseTo(2.5);
    });

    it('should handle division by zero (returns Infinity)', () => {
        expect(division(5, 0)).toBe(Infinity);
    });

    it('should handle zero divided by number', () => {
        expect(division(0, 5)).toBe(0);
    });
});