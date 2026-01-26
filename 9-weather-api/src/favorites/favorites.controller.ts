import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, TOKENS } from '../common';
import { HTTPError } from '../errors/http-error.class';
import type { ILogger } from '../logger';
import type { IFavoritesController } from './favorites.controller.interface';
import { addFavorite, getFavorites, removeFavorite } from './favorites.service';

@injectable()
export class FavoritesController extends BaseController implements IFavoritesController {
    constructor(@inject(TOKENS.Logger) logger: ILogger) {
        super(logger);
        this.bindRoutes([
            {
                path: '/',
                method: 'get',
                func: this.list,
            },
            {
                path: '/',
                method: 'post',
                func: this.add,
            },
            {
                path: '/:city',
                method: 'delete',
                func: this.remove,
            },
        ]);
    }

    list(_req: Request, _ress: Response, next: NextFunction): void {
        // res.json(Array.from(getFavorites()));
        next(new HTTPError(501, 'Not implemented', 'FavoritesController'));
    }

    add(req: Request, res: Response, _next: NextFunction): void {
        const { cities } = req.body;
        if (!cities || !Array.isArray(cities)) {
            res.status(400).json({ error: 'Cities array is required' });
            return;
        }
        cities.forEach((city) => {
            addFavorite(city);
        });
        res.json({ message: 'Cities added to favorites' });
    }

    remove(req: Request, res: Response, _next: NextFunction): void {
        const city = req.params.city as string;
        if (getFavorites().has(city)) {
            removeFavorite(city);
            res.json({ message: 'City removed from favorites' });
        } else {
            res.status(404).json({ error: 'City not found in favorites' });
        }
    }
}
