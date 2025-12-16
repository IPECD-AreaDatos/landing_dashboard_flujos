'use client';

import { useState } from 'react';
import { SipaData } from '@/types';

interface SipaCardProps {
  data: SipaData[];
  flujoNombre: string;
}

export default function SipaCard({ data, flujoNombre }: SipaCardProps) {
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

  // Agrupar por provincia y tipo de registro
  const datosAgrupados = data.reduce((acc, item) => {
    const key = `${item.id_provincia}-${item.id_tipo_registro}`;
    if (!acc[key]) {
      acc[key] = item;
    }
    return acc;
  }, {} as Record<string, SipaData>);

  const registros = Object.values(datosAgrupados);
  const provinciasUnicas = [...new Set(data.map(item => item.id_provincia))];
  const tiposRegistroUnicos = [...new Set(data.map(item => item.id_tipo_registro))];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          {registros.length} registro{registros.length !== 1 ? 's' : ''} - {provinciasUnicas.length} provincia{provinciasUnicas.length !== 1 ? 's' : ''} - {tiposRegistroUnicos.length} tipo{tiposRegistroUnicos.length !== 1 ? 's' : ''} de registro
        </p>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full mt-4 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
          >
            Ver todos los registros
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {registros.map((registro, index) => (
            <div
              key={`${registro.id_provincia}-${registro.id_tipo_registro}-${index}`}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-800">
                  Provincia {registro.id_provincia} - Tipo Registro {registro.id_tipo_registro}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Con estacionalidad</p>
                  <p className="text-lg font-bold text-emerald-600">
                    {registro.cantidad_con_estacionalidad.toLocaleString('es-AR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Sin estacionalidad</p>
                  <p className="text-lg font-bold text-emerald-700">
                    {registro.cantidad_sin_estacionalidad.toLocaleString('es-AR', {
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
            Ocultar registros
          </button>
        </div>
      )}
    </div>
  );
}

