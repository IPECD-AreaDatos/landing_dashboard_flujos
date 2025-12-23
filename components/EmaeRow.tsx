'use client';
import { EmaeData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function EmaeRow({ data, flujoNombre }: { data: EmaeData[]; flujoNombre: string }) {
  if (!data[0]) return null;
  const [year, month, day] = data[0].fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      {/* Diseño limpio sin emojis */}
      <StatItem 
        label="Cobertura" 
        value={`${data.length} sectores`} 
        subValue="Reportados" // Usamos el subValue como etiqueta gris
      />
    </DashboardRow>
  );
}