import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5050/auth/login', {
        email,
        password
      });
      alert(`Bienvenue ${res.data.user.username}`);
    } catch (err) {
      alert('Identifiants invalides');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-blue-600">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">Connexion à SUPCHAT</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Se connecter
        </button>

        <p className="mt-4 text-sm">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Inscription
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;