'use client';

import { IpcData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface IpcRowProps {
  data: IpcData[];
  flujoNombre: string;
}

export default function IpcRow({ data, flujoNombre }: IpcRowProps) {
  // 1. Filtramos Nivel General
  const datosNivelGeneral = data.filter(
    item => item.categoria === 'Nivel general' && 
            item.division === 'Nivel general' && 
            item.subdivision === 'Nivel general'
  );

  // 2. Buscamos priorizar "Noreste" o "NEA", si no, tomamos el primero
  const datoPrincipal = datosNivelGeneral.find(d => d.region.includes('Noreste')) || datosNivelGeneral[0];

  if (!datoPrincipal) return null; // O retornar un Row vacío con error

  // Parseo de fecha
  const [year, month, day] = datoPrincipal.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-3">
        {/* Etiqueta de la Región mostrada */}
        <span className="px-2 py-1 bg-teal-50 text-teal-700 border border-teal-100 rounded text-xs font-bold uppercase truncate max-w-[150px]">
          {datoPrincipal.region}
        </span>

        {/* Valor del IPC */}
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-mono font-bold text-gray-800">
            {datoPrincipal.valor.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-gray-400">puntos</span>
        </div>
      </div>
    </DashboardRow>
  );
}