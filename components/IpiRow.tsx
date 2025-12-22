'use client';

import { IpiData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface IpiRowProps {
  data: IpiData;
  flujoNombre: string;
}

export default function IpiRow({ data, flujoNombre }: IpiRowProps) {
  // Parseo de fecha
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Formato Variación Mensual
  const varValor = data.var_mensual_ipi_manufacturero;
  const esPositivo = varValor >= 0;
  const varTexto = (varValor * 100).toFixed(2);
  const colorClass = esPositivo ? 'text-green-600' : 'text-red-600';

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-4">
        {/* Valor Absoluto */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
          <span className="text-xs font-bold text-gray-500 uppercase">Manufacturero:</span>
          <span className="font-mono font-bold text-gray-800">
            {data.ipi_manufacturero.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>

        {/* Variación Mensual */}
        <div className="flex items-center text-xs font-bold bg-gray-50 px-2 py-1 rounded border border-gray-200">
           <span className="text-gray-400 mr-1">Mensual:</span>
           <span className={colorClass}>
             {esPositivo ? '+' : ''}{varTexto}%
           </span>
        </div>
      </div>
    </DashboardRow>
  );
}