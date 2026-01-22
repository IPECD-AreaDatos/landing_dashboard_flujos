'use client';
import { OedeData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function OedeRow({ data, flujoNombre }: { data: OedeData[]; flujoNombre: string }) {
  if (!data || data.length === 0) return null;
  
  // Encontrar la fecha más reciente entre todos los registros
  const fechas = data.map(item => {
    const [year, month, day] = item.fecha.split('-').map(Number);
    return {
      date: new Date(year, month - 1, day),
      fechaStr: item.fecha
    };
  });
  
  // Ordenar por fecha descendente y tomar la más reciente
  fechas.sort((a, b) => b.date.getTime() - a.date.getTime());
  const fechaMasReciente = fechas[0];
  
  const fechaDate = fechaMasReciente.date;
  const fecha = fechaDate.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const categorias = new Set(data.map(d => d.id_categoria)).size;

  return (
    <DashboardRow title={flujoNombre} date={fecha} fechaDato={fechaDate}>
      <StatItem label="Registros" value={data.length.toString()} />
      <StatItem label="Categorías" value={categorias.toString()} />
    </DashboardRow>
  );
}