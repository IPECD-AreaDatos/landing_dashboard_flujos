'use client';
import { CbaCbtData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

interface CbaCbtRowProps {
  data: CbaCbtData;
  flujoNombre: string;
}

export default function CbaCbtRow({ data, flujoNombre }: CbaCbtRowProps) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fechaDate = new Date(year, month - 1, day);
  const fecha = fechaDate.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha} fechaDato={fechaDate}>
      <StatItem label="Canasta Alim. (CBA)" value={`$${data.cba_hogar.toLocaleString('es-AR')}`} />
      <StatItem label="Canasta Total (CBT)" value={`$${data.cbt_hogar.toLocaleString('es-AR')}`} />
    </DashboardRow>
  );
}