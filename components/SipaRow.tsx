'use client';

import { SipaData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface SipaRowProps {
  data: SipaData[];
  flujoNombre: string;
}

export default function SipaRow({ data, flujoNombre }: SipaRowProps) {
  const fechaData = data[0];
  if (!fechaData) return null;

  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Calculamos un total general para mostrar en la fila
  const totalConEstacionalidad = data.reduce((acc, curr) => acc + curr.cantidad_con_estacionalidad, 0);
  const provinciasUnicas = new Set(data.map(d => d.id_provincia)).size;

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada} fechaDato={fecha}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
           <span className="text-xs text-gray-400 uppercase">Total Registrado</span>
           <span className="font-mono text-lg font-bold text-emerald-600">
             {totalConEstacionalidad.toLocaleString('es-AR', { maximumFractionDigits: 0 })}
           </span>
        </div>
        
        {/* Separador */}
        <div className="h-6 w-px bg-gray-200"></div>

        <div className="text-xs text-gray-500">
          Reporte de <strong className="text-gray-700">{provinciasUnicas}</strong> provincias
        </div>
      </div>
    </DashboardRow>
  );
}