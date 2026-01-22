'use client';
import { IpcData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

export default function IpcRow({ data, flujoNombre }: { data: IpcData[]; flujoNombre: string }) {
  // 1. Filtrar solo Nivel General
  const general = data.filter(d => d.categoria === 'Nivel general');

  // 2. Sistema de Prioridad Ajustado a tu JSON
  const datoMostrar = 
    general.find(d => d.region.toLowerCase().includes('nacion')) || // Atrapa "Nacion" o "Nacional"
    general.find(d => d.region.toLowerCase().includes('argentina')) ||
    general.find(d => d.region.toLowerCase().includes('gba')) || 
    general.find(d => d.region.toLowerCase().includes('nea')) ||
    general[0]; // Fallback

  if (!datoMostrar) return null;

  const [year, month, day] = datoMostrar.fecha.split('-').map(Number);
  const fechaDate = new Date(year, month - 1, day);
  const fecha = fechaDate.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  // Limpieza visual del nombre de la región
  // Si dice "Nacion", lo mostramos como "NACIONAL" que queda más elegante
  const nombreRegion = datoMostrar.region.toLowerCase().includes('nacion') 
    ? 'NACIONAL' 
    : datoMostrar.region.toUpperCase();

  return (
    <DashboardRow title={flujoNombre} date={fecha} fechaDato={fechaDate}>
      {/* Badge de Región */}
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
        nombreRegion === 'NACIONAL'
        ? 'bg-gray-100 text-gray-500 border-gray-200'  // Estilo discreto para Nacional
        : 'bg-amber-50 text-amber-600 border-amber-200' // Estilo aviso para otras regiones
      }`}>
        {nombreRegion}
      </span>
      
      {/* Dato Principal: Puntos */}
      <StatItem 
        label="Índice Base" 
        value={datoMostrar.valor.toLocaleString('es-AR', {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1
        })} 
        subValue="pts" 
      />
    </DashboardRow>
  );
}