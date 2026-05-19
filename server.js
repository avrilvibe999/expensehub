const express = require('express');
const db = require('./config/db');
const expenseRoutes = require('./routes/expenseRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', authRoutes);
app.use('/', expenseRoutes);

app.get('/', (req, res) => {
    res.render('index');
});
app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});