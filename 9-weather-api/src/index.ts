import "reflect-metadata";
import { Container } from "inversify";
import { App } from "./app";
import { WeatherController } from "./weather";
import { FavoritesController } from "./favorites";
import { LoggerService, type ILogger } from "./logger";
import { ExceptionFilters, type IExceptionFilters } from "./errors";
import { TOKENS } from "./common/types/common.types";

const init = async () => {
    // Manual DI
    // const logger = new LoggerService();
    // const weatherController = new WeatherController(logger);
    // const favoritesController = new FavoritesController(logger);
    // const exceptionFilters = new ExceptionFilters(logger);
    // const app = new App(logger, weatherController, favoritesController, exceptionFilters);
    // await app.init();

    // DI with Inversify
    const appContainer = new Container();
    // правильнно указывать интерфейсы для привязки (создать если нет)
    appContainer.bind<ILogger>(TOKENS.Logger).to(LoggerService);
    // если нет интерфейса, то можно указывать класс
    appContainer.bind<WeatherController>(TOKENS.WeatherController).to(WeatherController);
    appContainer.bind<FavoritesController>(TOKENS.FavoritesController).to(FavoritesController);
    appContainer.bind<IExceptionFilters>(TOKENS.ExceptionFilters).to(ExceptionFilters);
    // можно опустить дженерик, т.к. класс уже содержит типы для конструктора
    // appContainer.bind(TOKENS.WeatherController).to(WeatherController);
    appContainer.bind<App>(TOKENS.Application).to(App);

    const app = appContainer.get<App>(TOKENS.Application);
    await app.init();
}

init();