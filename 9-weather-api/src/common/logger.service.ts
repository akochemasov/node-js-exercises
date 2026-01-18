import { Logger } from 'tslog';

export class LoggerService {
    public logger: Logger<object>;

    constructor() {
        this.logger = new Logger({
            hideLogPositionForProduction: true,
        });
    }

    log(...args: unknown[]): void {
        this.logger.info(...args);
    }

    error(...args: unknown[]): void {
        // отправка ошибок в sentry
        this.logger.error(...args);
    }

    warn(...args: unknown[]): void {
        this.logger.warn(...args);
    }
}
