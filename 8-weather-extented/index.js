#!/usr/bin/env node

import { Command } from 'commander';
import dedent from 'dedent';
import { printError, printInfo, printWeather } from './services/log.service.js';
import { getAllConfig, getKeyValue, saveKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';
import { getWeatherByCity, getWeatherIcon } from './services/api.service.js';

const getForecast = async (cities = '') => {
    try {
        const token = await getKeyValue(STORAGE_DICTIONARY.token);
        const lang = await getKeyValue(STORAGE_DICTIONARY.lang) || 'en';

        if (!token) {
            throw new Error('API token is not set. Use: weather config token YOUR_API_TOKEN');
        }

        if (!cities) {
            throw new Error('City is not set. Use: weather config city CITY_NAME');
        }

        for (const city of cities.split(',')) {
            const data = await getWeatherByCity(city, token, lang);
            printWeather(data, getWeatherIcon(data.weather[0].icon), lang);
        }
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
              weather config                   Show all configuration
              weather config token <value>     Set API token
              weather config city <value>      Set default city
              weather config lang <value>      Set language (en/ru)
              weather add Moscow               Add city to saved cities
              weather remove Moscow            Remove city from saved cities
              weather list                     Show weather for all saved cities
        `);

    program
        .command('config [key] [value]')
        .description('Set configuration value')
        .action(async (key, value) => {
            if (!key || !value) {
                const config = await getAllConfig();
                if (config) {
                    printInfo(`Current configuration: \n${JSON.stringify(config, null, 2)}`);
                } else {
                    printError('No configuration found.');
                }
                return;
            }

            const validKeys = Object.values(STORAGE_DICTIONARY);
            if (!validKeys.includes(key)) {
                printError('Invalid key. Valid keys are: ' + validKeys.join(', '));
                return;
            }
            await saveKeyValue(key, value);
        });

    program
        .command('list')
        .description('Show weather for all saved cities')
        .action(async () => {
            const cities = await getKeyValue(STORAGE_DICTIONARY.cities);
            if (cities) {
                await getForecast(cities);
            } else {
                printInfo('No cities saved.');
            }
        });

    program
        .command('add <city>')
        .description('Add a city to saved cities')
        .action(async (city) => {
            const cities = await getKeyValue(STORAGE_DICTIONARY.cities);
            if (cities) {
                const cityList = cities.split(',');
                if (cityList.includes(city)) {
                    printInfo(`City '${city}' is already in saved cities.`);
                } else {
                    await saveKeyValue(STORAGE_DICTIONARY.cities, `${cities},${city}`);
                    printInfo(`City '${city}' added to saved cities.`);
                }
            } else {
                await saveKeyValue(STORAGE_DICTIONARY.cities, city);
                printInfo(`City '${city}' added to saved cities.`);
            }
        });

    program
        .command('remove <city>')
        .description('Remove a city from saved cities')
        .action(async (city) => {
            const cities = await getKeyValue(STORAGE_DICTIONARY.cities);
            if (cities) {
                const cityList = cities.split(',');
                if (!cityList.includes(city)) {
                    printError(`City '${city}' not found in saved cities.`);
                    return;
                }
                const updatedCities = cityList.filter(c => c !== city).join(',');
                await saveKeyValue(STORAGE_DICTIONARY.cities, updatedCities);
                printInfo(`City '${city}' removed from saved cities.`);
            } else {
                printInfo('No cities in saved cities.');
            }
        });

    program.action(async () => {
        const city = await getKeyValue(STORAGE_DICTIONARY.city);
        await getForecast(city);
    });

    await program.parse(process.argv);
}

init();