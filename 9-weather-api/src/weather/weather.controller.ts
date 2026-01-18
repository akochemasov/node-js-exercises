import type { Request, Response, NextFunction } from "express";
import { BaseController, type LoggerService, type Lang } from "../common";
import { getWeatherByCity, getWeatherIcon, formatWeatherResponse } from "./weather.service";
import { getFavorites } from "../favorites/favorites.service";

export class WeatherController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {
                path: "/",
                method: "get",
                func: this.getWeather,
            },
            {
                path: "/favorites",
                method: "get",
                func: this.getWeatherByFavorites,
            }
        ]);
    }

    async getWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { city, lang } = req.query;

        if (!city) {
            res.status(400).json({ error: 'City parameter is required' });
            return;
        }

        const cities = Array.isArray(city) ? city : [city];
        const langStr = (typeof lang === 'string' ? lang : 'en') as Lang;

        const results = await Promise.all(
            cities.map(async (c) => {
                const data = await getWeatherByCity(String(c), langStr);
                return formatWeatherResponse(data, getWeatherIcon(data?.weather[0]?.icon), langStr);
            })
        );

        res.json(results.length === 1 ? results[0] : results);
    }

    async getWeatherByFavorites(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { lang } = req.query;
        const langStr = (typeof lang === 'string' ? lang : 'en') as Lang;

        const favorites = getFavorites();

        if (favorites.size === 0) {
            res.json([]);
            return;
        }

        const results = await Promise.all(
            Array.from(favorites).map(async (city) => {
                const data = await getWeatherByCity(city, langStr);
                return formatWeatherResponse(data, getWeatherIcon(data?.weather[0]?.icon), langStr);
            })
        );

        res.json(results.length === 1 ? results[0] : results);
    }
}
