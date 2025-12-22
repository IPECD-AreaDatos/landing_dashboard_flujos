'use client';

import { EmaeData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface EmaeRowProps {
  data: EmaeData[];
  flujoNombre: string;
}

export default function EmaeRow({ data, flujoNombre }: EmaeRowProps) {
  // Lógica original de filtrado
  const sectoresUnicos = data.reduce((acc, item) => {
    if (!acc.find(s => s.sector_productivo === item.sector_productivo)) {
      acc.push(item);
    }
    return acc;
  }, [] as EmaeData[]);

  const fechaData = sectoresUnicos[0];
  if (!fechaData) return null;

  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-2">
        <span className="bg-orange-100 text-orange-700 p-1.5 rounded-full text-xs">
           📊 {/* Icono decorativo */}
        </span>
        <span className="font-medium text-gray-700">
          {sectoresUnicos.length} sectores productivos reportados
        </span>
      </div>
    </DashboardRow>
  );
}