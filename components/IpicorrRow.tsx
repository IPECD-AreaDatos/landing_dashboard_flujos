'use client';

import { IpicorrData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface IpicorrRowProps {
  data: IpicorrData;
  flujoNombre: string;
}

export default function IpicorrRow({ data, flujoNombre }: IpicorrRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Helper para formatear variaciones
  const renderVar = (val: number) => {
    const esPos = val >= 0;
    const txt = (val * 100).toFixed(2);
    return (
      <span className={esPos ? 'text-green-600' : 'text-red-600'}>
        {esPos ? '+' : ''}{txt}%
      </span>
    );
  };

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-3 text-sm">
        {/* Variación Mensual */}
        <div className="flex flex-col items-center bg-amber-50 px-3 py-1 rounded border border-amber-100 min-w-[80px]">
          <span className="text-[10px] text-amber-800 font-bold uppercase">Mensual</span>
          <span className="font-bold">{renderVar(data.vim_nivel_general)}</span>
        </div>

        {/* Variación Interanual */}
        <div className="flex flex-col items-center bg-orange-50 px-3 py-1 rounded border border-orange-100 min-w-[80px]">
          <span className="text-[10px] text-orange-800 font-bold uppercase">Interanual</span>
          <span className="font-bold">{renderVar(data.var_ia_nivel_general)}</span>
        </div>
      </div>
    </DashboardRow>
  );
}