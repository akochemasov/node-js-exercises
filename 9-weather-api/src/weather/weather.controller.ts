import type { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController, type Lang, TOKENS } from '../common';
import { getFavorites } from '../favorites';
import type { ILogger } from '../logger';
import type { IWeatherController } from './weather.controller.interface';
import { formatWeatherResponse, getWeatherByCity, getWeatherIcon } from './weather.service';

@injectable()
export class WeatherController extends BaseController implements IWeatherController {
    constructor(@inject(TOKENS.Logger) logger: ILogger) {
        super(logger);
        this.bindRoutes([
            {
                path: '/',
                method: 'get',
                func: this.getWeather,
            },
            {
                path: '/favorites',
                method: 'get',
                func: this.getWeatherByFavorites,
            },
        ]);
    }

    async getWeather(req: Request, res: Response, _next: NextFunction): Promise<void> {
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
            }),
        );

        res.json(results.length === 1 ? results[0] : results);
    }

    async getWeatherByFavorites(req: Request, res: Response, _next: NextFunction): Promise<void> {
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
            }),
        );

        res.json(results.length === 1 ? results[0] : results);
    }
}
