'use client';

import { AnacData } from '@/types';

interface FlujoCardProps {
  data: AnacData;
  flujoNombre: string;
}

export default function FlujoCard({ data, flujoNombre }: FlujoCardProps) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day); // month - 1 porque Date usa 0-indexed months
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          {data.aeropuerto.toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
        
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Cantidad</p>
          <p className="text-3xl font-bold text-blue-600">{data.cantidad.toLocaleString('es-AR')}</p>
        </div>
      </div>
    </div>
  );
}

