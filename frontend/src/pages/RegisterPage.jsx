import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5050/auth/register', {
        email,
        username,
        password,
      });
      alert('Compte créé avec succès');
    } catch (err) {
      alert('Erreur lors de la création du compte');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Créer un compte</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

<button
  onClick={handleRegister}
  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
>
  S'inscrire
</button>

        <p className="mt-4 text-sm">
          Déjà un compte ?{' '}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Connexion
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;