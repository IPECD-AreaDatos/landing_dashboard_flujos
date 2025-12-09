'use client';

import { useState } from 'react';
import { EmaeData } from '@/types';

interface EmaeCardProps {
  data: EmaeData[];
  flujoNombre: string;
}

export default function EmaeCard({ data, flujoNombre }: EmaeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filtrar duplicados: tomar solo uno de cada sector_productivo
  const sectoresUnicos = data.reduce((acc, item) => {
    if (!acc.find(s => s.sector_productivo === item.sector_productivo)) {
      acc.push(item);
    }
    return acc;
  }, [] as EmaeData[]);

  // Usar la fecha del primer elemento
  const fechaData = sectoresUnicos[0];
  if (!fechaData) {
    return null;
  }

  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {sectoresUnicos.length} sector{sectoresUnicos.length !== 1 ? 'es' : ''} productivo{sectoresUnicos.length !== 1 ? 's' : ''}
        </p>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
          >
            Ver todos los sectores
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sectoresUnicos.map((sector, index) => (
            <div
              key={`${sector.sector_productivo}-${index}`}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    {sector.categoria_descripcion}
                  </p>
                  <p className="text-xs text-gray-500">
                    Sector {sector.sector_productivo}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-lg font-bold text-orange-600">
                    {sector.valor.toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Ocultar sectores
          </button>
        </div>
      )}
    </div>
  );
}

