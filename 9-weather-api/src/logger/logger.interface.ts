import type { Logger } from 'tslog';

export interface ILogger {
    logger: Logger<object>;

    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
}
