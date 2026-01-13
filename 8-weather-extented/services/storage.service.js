import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';
import { printError, printInfo } from './log.service.js';

export const STORAGE_DICTIONARY = {
    token: 'token',
    city: 'city',
    lang: 'lang'
}

const configDir = join(homedir(), '.weather-cli');
const filePath = join(configDir, 'config.json');

export const saveKeyValue = async (key, value) => {
    let config = {};

    await promises.mkdir(configDir, { recursive: true });

    try {
        const data = await promises.readFile(filePath, 'utf-8');
        config = JSON.parse(data);
    } catch (error) {
        printInfo('File does not exist or is invalid, start with empty config')
    }

    config[key] = value;
    
    try {
        await promises.writeFile(
            filePath,
            JSON.stringify(config, null, 2)
        );
        printInfo(`Configuration saved: ${key} = ${value}`);
    } catch (error) {
        printError(`Error saving configuration: ${error.message}`);
    };
}

export const getKeyValue = async (key) => {
    try {
        const data = await promises.readFile(filePath, 'utf-8');
        const config = JSON.parse(data);
        return config[key];
    } catch (error) {
        printError(`Error reading configuration: ${error.message}`);
    }
}
