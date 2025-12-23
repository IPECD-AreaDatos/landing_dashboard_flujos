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
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      <div className="flex gap-8 divide-x divide-gray-100">
        <div className="pl-4 first:pl-0">
          {/* Ojo al signo $ en el label o value según prefieras */}
          <StatItem label="Canasta Alim. (CBA)" value={`$${data.cba_hogar.toLocaleString('es-AR')}`} />
        </div>
        <div className="pl-8">
          <StatItem label="Canasta Total (CBT)" value={`$${data.cbt_hogar.toLocaleString('es-AR')}`} />
        </div>
      </div>
    </DashboardRow>
  );
}