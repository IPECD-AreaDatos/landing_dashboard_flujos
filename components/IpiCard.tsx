'use client';

import { useState } from 'react';
import { IpiData } from '@/types';

interface IpiCardProps {
  data: IpiData;
  flujoNombre: string;
}

export default function IpiCard({ data, flujoNombre }: IpiCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Formatear variación mensual
  const formatVariacion = (valor: number) => {
    const porcentaje = (valor * 100).toFixed(2);
    const esPositivo = valor >= 0;
    return {
      valor: porcentaje,
      esPositivo,
      color: esPositivo ? 'text-green-600' : 'text-red-600',
    };
  };

  // Sectores con sus datos
  const sectores = [
    { nombre: 'IPI Manufacturero', valor: data.ipi_manufacturero, variacion: data.var_mensual_ipi_manufacturero, esPrincipal: true },
    { nombre: 'Alimentos', valor: data.alimentos, variacion: data.var_mensual_alimentos, esPrincipal: false },
    { nombre: 'Textil', valor: data.textil, variacion: data.var_mensual_textil, esPrincipal: false },
    { nombre: 'Maderas', valor: data.maderas, variacion: data.var_mensual_maderas, esPrincipal: false },
    { nombre: 'Sustancias', valor: data.sustancias, variacion: data.var_mensual_sustancias, esPrincipal: false },
    { nombre: 'Min. No Metálicos', valor: data.min_no_metalicos, variacion: data.var_mensual_min_no_metalicos, esPrincipal: false },
    { nombre: 'Min. Metales', valor: data.min_metales, variacion: data.var_mensual_min_metales, esPrincipal: false },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>

      {/* IPI Manufacturero destacado */}
      <div className="bg-cyan-50 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-cyan-800 mb-2">IPI Manufacturero</p>
        <div className="flex justify-between items-end">
          <p className="text-3xl font-bold text-cyan-600">
            {data.ipi_manufacturero.toLocaleString('es-AR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
          {(() => {
            const varData = formatVariacion(data.var_mensual_ipi_manufacturero);
            return (
              <p className={`text-lg font-semibold ${varData.color}`}>
                {varData.esPositivo ? '+' : ''}{varData.valor}%
              </p>
            );
          })()}
        </div>
        <p className="text-xs text-gray-500 mt-1">Variación mensual</p>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold"
          >
            Ver todos los sectores
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sectores.filter(s => !s.esPrincipal).map((sector, index) => {
            const varData = formatVariacion(sector.variacion);
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      {sector.nombre}
                    </p>
                    <p className="text-lg font-bold text-gray-700">
                      {sector.valor.toLocaleString('es-AR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <p className={`text-sm font-semibold ${varData.color}`}>
                      {varData.esPositivo ? '+' : ''}{varData.valor}%
                    </p>
                    <p className="text-xs text-gray-500">Var. mensual</p>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            onClick={() => setIsExpanded(false)}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
          >
            Ocultar sectores
          </button>
        </div>
      )}
    </div>
  );
}

