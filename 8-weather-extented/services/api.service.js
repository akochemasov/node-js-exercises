export const getWeatherIcon = (icon) => {
    const icons = {
        '01d': '☀️',
        '01n': '🌙',
        '02d': '🌤️',
        '02n': '☁️',
        '03d': '☁️',
        '03n': '☁️',
        '04d': '☁️',
        '04n': '☁️',
        '09d': '🌧️',
        '09n': '🌧️',
        '10d': '🌦️',
        '10n': '🌦️',
        '11d': '⛈️',
        '11n': '⛈️',
        '13d': '❄️',
        '13n': '❄️'
    };
    return icons[icon] || '';
};

export const getWeatherByCity = async(city, token, lang = 'en') => {
    const url = new URL('https://api.openweathermap.org/data/2.5/weather');
    url.searchParams.append('q', city);
    url.searchParams.append('appid', token);
    url.searchParams.append('units', 'metric');
    url.searchParams.append('lang', lang);

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(response)
    return data;
}