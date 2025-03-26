'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import LoginForm from '@/components/auth/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/dashboard'); // 🔁 Redirección si ya está logueado
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-3xl font-bold mb-6">Iniciar sesión</h1>
      <LoginForm />
      <p className="text-sm mt-4">
        ¿No tienes cuenta?{' '}
        <Link href="/register" className="text-blue-600 underline">
          Regístrate aquí
        </Link>
      </p>
    </div>
  );
}
