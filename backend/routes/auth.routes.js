const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 📥 Route d’inscription
router.post('/register', async (req, res) => {
  const { email, username, password } = req.body;

  console.log('Requête reçue sur /register', req.body);

  if (!email || !username || !password) {
    return res.status(400).json({ error: 'Champs requis manquants' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email déjà utilisé' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hashed });

    res.status(201).json({ message: 'Utilisateur créé', user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    console.error('Erreur inscription :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// 🔑 Route de connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Tentative de connexion avec', email);

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Identifiants invalides' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Identifiants invalides' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token, user: { id: user._id, email: user.email, username: user.username } });
  } catch (err) {
    console.error('Erreur login :', err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;