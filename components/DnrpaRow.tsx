'use client';
import { DnrpaData } from '@/types';
import { DashboardRow } from './DashboardRow';
import { StatItem } from './StatItem';

interface DnrpaRowProps {
  vehiculo1: DnrpaData | null; // Autos
  vehiculo2: DnrpaData | null; // Motos
  flujoNombre: string;
}

export default function DnrpaRow({ vehiculo1, vehiculo2, flujoNombre }: DnrpaRowProps) {
  const fechaData = vehiculo1 || vehiculo2;
  if (!fechaData) return null;

  const [year, month, day] = fechaData.fecha.split('-').map(Number);
  const fechaDate = new Date(year, month - 1, day);
  const fecha = fechaDate.toLocaleDateString('es-AR', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <DashboardRow title={flujoNombre} date={fecha} fechaDato={fechaDate}>
      {vehiculo1 && (
        <StatItem label="Autos Insc." value={vehiculo1.cantidad.toLocaleString('es-AR')} />
      )}
      {vehiculo2 && (
        <StatItem label="Motos Insc." value={vehiculo2.cantidad.toLocaleString('es-AR')} />
      )}
    </DashboardRow>
  );
}