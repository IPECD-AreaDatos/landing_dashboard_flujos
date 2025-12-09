'use client';

import { useEffect, useState } from 'react';
import { getAnacUltimosDisponibles, getCbaCbtUltimoDisponible, getDnrpaUltimosDisponibles, getEmaeUltimaFecha, getIpcUltimaFecha } from '@/lib/api';
import { AnacData, CbaCbtData, DnrpaData, EmaeData, IpcData } from '@/types';
import FlujoCard from '@/components/FlujoCard';
import CbaCbtCard from '@/components/CbaCbtCard';
import DnrpaCard from '@/components/DnrpaCard';
import EmaeCard from '@/components/EmaeCard';
import IpcCard from '@/components/IpcCard';

export default function Dashboard() {
  const [anacData, setAnacData] = useState<AnacData | null>(null);
  const [cbaCbtData, setCbaCbtData] = useState<CbaCbtData | null>(null);
  const [dnrpaVehiculo1, setDnrpaVehiculo1] = useState<DnrpaData | null>(null);
  const [dnrpaVehiculo2, setDnrpaVehiculo2] = useState<DnrpaData | null>(null);
  const [emaeData, setEmaeData] = useState<EmaeData[]>([]);
  const [ipcData, setIpcData] = useState<IpcData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch todos los flujos en paralelo
        const [anacResponse, cbaCbtResponse, dnrpaResponse1, dnrpaResponse2, emaeResponse, ipcResponse] = await Promise.all([
          getAnacUltimosDisponibles('Corrientes'),
          getCbaCbtUltimoDisponible(),
          getDnrpaUltimosDisponibles(18, 1),
          getDnrpaUltimosDisponibles(18, 2),
          getEmaeUltimaFecha(),
          getIpcUltimaFecha(),
        ]);
        
        if (anacResponse.success && anacResponse.data.length > 0) {
          setAnacData(anacResponse.data[0]);
        }
        
        if (cbaCbtResponse.success && cbaCbtResponse.data) {
          setCbaCbtData(cbaCbtResponse.data);
        }
        
        if (dnrpaResponse1.success && dnrpaResponse1.data.length > 0) {
          setDnrpaVehiculo1(dnrpaResponse1.data[0]);
        }
        
        if (dnrpaResponse2.success && dnrpaResponse2.data.length > 0) {
          setDnrpaVehiculo2(dnrpaResponse2.data[0]);
        }
        
        if (emaeResponse.success && emaeResponse.data.length > 0) {
          setEmaeData(emaeResponse.data);
        }
        
        if (ipcResponse.success && ipcResponse.data.length > 0) {
          setIpcData(ipcResponse.data);
        }
        
        if (!anacResponse.success && !cbaCbtResponse.success && !dnrpaResponse1.success && !dnrpaResponse2.success && !emaeResponse.success && !ipcResponse.success) {
          setError('No se encontraron datos disponibles');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    
    // Refrescar datos cada 30 segundos
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Dashboard Flujos ETL
          </h1>
          <p className="text-gray-600">
            Monitoreo de últimos datos disponibles
          </p>
        </header>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-4 text-gray-600">Cargando datos...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && (anacData || cbaCbtData || dnrpaVehiculo1 || dnrpaVehiculo2 || emaeData.length > 0 || ipcData.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {anacData && <FlujoCard data={anacData} flujoNombre="ANAC" />}
            {cbaCbtData && <CbaCbtCard data={cbaCbtData} flujoNombre="CBA-CBT" />}
            {(dnrpaVehiculo1 || dnrpaVehiculo2) && (
              <DnrpaCard 
                vehiculo1={dnrpaVehiculo1} 
                vehiculo2={dnrpaVehiculo2} 
                flujoNombre="DNRPA" 
              />
            )}
            {emaeData.length > 0 && (
              <EmaeCard data={emaeData} flujoNombre="EMAE" />
            )}
            {ipcData.length > 0 && (
              <IpcCard data={ipcData} flujoNombre="IPC" />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

