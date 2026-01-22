'use client';

import { SmvmData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface SmvmRowProps {
  data: SmvmData;
  flujoNombre: string;
}

export default function SmvmRow({ data, flujoNombre }: SmvmRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada} fechaDato={fecha}>
      <div className="flex items-center gap-4">
        {/* Mensual */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
            <span className="text-xs font-bold text-lime-700 uppercase">Mensual:</span>
            <span className="font-mono text-xl font-bold text-gray-800">
            ${data.salario_mvm_mensual.toLocaleString('es-AR')}
            </span>
        </div>

        {/* Hora (Badge pequeña) */}
        <div className="hidden sm:flex items-center gap-1 bg-lime-50 px-2 py-1 rounded border border-lime-200 text-xs text-lime-800">
            <span>Hora:</span>
            <span className="font-bold">
                ${data.salario_mvm_hora.toLocaleString('es-AR')}
            </span>
        </div>
      </div>
    </DashboardRow>
  );
}