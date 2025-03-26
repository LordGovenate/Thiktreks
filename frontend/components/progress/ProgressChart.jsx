'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleData = [
  { name: 'Semana 1', puntos: 10 },
  { name: 'Semana 2', puntos: 30 },
  { name: 'Semana 3', puntos: 50 },
  { name: 'Semana 4', puntos: 70 },
];

export default function ProgressChart() {
  return (
    <div className="bg-white rounded shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-2">Progreso de puntos</h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={sampleData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="puntos" stroke="#3b82f6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
