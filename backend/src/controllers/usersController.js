const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'clinapp_secret_key_2025';

const usersController = {
  async create(req, res) {
    try {
      const { name, lastname, phone, email, password } = req.body;

      if (!name || !lastname || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
      }

      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ success: false, message: 'El correo ya esta registrado' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ name, lastname, phone, email, password: hashedPassword });

      return res.status(201).json({
        success: true,
        message: 'Usuario creado correctamente',
        data: newUser,
      });
    } catch (error) {
      console.log('Error al crear usuario:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email y contraseña son requeridos' });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        success: true,
        message: 'Inicio de sesion exitoso',
        data: {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          phone: user.phone,
          email: user.email,
          role: user.role,
          session_token: 'JWT ' + token,
        },
      });
    } catch (error) {
      console.log('Error en login:', error);
      return res.status(500).json({ success: false, message: 'Error interno del servidor' });
    }
  },
};

module.exports = usersController;
