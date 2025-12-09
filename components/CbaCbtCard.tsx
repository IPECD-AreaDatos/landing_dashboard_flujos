'use client';

import { CbaCbtData } from '@/types';

interface CbaCbtCardProps {
  data: CbaCbtData;
  flujoNombre: string;
}

export default function CbaCbtCard({ data, flujoNombre }: CbaCbtCardProps) {
  // Parsear la fecha manualmente para evitar problemas de zona horaria
  const [year, month, day] = data.fecha.split('-').map(Number);
  const fecha = new Date(year, month - 1, day);
  
  const fechaFormateada = fecha.toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{flujoNombre}</h3>
        <div className="mt-1">
          <p className="text-sm text-gray-500 mb-1">Última fecha disponible</p>
          <p className="text-lg font-semibold text-gray-800">{fechaFormateada}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {/* CBA - Canasta Básica Alimentaria */}
        <div className="bg-green-50 rounded-lg p-4">
          <h4 className="font-semibold text-green-800 mb-3 text-sm uppercase">Canasta Básica Alimentaria (CBA)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Adulto</p>
              <p className="text-lg font-bold text-green-700">${data.cba_adulto.toLocaleString('es-AR')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Hogar</p>
              <p className="text-lg font-bold text-green-700">${data.cba_hogar.toLocaleString('es-AR')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-600 mb-1">NEA</p>
              <p className="text-lg font-bold text-green-700">${data.cba_nea.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>

        {/* CBT - Canasta Básica Total */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-3 text-sm uppercase">Canasta Básica Total (CBT)</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-600 mb-1">Adulto</p>
              <p className="text-lg font-bold text-blue-700">${data.cbt_adulto.toLocaleString('es-AR')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Hogar</p>
              <p className="text-lg font-bold text-blue-700">${data.cbt_hogar.toLocaleString('es-AR')}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-600 mb-1">NEA</p>
              <p className="text-lg font-bold text-blue-700">${data.cbt_nea.toLocaleString('es-AR')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

