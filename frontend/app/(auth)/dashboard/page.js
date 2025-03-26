'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 px-4 md:px-8 lg:px-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          ¡Bienvenido a ThikTreks!
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Explora tu aprendizaje:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/lessons/math"><Button className="w-full">Matemáticas</Button></Link>
            <Link href="/lessons/science"><Button className="w-full">Ciencias</Button></Link>
            <Link href="/lessons/history"><Button className="w-full">Historia</Button></Link>
            <Link href="/lessons/chemistry"><Button className="w-full">Química</Button></Link>
            <Link href="/lessons/spanish"><Button className="w-full">Español</Button></Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tu progreso reciente:</h2>
          <ul className="space-y-2">
            <li>📘 Completaste <strong>"Introducción a Álgebra"</strong></li>
            <li>📗 Avanzaste en <strong>"La Revolución Francesa"</strong></li>
            <li>📙 Obtuviste <strong>10 puntos</strong> en Ciencias</li>
          </ul>
          <div className="mt-4">
            <Link href="/progress">
              <Button>Ver mi progreso completo</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
