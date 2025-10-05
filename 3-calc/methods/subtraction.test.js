import subtraction from './subtraction.js';

describe('subtraction', () => {
    it('should subtract two positive numbers', () => {
        expect(subtraction(5, 3)).toBe(2);
    });

    it('should subtract two negative numbers', () => {
        expect(subtraction(-5, -3)).toBe(-2);
    });

    it('should subtract negative from positive', () => {
        expect(subtraction(5, -3)).toBe(8);
    });

    it('should handle decimal numbers', () => {
        expect(subtraction(5.5, 2.3)).toBeCloseTo(3.2);
    });

    it('should handle zero', () => {
        expect(subtraction(5, 0)).toBe(5);
        expect(subtraction(0, 5)).toBe(-5);
    });
});