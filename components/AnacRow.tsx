'use client';

import { AnacData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface AnacRowProps {
  data: AnacData;
  flujoNombre: string; // Ej: "ANAC"
}

export default function AnacRow({ data, flujoNombre }: AnacRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center justify-between w-full sm:w-auto gap-4">
        
        {/* Chip del Aeropuerto */}
        <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs font-bold uppercase tracking-wider">
          {data.aeropuerto}
        </span>

        {/* Valor Numérico */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="text-xs text-gray-400 sm:hidden">Cantidad:</span>
            <span className="text-lg font-mono font-bold text-gray-800">
            {data.cantidad.toLocaleString('es-AR')}
            </span>
        </div>
      </div>
    </DashboardRow>
  );
}