'use client';

import { RipteData } from '@/types';

interface RipteCardProps {
  data: RipteData;
  flujoNombre: string;
}

export default function RipteCard({ data, flujoNombre }: RipteCardProps) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-violet-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>
      
      <div className="bg-violet-50 rounded-lg p-4">
        <p className="text-sm text-gray-600 mb-1">Valor</p>
        <p className="text-3xl font-bold text-violet-600">
          ${data.valor.toLocaleString('es-AR')}
        </p>
      </div>
    </div>
  );
}


