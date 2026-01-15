import type { Lang } from "../types/common.type";
import type { WeatherResponse } from "../types/weather.type";

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
