# Weather CLI

Weather forecast CLI powered by [OpenWeatherMap API](https://openweathermap.org/api)

# Commands

## Configuration

Show config

```bash
weather config
```

Set API token

```bash
weather config token <value>
```

Set default city

```bash
weather config city <value>
```

Set display language. Available: `en` (English), `ru` (Russian)

```bash
weather config lang <value>
```

## Commands

Add city to saved cities

```bash
weather add Moscow
weather add "New York"  # Use quotes for cities with spaces
```

Remove city from saved cities

```bash
weather remove Moscow
weather remove "New York"  # Use quotes for cities with spaces
```

Show weather for all favorite cities

```bash
weather list
```

## Weather Display

Current weather for default city

```bash
weather
```

Help information

```bash
weather -h
```
