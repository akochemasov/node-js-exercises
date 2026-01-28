import type { Lang } from '../common';
import type { WeatherIconCode, WeatherResponse } from './weather.types';

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

export const getWeatherByCity = async (
    city: string,
    lang: Lang = 'en',
): Promise<WeatherResponse> => {
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
};

const getText = (data: WeatherResponse, icon: string, description: string, lang: Lang) => {
    if (lang === 'ru') {
        return `Текущая погода в городе ${data.name}: ${icon} ${description}, температура: ${data.main.temp}°C, ощущается как: ${data.main.feels_like}°C, влажность: ${data.main.humidity}%`;
    }
    return `Current weather in ${data.name}: ${icon} ${description}, temperature: ${data.main.temp}°C, feels like: ${data.main.feels_like}°C, humidity: ${data.main.humidity}%`;
};

export const formatWeatherResponse = (data: WeatherResponse, icon: string, lang: Lang = 'en') => {
    const description = data?.weather[0]?.description ?? '';
    return {
        city: data.name,
        icon,
        description,
        temp: data.main.temp,
        feelsLike: data.main.feels_like,
        humidity: data.main.humidity,
        text: getText(data, icon, description, lang),
    };
};
