'use client';
import { RipteData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function RipteRow({ data, flujoNombre }: { data: RipteData; flujoNombre: string }) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      {/* Texto negro/gris fuerte, sin fondo de color */}
      <StatItem 
        label="Remuneración Promedio" 
        value={`$${data.valor.toLocaleString('es-AR')}`} 
      />
    </DashboardRow>
  );
}