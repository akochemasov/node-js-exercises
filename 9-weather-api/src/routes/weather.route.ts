import { Router } from 'express';
import { getWeatherByCity, getWeatherIcon } from '../services/weather.service';
import type { Lang } from '../types/common.type';
import { getFavorites } from '../services/favorites.service';
import { formatWeatherResponse } from '../utils/format.util';

const router = Router();

router.get('/', async (req, res) => {
    const { city, lang } = req.query;

    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    const cities = Array.isArray(city) ? city : [city];
    const langStr = (typeof lang === 'string' ? lang : 'en') as Lang;

    const results = await Promise.all(
        cities.map(async(c) => {
            const data = await getWeatherByCity(String(c), langStr);
            return formatWeatherResponse(data, getWeatherIcon(data?.weather[0]?.icon), langStr);
        }
    ));

    res.json(results.length === 1 ? results[0] : results);
});

router.get('/favorites', async (req, res) => {
    const { lang } = req.query;
    const langStr = (typeof lang === 'string' ? lang : 'en') as Lang;

    const favorites = getFavorites();

    if (favorites.size === 0) {
        return res.json([]);
    }

    const results = await Promise.all(
        Array.from(favorites).map(async (city) => {
            const data = await getWeatherByCity(city, langStr);
            return formatWeatherResponse(data, getWeatherIcon(data?.weather[0]?.icon), langStr);
        })
    );

    res.json(results.length === 1 ? results[0] : results);
});

export default router;