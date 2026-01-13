#!/usr/bin/env node

import { Command } from 'commander';
import dedent from 'dedent';
import { printError, printInfo, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';
import { getWeatherByCity, getWeatherIcon } from './services/api.service.js';

const getForecast = async () => {
    try {
        const city = await getKeyValue(STORAGE_DICTIONARY.city);
        const token = await getKeyValue(STORAGE_DICTIONARY.token);
        const lang = await getKeyValue(STORAGE_DICTIONARY.lang) || 'en';

        if (!token) {
            throw new Error('API token is not set. Use: weather -t YOUR_API_TOKEN');    
        }

        if (!city) {
            throw new Error('City is not set. Use: weather -s CITY_NAME');
        }

        const data = await getWeatherByCity(city, token, lang);
        printWeather(data, getWeatherIcon(data.weather[0].icon), lang);
    } catch (error) {
        printError(error);
    }
}

const init = async () => {
    const program = new Command();
    program
        .name('weather')
        .description('CLI utility to get current weather')
        .option('-s, --city <city>', 'set city')
        .option('-t, --token <token>', 'set API token')
        .option('-l, --lang <lang>', 'set language')
        .parse(process.argv);

    const opts = program.opts();

    if (opts.info) {
        printInfo();
    }
    if (opts.city) {
        await saveKeyValue(STORAGE_DICTIONARY.city, opts.city);
    }
    if (opts.token) {
        await saveKeyValue(STORAGE_DICTIONARY.token, opts.token);
    }
    if (opts.lang) {
        await saveKeyValue(STORAGE_DICTIONARY.lang, opts.lang);
    }
    if (opts.city || opts.token || opts.lang) {
        return;
    }

    getForecast();
}

init();