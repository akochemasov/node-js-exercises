#!/src/bin/env node

import { Command } from 'commander';
import dedent from 'dedent';
import { printError, printInfo, printWeather } from './services/log.service.js';
import { getKeyValue, saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';
import { getWeatherByCity, getWeatherIcon } from './services/api.service.js';

const getForecast = async () => {
    try {
        const city = await getKeyValue(STORAGE_DICTIONARY.city);
        const token = await getKeyValue(STORAGE_DICTIONARY.token);

        if (!token) {
            throw new Error('API token is not set. Use: weather -t YOUR_API_TOKEN');    
        }

        if (!city) {
            throw new Error('City is not set. Use: weather -s CITY_NAME');
        }

        const data = await getWeatherByCity(city, token);
        printWeather(data, getWeatherIcon(data.weather[0].icon));
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
        .option('-i, --info', 'show help information')
        .addHelpText(
            'after',
            dedent`
                \n
                No arguments:
                    Display the current weather for the saved city.

                Examples:
                    weather
                    weather -s Moscow
                    weather -t YOUR_API_TOKEN
            `
        )
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
    if (opts.city || opts.token) {
        return;
    }

    getForecast();
}

init();