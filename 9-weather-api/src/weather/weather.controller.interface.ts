import type { Router, Request, Response, NextFunction } from "express";

export interface IWeatherController {
    readonly route: Router;

    getWeather(req: Request, res: Response, next: NextFunction): Promise<void>;
    getWeatherByFavorites(req: Request, res: Response, next: NextFunction): Promise<void>;
}
