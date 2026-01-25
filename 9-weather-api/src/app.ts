import express, { type Express } from 'express';
import { Server } from 'http';
import { injectable, inject } from 'inversify';
import type { WeatherController } from './weather/weather.controller';
import type { FavoritesController } from './favorites/favorites.controller';
import type { ExceptionFilters } from './errors/exception.filters';
import { TOKENS } from './common';
import type { ILogger } from './logger';

@injectable()
export class App {
    app: Express;
    server: Server | undefined;
    port: number = 8000;
    
    constructor(
        @inject(TOKENS.Logger) private logger: ILogger,
        @inject(TOKENS.WeatherController) private weatherController: WeatherController, 
        @inject(TOKENS.FavoritesController) private favoritesController: FavoritesController, 
        @inject(TOKENS.ExceptionFilters) private exceptionFilters: ExceptionFilters
    ) {
        this.app = express();
        this.app.use(express.json());    
    }

    useRoutes() {
        this.app.use('/weather', this.weatherController.route);
        this.app.use('/favorites', this.favoritesController.route);
    }

    useExceptionFilters() {
        this.app.use(this.exceptionFilters.catch.bind(this.exceptionFilters));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port, () => {
            this.logger.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}