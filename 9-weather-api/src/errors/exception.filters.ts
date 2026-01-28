import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TOKENS } from '../common';
import type { ILogger } from '../logger';
import type { IExceptionFilters } from './exception.filters.interface';
import { HTTPError } from './http-error.class';

@injectable()
export class ExceptionFilters implements IExceptionFilters {
    // @inject указывает Inversify какую зависимость внедрить из контейнера по ключу TOKENS.Logger
    constructor(@inject(TOKENS.Logger) private logger: ILogger) {}

    catch(err: Error | HTTPError, _req: Request, res: Response, _next: NextFunction) {
        if (err instanceof HTTPError) {
            this.logger.error(`[${err.context}]: ${err.message}`);
            res.status(err.status).json({ error: err.message });
        } else {
            this.logger.error(`[ExceptionFilters]: ${err.message}`);
            res.status(500).json({ error: err.message });
        }
    }
}
