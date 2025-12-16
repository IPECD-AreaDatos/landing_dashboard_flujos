'use client';

import { SmvmData } from '@/types';

interface SmvmCardProps {
  data: SmvmData;
  flujoNombre: string;
}

export default function SmvmCard({ data, flujoNombre }: SmvmCardProps) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-lime-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-lime-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Salario Mensual</p>
          <p className="text-3xl font-bold text-lime-600">
            ${data.salario_mvm_mensual.toLocaleString('es-AR')}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Salario Diario</p>
            <p className="text-xl font-bold text-gray-700">
              ${data.salario_mvm_diario.toLocaleString('es-AR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-xs text-gray-600 mb-1">Salario Hora</p>
            <p className="text-xl font-bold text-gray-700">
              ${data.salario_mvm_hora.toLocaleString('es-AR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

