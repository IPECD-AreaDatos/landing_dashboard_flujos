'use client';
import { OedeData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function OedeRow({ data, flujoNombre }: { data: OedeData[]; flujoNombre: string }) {
  if (!data[0]) return null;
  const [year, month, day] = data[0].fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const categorias = new Set(data.map(d => d.id_categoria)).size;

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      <div className="flex gap-8 justify-end">
        <StatItem label="Registros" value={data.length.toString()} />
        <StatItem label="Categorías" value={categorias.toString()} />
      </div>
    </DashboardRow>
  );
}