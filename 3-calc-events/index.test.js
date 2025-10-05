import { EventEmitter } from 'events';

describe('calc-events', () => {
    let event;

    beforeEach(() => {
        event = new EventEmitter();

        event.on('result', (result) => result);
        event.on('additional', (arg1, arg2) => {
            event.emit('result', arg1 + arg2);
        });
        event.on('subtraction', (arg1, arg2) => {
            event.emit('result', arg1 - arg2);
        });
        event.on('multiplication', (arg1, arg2) => {
            event.emit('result', arg1 * arg2);
        });
        event.on('division', (arg1, arg2) => {
            event.emit('result', arg1 / arg2);
        });
    });

    it('should emit correct result for addition', (done) => {
        event.on('result', (result) => {
            expect(result).toBe(5);
            done();
        });
        event.emit('additional', 2, 3);
    });

    it('should emit correct result for subtraction', (done) => {
        event.on('result', (result) => {
            expect(result).toBe(2);
            done();
        });
        event.emit('subtraction', 5, 3);
    });

    it('should emit correct result for multiplication', (done) => {
        event.on('result', (result) => {
            expect(result).toBe(6);
            done();
        });
        event.emit('multiplication', 2, 3);
    });

    it('should emit correct result for division', (done) => {
        event.on('result', (result) => {
            expect(result).toBe(2);
            done();
        });
        event.emit('division', 6, 3);
    });

    it('should handle division by zero', (done) => {
        event.on('result', (result) => {
            expect(result).toBe(Infinity);
            done();
        });
        event.emit('division', 5, 0);
    });

    it('should handle decimal numbers', (done) => {
        event.on('result', (result) => {
            expect(result).toBeCloseTo(6.2);
            done();
        });
        event.emit('additional', 2.5, 3.7);
    });
});