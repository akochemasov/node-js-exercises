import { type NextFunction, type Request, type Response } from 'express';
import type { LoggerService } from '../common';
import type { IExceptionFilters } from './exception.filters.interface';
import { HTTPError } from './http-error.class';

export class ExceptionFilters implements IExceptionFilters {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

    catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}]: ${err.message}`);
            res.status(err.status).json({ error: err.message });
        } else {
            this.logger.error(`[ExceptionFilters]: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
}
