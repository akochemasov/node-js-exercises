import express, { type Express } from 'express';
import { Server } from 'http';
import { type LoggerService } from './common/logger.service';
import type { WeatherController } from './weather/weather.controller';
import type { FavoritesController } from './favorites/favorites.controller';

export class App {
    app: Express;
    server: Server | undefined;
    port: number = 8000;
    logger: LoggerService;
    weatherController: WeatherController;
    favoritesController: FavoritesController;

    constructor(logger: LoggerService, weatherController: WeatherController, favoritesController: FavoritesController) {
        this.app = express();
        this.app.use(express.json());
        this.logger = logger;
        this.weatherController = weatherController;
        this.favoritesController = favoritesController;
    }

    useRoutes() {
        this.app.use('/weather', this.weatherController.route);
        this.app.use('/favorites', this.favoritesController.route);
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}