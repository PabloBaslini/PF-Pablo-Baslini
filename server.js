const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/nosotros.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/contacto.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/productos.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, './pages/servicios.html'));
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});