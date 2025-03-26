'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import LogoutButton from '@/components/auth/LogoutButton';
import ProgressChart from '@/components/progress/ProgressChart';
import AchievementList from '@/components/progress/AchievementList';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        setUser(user);
        setToken(idToken);
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
      } else {
        setUser(null);
        setToken('');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (token) {
      fetch('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const usersList = Object.entries(data.users || {}).map(([uid, user]) => ({
            uid,
            ...user,
          }));
          setUsuarios(usersList);
        })
        .catch((err) => console.error('Error al obtener usuarios:', err))
        .finally(() => setLoading(false));
    }
  }, [token]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);

    try {
      await fetch(`http://localhost:5000/api/users/${user.uid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayName, photoURL }),
      });
      alert('Perfil actualizado ✅');
    } catch (err) {
      console.error('Error al guardar perfil:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando dashboard...</p>;
  if (!user) return <p className="text-center mt-10">No estás autenticado.</p>;

  const avatar = photoURL || 'https://i.pravatar.cc/100';

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <img
            src={avatar}
            alt="Avatar"
            className="w-12 h-12 rounded-full border shadow"
          />
          <div>
            <h1 className="text-xl font-bold">
              {displayName || user.email}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      {/* Editor de perfil */}
      <div className="bg-white p-4 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Editar perfil</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Foto de perfil (URL)</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? 'Guardando...' : 'Guardar cambios'}
        </button>
      </div>

      {/* Progreso */}
      <ProgressChart />
      <AchievementList />
    </div>
  );
};

export default Dashboard;
