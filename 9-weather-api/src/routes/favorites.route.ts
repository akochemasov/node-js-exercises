import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../services/favorites.service';

const router = Router();

router.get('/', async (req, res) => {
    res.json(Array.from(getFavorites()));
});

router.post('/', async (req, res) => {
    const { cities } = req.body;
    if (!cities || !Array.isArray(cities)) {
        return res.status(400).json({ error: 'Cities array is required' });
    }
    cities.forEach(city => addFavorite(city));
    res.json({ message: 'Cities added to favorites' });
});

router.delete('/:city', async (req, res) => {
    const { city } = req.params;
    if (getFavorites().has(city)) {
        removeFavorite(city);
        res.json({ message: 'City removed from favorites' });
    } else {
        res.status(404).json({ error: 'City not found in favorites' });
    }
});

export default router;