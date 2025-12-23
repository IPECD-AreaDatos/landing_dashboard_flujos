'use client';
import { IpicorrData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function IpicorrRow({ data, flujoNombre }: { data: IpicorrData; flujoNombre: string }) {
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day).toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Cálculo rápido para el componente
  const varMen = (data.vim_nivel_general * 100).toFixed(1) + '%';
  const esPosMen = data.vim_nivel_general >= 0;
  
  const varInt = (data.var_ia_nivel_general * 100).toFixed(1) + '%';
  const esPosInt = data.var_ia_nivel_general >= 0;

  return (
    <DashboardRow title={flujoNombre} date={fecha}>
       <div className="flex gap-8">
         <StatItem 
            label="Var. Mensual" 
            value={varMen} 
            subValue={esPosMen ? '▲' : '▼'} 
            isPositive={esPosMen}
         />
         <StatItem 
            label="Var. Interanual" 
            value={varInt} 
            subValue={esPosInt ? '▲' : '▼'} 
            isPositive={esPosInt}
         />
       </div>
    </DashboardRow>
  );
}