import addition from './addition.js';

describe('addition', () => {
    it('should add two positive numbers', () => {
        expect(addition(2, 3)).toBe(5);
    });

    it('should add two negative numbers', () => {
        expect(addition(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
        expect(addition(5, -3)).toBe(2);
    });

    it('should handle decimal numbers', () => {
        expect(addition(2.5, 3.7)).toBeCloseTo(6.2);
    });

    it('should handle zero', () => {
        expect(addition(0, 5)).toBe(5);
        expect(addition(5, 0)).toBe(5);
    });
});