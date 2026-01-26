import type { NextFunction, Request, Response, Router } from 'express';

export interface IFavoritesController {
    readonly route: Router;

    list(req: Request, res: Response, next: NextFunction): void;
    add(req: Request, res: Response, next: NextFunction): void;
    remove(req: Request, res: Response, next: NextFunction): void;
}
