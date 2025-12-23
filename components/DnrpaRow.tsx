'use client';
import { DnrpaData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

interface DnrpaRowProps {
  vehiculo1: DnrpaData | null; // Autos
  vehiculo2: DnrpaData | null; // Motos
  flujoNombre: string;
}

export default function DnrpaRow({ vehiculo1, vehiculo2, flujoNombre }: DnrpaRowProps) {
  const fechaData = vehiculo1 || vehiculo2;
  if (!fechaData) return null;

  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      {/* Separador vertical sutil entre datos */}
      <div className="flex gap-8 divide-x divide-gray-100">
        {vehiculo1 && (
          <div className="pl-4 first:pl-0">
             <StatItem label="Autos Insc." value={vehiculo1.cantidad.toLocaleString('es-AR')} />
          </div>
        )}
        {vehiculo2 && (
          <div className="pl-8">
             <StatItem label="Motos Insc." value={vehiculo2.cantidad.toLocaleString('es-AR')} />
          </div>
        )}
      </div>
    </DashboardRow>
  );
}