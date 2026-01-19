import { App } from "./app";
import { WeatherController } from "./weather/weather.controller";
import { FavoritesController } from "./favorites/favorites.controller";
import { LoggerService } from "./logger/logger.service";
import { ExceptionFilters } from "./errors/exception.filters";

const init = async () => {
    const logger = new LoggerService();
    const weatherController = new WeatherController(logger);
    const favoritesController = new FavoritesController(logger);
    const exceptionFilters = new ExceptionFilters(logger);
    const app = new App(logger, weatherController, favoritesController, exceptionFilters);

    await app.init();
}

init();