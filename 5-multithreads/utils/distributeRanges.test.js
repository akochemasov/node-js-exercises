import { distributeRanges } from './distributeRanges.js';

const coveredNumbers = (ranges) => {
    const nums = [];
    for (const { start, end } of ranges) {
        if (start <= end) {
            for (let n = start; n <= end; n++) {
                nums.push(n);
            }
        }
    }
    return nums;
};

describe('distributeRanges', () => {
    test('should evenly distribute 10 numbers into 2 parts', () => {
        const ranges = distributeRanges(10, 2);
        expect(ranges).toEqual([
            { start: 1, end: 5 },
            { start: 6, end: 10 }
        ]);
    });

    test('should distribute 10 numbers into 3 parts with remainder in last part', () => {
        const ranges = distributeRanges(10, 3);
        expect(ranges).toEqual([
            { start: 1, end: 3 },
            { start: 4, end: 6 },
            { start: 7, end: 10 }
        ]);
        expect(coveredNumbers(ranges)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    test('should cover all numbers from 1 to total without gaps or overlaps', () => {
        const ranges = distributeRanges(9, 4);

        expect(ranges[ranges.length - 1].end).toBe(9);

        // Check ranges are contiguous
        for (let i = 0; i < ranges.length - 1; i++) {
            expect(ranges[i].end + 1).toBe(ranges[i + 1].start);
        }

        expect(coveredNumbers(ranges)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    test('should handle edge case: more parts than numbers', () => {
        const ranges = distributeRanges(7, 10);

        expect(ranges).toHaveLength(10);
        expect(ranges[ranges.length - 1].end).toBe(7);
        expect(coveredNumbers(ranges)).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    test('should handle single number in single part', () => {
        expect(distributeRanges(1, 1)).toEqual([{ start: 1, end: 1 }]);
    });

    test('should handle zero total', () => {
        const ranges = distributeRanges(0, 3);
        expect(ranges).toHaveLength(3);
        expect(ranges[ranges.length - 1].end).toBe(0);
        expect(coveredNumbers(ranges)).toEqual([]);
    });
});