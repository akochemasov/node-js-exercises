# Weather API

REST API for weather forecast powered by [OpenWeatherMap API](https://openweathermap.org/api)

## Routes

### Weather

**GET** `/weather?city=london&lang=ru` — get weather for a single city

**GET** `/weather?city=london&city=new%20york&lang=ru` — get weather for multiple cities

Response:

```json
{
  "city": "London",
  "country": "GB",
  "temp": 15.5,
  "feels_like": 14.2,
  "humidity": 72,
  "pressure": 1015,
  "wind_speed": 3.5,
  "description": "cloudy",
  "icon": "☁️"
}
```

---

**GET** `/weather/favorites` — get weather for all favorite cities

Response: array of weather objects (see above)

---

### Favorites

**GET** `/favorites` — get list of favorite cities

Response:

```json
{
  "cities": ["london", "new york", "moscow"]
}
```

---

**POST** `/favorites` — add cities to favorites

Request:

```json
{
  "cities": ["london", "new york"]
}
```

---

**DELETE** `/favorites/{city}` — remove city from favorites

---

### Error

```json
{
  "error": "City not found"
}
```