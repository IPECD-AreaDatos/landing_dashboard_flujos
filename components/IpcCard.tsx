'use client';

import { useState } from 'react';
import { IpcData } from '@/types';

interface IpcCardProps {
  data: IpcData[];
  flujoNombre: string;
}

export default function IpcCard({ data, flujoNombre }: IpcCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filtrar solo los registros donde categoria, division y subdivision son "Nivel general"
  const datosNivelGeneral = data.filter(
    item => 
      item.categoria === 'Nivel general' &&
      item.division === 'Nivel general' &&
      item.subdivision === 'Nivel general'
  );

  // Agrupar por región
  const datosPorRegion = datosNivelGeneral.reduce((acc, item) => {
    if (!acc[item.region]) {
      acc[item.region] = item;
    }
    return acc;
  }, {} as Record<string, IpcData>);

  const regiones = Object.values(datosPorRegion);

  // Usar la fecha del primer elemento
  const fechaData = regiones[0];
  if (!fechaData) {
    // Si no hay datos filtrados, mostrar un mensaje
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-500">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
          <p className="text-sm text-gray-500 mt-1">
            No se encontraron datos con "Nivel general" en categoria, division y subdivision
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Total de registros recibidos: {data.length}
          </p>
        </div>
      </div>
    );
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
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-teal-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {regiones.length} región{regiones.length !== 1 ? 'es' : ''}
        </p>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-semibold"
          >
            Ver todas las regiones
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {regiones.map((region, index) => (
            <div
              key={`${region.region}-${index}`}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    {region.region}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <p className="text-lg font-bold text-teal-600">
                    {region.valor.toLocaleString('es-AR', {
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
            Ocultar regiones
          </button>
        </div>
      )}
    </div>
  );
}

