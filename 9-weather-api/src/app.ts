import type { Server } from 'node:http';
import express, { type Express } from 'express';
import { inject, injectable } from 'inversify';
import { TOKENS } from './common';
import type { IExceptionFilters } from './errors';
import type { IFavoritesController } from './favorites';
import type { ILogger } from './logger';
import type { IWeatherController } from './weather';

@injectable()
export class App {
    app: Express;
    server: Server | undefined;
    port: number = 8000;

    constructor(
        @inject(TOKENS.Logger) private logger: ILogger,
        @inject(TOKENS.WeatherController) private weatherController: IWeatherController,
        @inject(TOKENS.FavoritesController) private favoritesController: IFavoritesController,
        @inject(TOKENS.ExceptionFilters) private exceptionFilters: IExceptionFilters,
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
