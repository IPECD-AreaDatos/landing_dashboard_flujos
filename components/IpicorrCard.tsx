'use client';

import { useState } from 'react';
import { IpicorrData } from '@/types';

interface IpicorrCardProps {
  data: IpicorrData;
  flujoNombre: string;
}

export default function IpicorrCard({ data, flujoNombre }: IpicorrCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Formatear variación
  const formatVariacion = (valor: number) => {
    const porcentaje = (valor * 100).toFixed(2);
    const esPositivo = valor >= 0;
    return {
      valor: porcentaje,
      esPositivo,
      color: esPositivo ? 'text-green-600' : 'text-red-600',
    };
  };

  // Sectores con sus variaciones
  const sectores = [
    { 
      nombre: 'Alimentos', 
      vim: data.vim_alimentos, 
      var_ia: data.var_ia_alimentos 
    },
    { 
      nombre: 'Textil', 
      vim: data.vim_textil, 
      var_ia: data.var_ia_textil 
    },
    { 
      nombre: 'Maderas', 
      vim: data.vim_maderas, 
      var_ia: data.var_ia_maderas 
    },
    { 
      nombre: 'Min. No Metálicos', 
      vim: data.vim_min_nometalicos, 
      var_ia: data.var_ia_min_nometalicos 
    },
    { 
      nombre: 'Metales', 
      vim: data.vim_metales, 
      var_ia: data.var_ia_metales 
    },
  ];

  const vimGeneral = formatVariacion(data.vim_nivel_general);
  const varIaGeneral = formatVariacion(data.var_ia_nivel_general);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>

      {/* Nivel General destacado */}
      <div className="bg-amber-50 rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-amber-800 mb-3">Nivel General</p>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-gray-600 mb-1">Var. Mensual</p>
            <p className={`text-xl font-bold ${vimGeneral.color}`}>
              {vimGeneral.esPositivo ? '+' : ''}{vimGeneral.valor}%
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">Var. Interanual</p>
            <p className={`text-xl font-bold ${varIaGeneral.color}`}>
              {varIaGeneral.esPositivo ? '+' : ''}{varIaGeneral.valor}%
            </p>
          </div>
        </div>
      </div>

      {!isExpanded ? (
        <div>
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold"
          >
            Ver todos los sectores
          </button>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sectores.map((sector, index) => {
            const vimData = formatVariacion(sector.vim);
            const varIaData = formatVariacion(sector.var_ia);
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <p className="text-sm font-semibold text-gray-800 mb-3">
                  {sector.nombre}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Var. Mensual</p>
                    <p className={`text-lg font-bold ${vimData.color}`}>
                      {vimData.esPositivo ? '+' : ''}{vimData.valor}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Var. Interanual</p>
                    <p className={`text-lg font-bold ${varIaData.color}`}>
                      {varIaData.esPositivo ? '+' : ''}{varIaData.valor}%
                    </p>
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




