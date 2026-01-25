import 'reflect-metadata';

// Контейнер для хранения экземпляров
const container = new Map<string, any>();

// Декоратор - сохраняет класс в контейнер
function Injectable(key: string) {
    return function (target: new () => any) {
        console.log(`Injectable: registering ${target.name} as "${key}"`);
        container.set(key, new target());
    }
}

// Получить зависимость из контейнера
function inject<T>(key: string): T {
    return container.get(key);
}

// === Классы ===

@Injectable('config')
class Config {
    apiUrl = 'https://api.example.com';
}

@Injectable('api')
class Api {
    private config = inject<Config>('config');

    fetch() {
        return `Fetching from ${this.config.apiUrl}`;
    }
}

// === Использование ===
const api = inject<Api>('api');
console.log(api.fetch());


//Как это DI:
// @Injectable('config') — создаёт Config и кладёт в контейнер
// @Injectable('api') — создаёт Api, который берёт Config из контейнера через inject('config')
// inject<Api>('api') — получает готовый Api из контейнера
// Api не знает как создаётся Config — просто запрашивает его по ключу. Это и есть инверсия зависимостей.