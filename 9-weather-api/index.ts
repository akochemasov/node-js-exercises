import express from 'express';
import weatherRouter from './src/routes/weather.route';
import favoritesRouter from './src/routes/favorites.route';

const app = express();
const PORT = 8000;
const HOST = 'localhost';

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/weather', weatherRouter);
app.use('/favorites', favoritesRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
}); 