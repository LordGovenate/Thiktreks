'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import RegisterForm from '@/components/auth/RegisterForm';
import Link from 'next/link';

export default function RegisterPage() {
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
      <h1 className="text-3xl font-bold mb-6">Crear cuenta</h1>
      <RegisterForm />
      <p className="text-sm mt-4">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-blue-600 underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}
