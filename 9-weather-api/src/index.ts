import "reflect-metadata";
import { Container, ContainerModule } from "inversify";
import { App } from "./app";
import { WeatherController, type IWeatherController } from "./weather";
import { FavoritesController, type IFavoritesController } from "./favorites";
import { LoggerService, type ILogger } from "./logger";
import { ExceptionFilters, type IExceptionFilters } from "./errors";
import { TOKENS } from "./common/types/common.types";

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
}

init();