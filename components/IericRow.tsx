'use client';

import { IericData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface IericRowProps {
  data: IericData;
  flujoNombre: string;
}

export default function IericRow({ data, flujoNombre }: IericRowProps) {
  // Parseo de fecha
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Lógica de variación
  const esPositivo = data.porcentaje_var_interanual >= 0;
  const porcentaje = (data.porcentaje_var_interanual * 100).toFixed(2);
  const colorClass = esPositivo 
    ? 'bg-green-100 text-green-700 border-green-200' 
    : 'bg-red-100 text-red-700 border-red-200';

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada} fechaDato={fecha}>
      <div className="flex items-center gap-4">
        {/* Cantidad de empresas */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Empresas:</span>
          <span className="font-mono font-bold text-gray-800 text-lg">
            {data.cant_empresas.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Variación Interanual (Chip) */}
        <div className={`px-2 py-1 rounded-md border text-xs font-bold flex items-center gap-1 ${colorClass}`}>
          <span>{esPositivo ? '▲' : '▼'}</span>
          <span>{porcentaje}% IA</span>
        </div>
      </div>
    </DashboardRow>
  );
}