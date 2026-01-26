import 'reflect-metadata';
import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { TOKENS } from './common/types/common.types';
import { ExceptionFilters, type IExceptionFilters } from './errors';
import { FavoritesController, type IFavoritesController } from './favorites';
import { type ILogger, LoggerService } from './logger';
import { type IWeatherController, WeatherController } from './weather';

const appBindings = new ContainerModule((options) => {
    options.bind<ILogger>(TOKENS.Logger).to(LoggerService);
    options.bind<IWeatherController>(TOKENS.WeatherController).to(WeatherController);
    options.bind<IFavoritesController>(TOKENS.FavoritesController).to(FavoritesController);
    options.bind<IExceptionFilters>(TOKENS.ExceptionFilters).to(ExceptionFilters);
    options.bind<App>(TOKENS.Application).to(App);
});

const init = async () => {
    const appContainer = new Container();
    await appContainer.load(appBindings);

    const app = appContainer.get<App>(TOKENS.Application);
    await app.init();
};

init();
