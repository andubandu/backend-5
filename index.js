import express from 'express';
import paginate from './utils/paginate.js';
import { loadData, saveData } from './utils/dataFunctions.js';
const app = express();

app.use(express.json());

app.get('/animals', paginate, async (req, res) => {
    let data = await loadData('animals.json');
    if (req.query.color) {
        data = data.filter(animal => animal.color === req.query.color);
    }
    const start = (req.pagination.page - 1) * req.pagination.limit;
    const end = start + req.pagination.limit;
    res.json(data.slice(start, end));
});

app.post('/animals', async (req, res) => {
    let data = await loadData('animals.json');
    const animal = req.body;
    data.push(animal);
    await saveData('animals.json', data);
    res.status(201).json(animal);
});

app.delete('/animals/:id', async (req, res) => {
    if (!req.headers['x-auth-token']) {
        return res.status(403).json({ message: 'Missing authorization header' });
    }
    let data = await loadData('animals.json');
    data = data.filter(animal => animal.id !== req.params.id);
    await saveData('animals.json', data);
    res.json({ message: 'Animal deleted' });
});

app.get('/blogs', paginate, async (req, res) => {
    let data = await loadData('blogs.json');
    const start = (req.pagination.page - 1) * req.pagination.limit;
    const end = start + req.pagination.limit;
    res.json(data.slice(start, end));
});

app.post('/blogs', async (req, res) => {
    let data = await loadData('blogs.json');
    const blog = req.body;
    data.push(blog);
    await saveData('blogs.json', data);
    res.status(201).json(blog);
});

app.delete('/blogs/:id', async (req, res) => {
    if (!req.headers['x-auth-token']) {
        return res.status(403).json({ message: 'Missing authorization header' });
    }
    let data = await loadData('blogs.json');
    data = data.filter(blog => blog.id !== req.params.id);
    await saveData('blogs.json', data);
    res.json({ message: 'Blog deleted' });
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
