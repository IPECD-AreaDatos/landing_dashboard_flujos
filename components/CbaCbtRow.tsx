'use client';

import { CbaCbtData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface CbaCbtRowProps {
  data: CbaCbtData;
  flujoNombre: string;
}

export default function CbaCbtRow({ data, flujoNombre }: CbaCbtRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-4 text-sm">
        {/* Bloque CBA */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
          <span className="font-bold text-green-600 text-xs uppercase">CBA (Hogar):</span>
          <span className="font-mono font-bold text-gray-800">
            ${data.cba_hogar.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Separador visual */}
        <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>

        {/* Bloque CBT */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
          <span className="font-bold text-blue-600 text-xs uppercase">CBT (Hogar):</span>
          <span className="font-mono font-bold text-gray-800">
            ${data.cbt_hogar.toLocaleString('es-AR')}
          </span>
        </div>
      </div>
    </DashboardRow>
  );
}