'use client';

import { DnrpaData } from '@/types';
import { DashboardRow } from './DashboardRow';

interface DnrpaRowProps {
  vehiculo1: DnrpaData | null;
  vehiculo2: DnrpaData | null;
  flujoNombre: string;
}

export default function DnrpaRow({ vehiculo1, vehiculo2, flujoNombre }: DnrpaRowProps) {
  // Usar la fecha del primer vehículo
  const fechaData = vehiculo1 || vehiculo2;
  
  if (!fechaData) return null;

  // Tu lógica de fechas original
  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fechaFormateada}>
      <div className="flex items-center gap-3">
        {vehiculo1 && (
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-md border border-purple-100">
            <span className="text-xs font-bold text-purple-600 uppercase">Autos</span>
            <span className="font-mono font-bold text-purple-900">
              {vehiculo1.cantidad.toLocaleString('es-AR')}
            </span>
          </div>
        )}
        
        {vehiculo2 && (
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100">
            <span className="text-xs font-bold text-indigo-600 uppercase">Motos</span>
            <span className="font-mono font-bold text-indigo-900">
              {vehiculo2.cantidad.toLocaleString('es-AR')}
            </span>
          </div>
        )}
      </div>
    </DashboardRow>
  );
}