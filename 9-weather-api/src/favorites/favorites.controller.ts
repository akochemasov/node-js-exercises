import type { Request, Response, NextFunction } from "express";
import { BaseController, type LoggerService } from "../common";
import { addFavorite, getFavorites, removeFavorite } from "./favorites.service";

export class FavoritesController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {
                path: "/",
                method: "get",
                func: this.list,
            },
            {
                path: "/",
                method: "post",
                func: this.add,
            },
            {
                path: "/:city",
                method: "delete",
                func: this.remove,
            }
        ]);
    }

    list(req: Request, res: Response, next: NextFunction): void {
        res.json(Array.from(getFavorites()));
    }

    add(req: Request, res: Response, next: NextFunction): void {
        const { cities } = req.body;
        if (!cities || !Array.isArray(cities)) {
            res.status(400).json({ error: 'Cities array is required' });
            return;
        }
        cities.forEach(city => addFavorite(city));
        res.json({ message: 'Cities added to favorites' });
    }

    remove(req: Request, res: Response, next: NextFunction): void {
        const city = req.params.city as string;
        if (getFavorites().has(city)) {
            removeFavorite(city);
            res.json({ message: 'City removed from favorites' });
        } else {
            res.status(404).json({ error: 'City not found in favorites' });
        }
    }
}
