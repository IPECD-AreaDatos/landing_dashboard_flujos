'use client';

import { DnrpaData } from '@/types';

interface DnrpaCardProps {
  vehiculo1: DnrpaData | null;
  vehiculo2: DnrpaData | null;
  flujoNombre: string;
}

export default function DnrpaCard({ vehiculo1, vehiculo2, flujoNombre }: DnrpaCardProps) {
  // Usar la fecha del primer vehículo (ambos deberían tener la misma fecha)
  const fechaData = vehiculo1 || vehiculo2;
  
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
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {vehiculo1 && (
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">Autos</h4>
            <p className="text-3xl font-bold text-purple-600">{vehiculo1.cantidad.toLocaleString('es-AR')}</p>
          </div>
        )}
        
        {vehiculo2 && (
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-800 mb-2">Motos</h4>
            <p className="text-3xl font-bold text-indigo-600">{vehiculo2.cantidad.toLocaleString('es-AR')}</p>
          </div>
        )}
      </div>
    </div>
  );
}

