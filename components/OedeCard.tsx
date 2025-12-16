'use client';

import { useState } from 'react';
import { OedeData } from '@/types';

interface OedeCardProps {
  data: OedeData[];
  flujoNombre: string;
}

export default function OedeCard({ data, flujoNombre }: OedeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Usar la fecha del primer elemento
  const fechaData = data[0];
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

  // Agrupar por categoría
  const datosPorCategoria = data.reduce((acc, item) => {
    const key = item.id_categoria;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, OedeData[]>);

  const categorias = Object.keys(datosPorCategoria);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-rose-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {data.length} registro{data.length !== 1 ? 's' : ''} - {categorias.length} categoría{categorias.length !== 1 ? 's' : ''}
        </p>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-4 px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-semibold"
          >
            Ver todos los registros
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {categorias.map((categoria) => (
            <div key={categoria} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Categoría {categoria}
              </p>
              <div className="space-y-2">
                {datosPorCategoria[categoria].map((item, index) => (
                  <div
                    key={`${categoria}-${item.id_subcategoria}-${index}`}
                    className="bg-white rounded p-3 border border-gray-100"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="text-xs text-gray-600 mb-1">
                          Subcategoría {item.id_subcategoria}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <p className="text-lg font-bold text-rose-600">
                          {item.valor.toLocaleString('es-AR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Ocultar registros
          </button>
        </div>
      )}
    </div>
  );
}


