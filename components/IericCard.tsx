'use client';

import { IericData } from '@/types';

interface IericCardProps {
  data: IericData;
  flujoNombre: string;
}

export default function IericCard({ data, flujoNombre }: IericCardProps) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Formatear el porcentaje
  const porcentajeFormateado = (data.porcentaje_var_interanual * 100).toFixed(2);
  const esPositivo = data.porcentaje_var_interanual >= 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-pink-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-pink-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Cantidad de empresas</p>
          <p className="text-3xl font-bold text-pink-600">{data.cant_empresas.toLocaleString('es-AR')}</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Variación interanual</p>
          <p className={`text-2xl font-bold ${esPositivo ? 'text-green-600' : 'text-red-600'}`}>
            {esPositivo ? '+' : ''}{porcentajeFormateado}%
          </p>
        </div>
      </div>
    </div>
  );
}




