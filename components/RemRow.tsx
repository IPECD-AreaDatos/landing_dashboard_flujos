'use client';

import { RemData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface RemRowProps {
  data: RemData;
  flujoNombre: string;
}

export default function RemRow({ data, flujoNombre }: RemRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada} fechaDato={fecha}>
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
        <span className="text-xs font-bold text-slate-500 uppercase">Cambio Nominal:</span>
        <span className="font-mono text-xl font-bold text-slate-700">
          ${data.cambio_nominal.toLocaleString('es-AR', {
            minimumFractionDigits: 2, maximumFractionDigits: 2
          })}
        </span>
      </div>
    </DashboardRow>
  );
}