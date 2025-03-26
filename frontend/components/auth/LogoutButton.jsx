'use client';

import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirigir al login después de salir
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Cerrar sesión
    </button>
  );
}
