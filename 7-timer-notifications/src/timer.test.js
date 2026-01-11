import { parseTimeUnit, timer } from './timer.js';
import { jest } from '@jest/globals';

describe('parseTimeUnit', () => {
    const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;
    const MILLISECONDS_PER_MINUTE = 60 * 1000;
    const MILLISECONDS_PER_SECOND = 1000;

    it('without arg', () => {
        expect(parseTimeUnit()).toBe(0);
    });

    it('arg string number', () => {
        expect(parseTimeUnit('10')).toBe(10);
    });

    it('arg number', () => {
        expect(parseTimeUnit(10)).toBe(10);
    });

    it('arg 1h', () => {
        expect(parseTimeUnit('1h')).toBe(MILLISECONDS_PER_HOUR);
    });

    it('arg 1m', () => {
        expect(parseTimeUnit('1m')).toBe(MILLISECONDS_PER_MINUTE);
    });

    it('arg 1s', () => {
        expect(parseTimeUnit('1s')).toBe(MILLISECONDS_PER_SECOND);
    });

    it('arg unsupported, for example 1t', () => {
        expect(parseTimeUnit('1t')).toBe(0);
    });
});

describe('timer', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should log "Timer start" immediately', () => {
        timer(['1000'], () => {});
        expect(console.log).toHaveBeenCalledWith('Timer start');
    });

    it('should log "Timer stop" after 1000ms', () => {
        timer(['1000'], () => {});

        expect(console.log).toHaveBeenCalledWith('Timer start');
        expect(console.log).not.toHaveBeenCalledWith('Timer stop');

        jest.advanceTimersByTime(1000);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with hours', () => {
        timer(['1h'], () => {});

        jest.advanceTimersByTime(60 * 60 * 1000);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with minutes', () => {
        timer(['5m'], () => {});

        jest.advanceTimersByTime(5 * 60 * 1000);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with seconds', () => {
        timer(['30s'], () => {});

        jest.advanceTimersByTime(30 * 1000);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with combined time 1h 5m 30s', () => {
        timer(['1h', '5m', '30s'], () => {});

        const totalMs = (60 * 60 * 1000) + (5 * 60 * 1000) + (30 * 1000);
        jest.advanceTimersByTime(totalMs);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with combined time 1h 10s', () => {
        timer(['1h', '10s'], () => {}); 

        const totalMs = (60 * 60 * 1000) + (10 * 1000);
        jest.advanceTimersByTime(totalMs);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should work with combined time 5m 10s', () => {
        timer(['5m', '10s'], () => {});

        const totalMs = (5 * 60 * 1000) + (10 * 1000);
        jest.advanceTimersByTime(totalMs);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });

    it('should handle invalid time format', () => {
        timer(['1t'], () => {});

        jest.advanceTimersByTime(0);

        expect(console.log).toHaveBeenCalledWith('Timer stop');
    });
});

