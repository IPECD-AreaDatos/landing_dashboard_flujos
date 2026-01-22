'use client';
import { AnacData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function AnacRow({ data, flujoNombre }: { data: AnacData; flujoNombre: string }) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fechaDate = new Date(year, month - 1, day);
  const fecha = fechaDate.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha} fechaDato={fechaDate}>
      <div className="flex gap-3 items-center justify-end">
        {/* Badge con colores de la paleta */}
        <span className="px-3 py-1.5 bg-ipecd-primary/20 text-ipecd-dark text-xs font-bold uppercase tracking-wider rounded-lg border border-ipecd-primary/40">
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