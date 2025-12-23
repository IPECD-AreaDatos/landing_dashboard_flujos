'use client';
import { AnacData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function AnacRow({ data, flujoNombre }: { data: AnacData; flujoNombre: string }) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
      <div className="flex gap-4 items-center justify-end">
        {/* Badge sutil */}
        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded border border-gray-200">
          {data.aeropuerto}
        </span>
        
        <StatItem 
            label="Pasajeros" 
            value={data.cantidad.toLocaleString('es-AR')} 
        />
      </div>
    </DashboardRow>
  );
}