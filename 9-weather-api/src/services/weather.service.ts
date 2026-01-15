import type { WeatherResponse, WeatherIconCode } from '../types/weather.type';
import type { Lang } from '../types/common.type';

const token = process.env.WEATHER_API_TOKEN;

const icons: Record<WeatherIconCode, string> = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '🌤️',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌦️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
};

export const getWeatherIcon = (icon?: string): string => {
    if (!icon) return '';
    return icons[icon as WeatherIconCode] || '';
};

export const getWeatherByCity = async (city: string, lang: Lang = 'en'): Promise<WeatherResponse> => {
    if (!token) {
        throw new Error('Weather API token is not configured');
    }

    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('units', 'metric');
    url.searchParams.append('lang', lang);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: WeatherResponse = await response.json();
    return data;
}