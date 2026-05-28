const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let pedidos = [
    { id: 1, restaurante: "Restaurante Inicial", producto: "Harina", cantidad: 10, estado: "Pendiente" }
];

app.post('/login', (req, res) => {
    const { user, pass } = req.body;
    if(user === 'admin' && pass === 'admin') res.json({ role: 'admin' });
    else if(user === 'cliente' && pass === 'cliente') res.json({ role: 'cliente' });
    else res.status(401).json({ message: "Error" });
});

app.get('/pedidos', (req, res) => res.json(pedidos));

app.post('/pedidos', (req, res) => {
    const nuevo = { id: pedidos.length + 1, ...req.body, estado: "Pendiente" };
    pedidos.push(nuevo);
    res.status(201).json(nuevo);
});

app.put('/pedidos/:id', (req, res) => {
    const pedido = pedidos.find(p => p.id == req.params.id);
    if(pedido) pedido.estado = "Preparado";
    res.json(pedido);
});

app.listen(3000, () => console.log("Backend encendido en puerto 3000"));