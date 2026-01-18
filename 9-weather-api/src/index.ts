import { App } from "./app";
import { WeatherController } from "./weather/weather.controller";
import { FavoritesController } from "./favorites/favorites.controller";
import { LoggerService } from "./common/logger.service";

const init = async () => {
    const logger = new LoggerService();
    const weatherController = new WeatherController(logger);
    const favoritesController = new FavoritesController(logger);
    const app = new App(logger, weatherController, favoritesController);

    await app.init();
}

init();