export type Lang = 'en' | 'ru';

export const TOKENS = {
    Application: Symbol.for('Application'),
    Logger: Symbol.for('Logger'),
    WeatherController: Symbol.for('WeatherController'),
    FavoritesController: Symbol.for('FavoritesController'),
    ExceptionFilters: Symbol.for('ExceptionFilters'),
};
