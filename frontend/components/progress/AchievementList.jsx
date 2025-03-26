'use client';

export default function AchievementList() {
  const achievements = [
    { id: 1, title: '💯 Primer 100 puntos' },
    { id: 2, title: '📚 5 lecciones completadas' },
    { id: 3, title: '🔥 Racha de 7 días' },
  ];

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">Logros obtenidos</h2>
      <ul className="list-disc pl-5 space-y-1 text-sm">
        {achievements.map((a) => (
          <li key={a.id}>{a.title}</li>
        ))}
      </ul>
    </div>
  );
}
