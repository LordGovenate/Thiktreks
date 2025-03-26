'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebaseClient';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setDisplayName(user.displayName || '');
        setPhotoURL(user.photoURL || '');
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const handleSave = async () => {
    if (!user) return;

    const token = await user.getIdToken();
    await fetch(`http://localhost:5000/api/users/${user.uid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ displayName, photoURL }),
    });

    alert('Perfil actualizado ✅');
  };

  if (loading) return <p className="mt-10 text-center">Cargando perfil...</p>;
  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Tu Perfil</h1>

      <div className="mb-4">
        <label className="block font-medium mb-1">Nombre de usuario</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">Foto de perfil (URL)</label>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {photoURL && (
          <img
            src={photoURL}
            alt="Vista previa"
            className="w-24 h-24 rounded-full mt-4 border"
          />
        )}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Guardar cambios
      </button>
    </div>
  );
};

export default Profile;
