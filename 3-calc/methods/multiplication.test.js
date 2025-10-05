import multiplication from './multiplication.js';

describe('multiplication', () => {
    it('should multiply two positive numbers', () => {
        expect(multiplication(2, 3)).toBe(6);
    });

    it('should multiply two negative numbers', () => {
        expect(multiplication(-2, -3)).toBe(6);
    });

    it('should multiply positive and negative numbers', () => {
        expect(multiplication(2, -3)).toBe(-6);
    });

    it('should handle decimal numbers', () => {
        expect(multiplication(2.5, 4)).toBeCloseTo(10);
    });

    it('should handle zero', () => {
        expect(multiplication(0, 5)).toBe(0);
        expect(multiplication(5, 0)).toBe(0);
    });
});