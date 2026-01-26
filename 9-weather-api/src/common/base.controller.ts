import { type Response, Router } from 'express';
import { injectable } from 'inversify';
import type { ILogger } from '../logger';
import type { RouteConfig } from './types/route.types';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(private loggerService: ILogger) {
        this._router = Router();
    }

    get route(): Router {
        return this._router;
    }

    public send<T>(res: Response, code: number, message?: T) {
        res.status(code);
        res.type('application/json').json(message);
    }

    public ok<T>(res: Response, message?: T) {
        this.send<T>(res, 200, message);
    }

    public created(res: Response) {
        res.sendStatus(201);
    }

    protected bindRoutes(routes: RouteConfig[]): void {
        routes.forEach((route) => {
            this.loggerService.log(
                `Binding route [${this.constructor.name}] ${route.method} ${route.path}`,
            );
            const handler = route.func.bind(this);
            this._router[route.method](route.path, handler);
        });
    }
}
