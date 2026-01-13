import chalk from 'chalk';
import dedent from 'dedent';

export const printError = (error) => {
    console.log(`${chalk.bgRed(' ERROR ')} ${error}`);
}

export const printSuccess = (message) => {
    console.log(`${chalk.bgGreen(' SUCCESS ')} ${message}`);
}

export const printInfo = (message) => {
    console.log(`${chalk.bgBlue(' INFO ')} ${message}`);
}

export const printWeather = (data, icon) => {
    printSuccess(dedent
        `
        \nCurrent weather in ${data.name}: 
        - ${icon}  ${data.weather[0].description}
        - temperature: ${data.main.temp}°C, feels like: ${data.main.feels_like}°C
        - humidity: ${data.main.humidity}%
        `
    );
}
