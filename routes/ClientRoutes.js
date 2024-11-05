// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clientController = require('../Controllers/ClientController');

// Obtener clientes con paginación
router.get('/clients', clientController.getClients);

// Crear un nuevo cliente
router.post('/clients', clientController.createClient);

// Eliminar un cliente por ID
router.delete('/clients/:id', clientController.deleteClient);

router.get('/clients/:id', clientController.getClientById);

router.put('/clients/:id', clientController.updateClient);

module.exports = router;