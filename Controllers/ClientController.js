// controllers/clientController.js
const Client = require('../models/Client');

// Obtener clientes con paginación
exports.getClients = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10; // Cambia este valor si necesitas otro límite
    const skip = (page - 1) * limit;

    const clients = await Client.find().skip(skip).limit(limit);
    const total = await Client.countDocuments();

    res.status(200).json({ clients, total });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los clientes', error });
  }
};

// Crear un nuevo cliente
exports.createClient = async (req, res) => {
  try {
    const { name, surname, email, phone, location } = req.body;

    // Validar que los campos requeridos están presentes
    if (!name || !surname || !email) {
      return res.status(400).json({ message: 'Nombre, apellido y correo electrónico son requeridos' });
    }

    const newClient = new Client({
      name,
      surname,
      email,
      phone,
      location
    });

    await newClient.save();
    console.log('Cliente guardado:', newClient); // Para depuración
    res.status(201).json({ message: 'Cliente creado con éxito', client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};

// Eliminar un cliente
exports.deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    await Client.findByIdAndDelete(clientId);
    res.status(200).json({ message: 'Cliente eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el cliente', error });
  }
};

// Obtener un cliente por ID
exports.getClientById = async (req, res) => {
    const { id } = req.params;
    try {
      const client = await Client.findById(id);
      if (!client) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener el cliente', error });
    }
  };
  // Actualizar un cliente
exports.updateClient = async (req, res) => {
    try {
      const clientId = req.params.id;
      const updatedData = req.body;
  
      const updatedClient = await Client.findByIdAndUpdate(clientId, updatedData, { new: true });
      if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.status(200).json({ message: 'Cliente actualizado con éxito', client: updatedClient });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el cliente', error });
    }
  };

