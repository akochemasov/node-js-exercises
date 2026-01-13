#!/usr/bin/env node

import { Command } from 'commander';
import dedent from 'dedent';
import { printError, printWeather } from './services/log.service.js';
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
        .addHelpText('after', dedent`
            \nExamples:
              weather                          Show weather for default city
              weather config token <value>     Set API token
              weather config city <value>      Set default city
              weather config lang <value>      Set language (en/ru)
        `)

    program
        .command('config <key> <value>')
        .description('Set configuration value')
        .action(async (key, value) => {
            const validKeys = Object.values(STORAGE_DICTIONARY);
            if (!validKeys.includes(key)) {
                printError('Invalid key. Valid keys are: ' + validKeys.join(', '));
                return;
            }
            await saveKeyValue(key, value);
        })

    program.action(async () => {
        await getForecast();
    });

    await program .parse(process.argv);
}

init();