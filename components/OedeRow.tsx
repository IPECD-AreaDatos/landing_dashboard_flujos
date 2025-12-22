'use client';

import { OedeData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface OedeRowProps {
  data: OedeData[];
  flujoNombre: string;
}

export default function OedeRow({ data, flujoNombre }: OedeRowProps) {
  const fechaData = data[0];
  if (!fechaData) return null;

  // Parseo fecha
  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Lógica resumen: Contar categorías únicas
  const categoriasUnicas = new Set(data.map(d => d.id_categoria)).size;

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-3">
        {/* Chip decorativo */}
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-100 text-rose-600">
          ⚡
        </span>
        
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-700">
            {data.length} registros procesados
          </span>
          <span className="text-xs text-gray-500">
            Distribuidos en {categoriasUnicas} categorías
          </span>
        </div>
      </div>
    </DashboardRow>
  );
}