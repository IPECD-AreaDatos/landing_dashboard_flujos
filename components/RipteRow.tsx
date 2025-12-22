'use client';

import { RipteData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface RipteRowProps {
  data: RipteData;
  flujoNombre: string;
}

export default function RipteRow({ data, flujoNombre }: RipteRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-2 bg-violet-50 px-3 py-1 rounded border border-violet-100 w-fit">
        <span className="text-violet-600 font-bold">$</span>
        <span className="font-mono text-lg font-bold text-violet-900">
          {data.valor.toLocaleString('es-AR')}
        </span>
      </div>
    </DashboardRow>
  );
}