'use client';

import { useEffect, useState, useCallback } from 'react';
import { getAnacUltimosDisponibles, getCbaCbtUltimoDisponible, getDnrpaUltimosDisponibles, getEmaeUltimaFecha, getIpcUltimaFecha, getIericUltimosDisponibles, getIpiUltimoDisponible, getIpicorrUltimoDisponible, getOedeUltimaFecha, getRemUltimoDisponible, getRipteUltimoDisponible, getSipaUltimaFecha, getSmvmUltimoDisponible } from '@/lib/api';
import { AnacData, CbaCbtData, DnrpaData, EmaeData, IpcData, IericData, IpiData, IpicorrData, OedeData, RemData, RipteData, SipaData, SmvmData } from '@/types';

// --- COMPONENTES ROW (NUEVOS) ---
import AnacRow from '@/components/AnacRow'; // Asegúrate de haber renombrado o creado este archivo
import CbaCbtRow from '@/components/CbaCbtRow';
import DnrpaRow from '@/components/DnrpaRow';
import EmaeRow from '@/components/EmaeRow';
import IpcRow from '@/components/IpcRow';
import IericRow from '@/components/IericRow';
import IpiRow from '@/components/IpiRow';
import IpicorrRow from '@/components/IpicorrRow';
import OedeRow from '@/components/OedeRow';
import RemRow from '@/components/RemRow';
import RipteRow from '@/components/RipteRow';
import SipaRow from '@/components/SipaRow';
import SmvmRow from '@/components/SmvmRow';

// --- COMPONENTES CARD (VIEJOS - MANTENIDOS POR SEGURIDAD) ---
import FlujoCard from '@/components/FlujoCard';
import CbaCbtCard from '@/components/CbaCbtCard';
import DnrpaCard from '@/components/DnrpaCard';
import EmaeCard from '@/components/EmaeCard';
import IpcCard from '@/components/IpcCard';
import IericCard from '@/components/IericCard';
import IpiCard from '@/components/IpiCard';
import IpicorrCard from '@/components/IpicorrCard';
import OedeCard from '@/components/OedeCard';
import RemCard from '@/components/RemCard';
import RipteCard from '@/components/RipteCard';
import SipaCard from '@/components/SipaCard';
import SmvmCard from '@/components/SmvmCard';

export default function Dashboard() {
  const [anacData, setAnacData] = useState<AnacData | null>(null);
  const [cbaCbtData, setCbaCbtData] = useState<CbaCbtData | null>(null);
  const [dnrpaVehiculo1, setDnrpaVehiculo1] = useState<DnrpaData | null>(null);
  const [dnrpaVehiculo2, setDnrpaVehiculo2] = useState<DnrpaData | null>(null);
  const [emaeData, setEmaeData] = useState<EmaeData[]>([]);
  const [ipcData, setIpcData] = useState<IpcData[]>([]);
  const [iericData, setIericData] = useState<IericData | null>(null);
  const [ipiData, setIpiData] = useState<IpiData | null>(null);
  const [ipicorrData, setIpicorrData] = useState<IpicorrData | null>(null);
  const [oedeData, setOedeData] = useState<OedeData[]>([]);
  const [remData, setRemData] = useState<RemData | null>(null);
  const [ripteData, setRipteData] = useState<RipteData | null>(null);
  const [sipaData, setSipaData] = useState<SipaData[]>([]);
  const [smvmData, setSmvmData] = useState<SmvmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [isManualRefresh, setIsManualRefresh] = useState(false);
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);
  const [nextAutoRefresh, setNextAutoRefresh] = useState<Date | null>(null);
  const [flujoErrors, setFlujoErrors] = useState<Record<string, string>>({});
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); // 'desc' = más recientes primero

  // Intervalo de actualización automática: 1 hora (3600000ms)
  // Para cambiar a 12 horas, usar: 12 * 60 * 60 * 1000 = 43200000
  const AUTO_REFRESH_INTERVAL = 60 * 60 * 1000; // 1 hora en milisegundos

  const fetchData = useCallback(async (isManual = false, isFirstLoad = false) => {
    try {
      if (isManual) {
        setIsManualRefresh(true);
      } else if (isFirstLoad) {
        setLoading(true);
      } else {
        setIsAutoRefreshing(true);
      }
      setError(null);
      
      // Limpiar errores previos
      setFlujoErrors({});
      
      // Fetch todos los flujos en paralelo usando allSettled para manejar errores individuales
      const results = await Promise.allSettled([
        getAnacUltimosDisponibles('Corrientes').then(r => ({ flujo: 'ANAC', data: r })),
        getCbaCbtUltimoDisponible().then(r => ({ flujo: 'CBA-CBT', data: r })),
        getDnrpaUltimosDisponibles(18, 1).then(r => ({ flujo: 'DNRPA-1', data: r })),
        getDnrpaUltimosDisponibles(18, 2).then(r => ({ flujo: 'DNRPA-2', data: r })),
        getEmaeUltimaFecha().then(r => ({ flujo: 'EMAE', data: r })),
        getIpcUltimaFecha().then(r => ({ flujo: 'IPC', data: r })),
        getIericUltimosDisponibles(18).then(r => ({ flujo: 'IERIC', data: r })),
        getIpiUltimoDisponible().then(r => ({ flujo: 'IPI', data: r })),
        getIpicorrUltimoDisponible().then(r => ({ flujo: 'IPICORR', data: r })),
        getOedeUltimaFecha().then(r => ({ flujo: 'OEDE', data: r })),
        getRemUltimoDisponible().then(r => ({ flujo: 'REM', data: r })),
        getRipteUltimoDisponible().then(r => ({ flujo: 'RIPTE', data: r })),
        getSipaUltimaFecha().then(r => ({ flujo: 'SIPA', data: r })),
        getSmvmUltimoDisponible().then(r => ({ flujo: 'SMVM', data: r })),
      ]);
      
      // Procesar resultados individualmente
      const errors: Record<string, string> = {};
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          const flujoName = ['ANAC', 'CBA-CBT', 'DNRPA-1', 'DNRPA-2', 'EMAE', 'IPC', 'IERIC', 'IPI', 'IPICORR', 'OEDE', 'REM', 'RIPTE', 'SIPA', 'SMVM'][index];
          errors[flujoName] = result.reason?.message || 'Error desconocido';
          console.error(`Error en ${flujoName}:`, result.reason);
        } else {
          const { flujo, data } = result.value;
          // Procesar cada flujo según su tipo
          if (flujo === 'ANAC' && data.success && data.data.length > 0) setAnacData(data.data[0]);
          else if (flujo === 'CBA-CBT' && data.success && data.data) setCbaCbtData(data.data);
          else if (flujo === 'DNRPA-1' && data.success && data.data.length > 0) setDnrpaVehiculo1(data.data[0]);
          else if (flujo === 'DNRPA-2' && data.success && data.data.length > 0) setDnrpaVehiculo2(data.data[0]);
          else if (flujo === 'EMAE' && data.success && data.data.length > 0) setEmaeData(data.data);
          else if (flujo === 'IPC' && data.success && data.data.length > 0) setIpcData(data.data);
          else if (flujo === 'IERIC' && data.success && data.data.length > 0) setIericData(data.data[0]);
          else if (flujo === 'IPI' && data.success && data.data) setIpiData(data.data);
          else if (flujo === 'IPICORR' && data.success && data.data) setIpicorrData(data.data);
          else if (flujo === 'OEDE' && data.success && data.data.length > 0) setOedeData(data.data);
          else if (flujo === 'REM' && data.success && data.data) setRemData(data.data);
          else if (flujo === 'RIPTE' && data.success && data.data) setRipteData(data.data);
          else if (flujo === 'SIPA' && data.success && data.data.length > 0) setSipaData(data.data);
          else if (flujo === 'SMVM' && data.success && data.data) setSmvmData(data.data);
        }
      });
      
      if (Object.keys(errors).length > 0) {
        setFlujoErrors(errors);
        // Solo mostrar error general si TODOS fallaron
        if (Object.keys(errors).length === results.length) {
          setError('Error al cargar todos los datos');
        }
      }
      
      // Actualizar timestamp de última actualización y próxima actualización
      const now = new Date();
      setLastUpdate(now);
      setNextAutoRefresh(new Date(now.getTime() + AUTO_REFRESH_INTERVAL));

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar los datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      setIsManualRefresh(false);
      setIsAutoRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // Carga inicial
    fetchData(false, true);
    
    // Configurar actualización automática
    const interval = setInterval(() => {
      fetchData(false, false);
    }, AUTO_REFRESH_INTERVAL);
    
    return () => clearInterval(interval);
  }, [fetchData, AUTO_REFRESH_INTERVAL]);

  // Contador de tiempo hasta próxima actualización
  const [timeUntilRefresh, setTimeUntilRefresh] = useState<string>('');
  
  useEffect(() => {
    if (!nextAutoRefresh) return;
    
    const updateTimer = () => {
      const now = new Date();
      const diff = nextAutoRefresh.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeUntilRefresh('Actualizando...');
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours > 0) {
        setTimeUntilRefresh(`${hours}h ${minutes}m`);
      } else {
        setTimeUntilRefresh(`${minutes}m`);
      }
    };
    
    updateTimer();
    const timerInterval = setInterval(updateTimer, 60000); // Actualizar cada minuto
    
    return () => clearInterval(timerInterval);
  }, [nextAutoRefresh]);

  // Calcular estadísticas de flujos
  const totalFlujos = 14; // Total de flujos
  const flujosConDatos = [
    anacData,
    cbaCbtData,
    dnrpaVehiculo1 || dnrpaVehiculo2,
    emaeData.length > 0,
    ipcData.length > 0,
    iericData,
    ipiData,
    ipicorrData,
    oedeData.length > 0,
    remData,
    ripteData,
    sipaData.length > 0,
    smvmData,
  ].filter(Boolean).length;
  const flujosConError = Object.keys(flujoErrors).length;

  const handleManualRefresh = () => {
    fetchData(true);
  };

  // Función helper para extraer la fecha de cada tipo de flujo
  const getFlujoDate = (flujo: any, tipo: string): Date | null => {
    try {
      if (!flujo) return null;
      
      let fechaStr: string | null = null;
      
      switch (tipo) {
        case 'ANAC':
          fechaStr = (flujo as AnacData).fecha;
          break;
        case 'CBA-CBT':
          fechaStr = (flujo as CbaCbtData).fecha;
          break;
        case 'DNRPA':
          fechaStr = (flujo as DnrpaData).fecha;
          break;
        case 'EMAE':
          if (Array.isArray(flujo) && flujo.length > 0) {
            fechaStr = (flujo as EmaeData[])[0].fecha;
          }
          break;
        case 'IPC':
          if (Array.isArray(flujo) && flujo.length > 0) {
            fechaStr = (flujo as IpcData[])[0].fecha;
          }
          break;
        case 'IERIC':
          fechaStr = (flujo as IericData).fecha;
          break;
        case 'IPI':
          fechaStr = (flujo as IpiData).fecha;
          break;
        case 'IPICORR':
          fechaStr = (flujo as IpicorrData).fecha;
          break;
        case 'OEDE':
          if (Array.isArray(flujo) && flujo.length > 0) {
            fechaStr = (flujo as OedeData[])[0].fecha;
          }
          break;
        case 'REM':
          fechaStr = (flujo as RemData).fecha;
          break;
        case 'RIPTE':
          fechaStr = (flujo as RipteData).fecha;
          break;
        case 'SIPA':
          if (Array.isArray(flujo) && flujo.length > 0) {
            fechaStr = (flujo as SipaData[])[0].fecha;
          }
          break;
        case 'SMVM':
          fechaStr = (flujo as SmvmData).fecha;
          break;
      }
      
      if (!fechaStr) return null;
      
      const [year, month, day] = fechaStr.split('-').map(Number);
      return new Date(year, month - 1, day);
    } catch {
      return null;
    }
  };

  // Crear array de flujos con sus fechas para ordenar
  type FlujoItem = {
    nombre: string;
    fecha: Date | null;
    componente: React.ReactNode;
  };

  const flujosItems: FlujoItem[] = [
    {
      nombre: 'ANAC',
      fecha: getFlujoDate(anacData, 'ANAC'),
      componente: anacData ? <AnacRow key="ANAC" data={anacData} flujoNombre="ANAC" /> : null,
    },
    {
      nombre: 'CBA-CBT',
      fecha: getFlujoDate(cbaCbtData, 'CBA-CBT'),
      componente: cbaCbtData ? <CbaCbtRow key="CBA-CBT" data={cbaCbtData} flujoNombre="CBA-CBT" /> : null,
    },
    {
      nombre: 'DNRPA',
      fecha: getFlujoDate(dnrpaVehiculo1 || dnrpaVehiculo2, 'DNRPA'),
      componente: (dnrpaVehiculo1 || dnrpaVehiculo2) ? (
        <DnrpaRow 
          key="DNRPA"
          vehiculo1={dnrpaVehiculo1} 
          vehiculo2={dnrpaVehiculo2} 
          flujoNombre="DNRPA" 
        />
      ) : null,
    },
    {
      nombre: 'EMAE',
      fecha: getFlujoDate(emaeData, 'EMAE'),
      componente: emaeData.length > 0 ? <EmaeRow key="EMAE" data={emaeData} flujoNombre="EMAE" /> : null,
    },
    {
      nombre: 'IPC',
      fecha: getFlujoDate(ipcData, 'IPC'),
      componente: ipcData.length > 0 ? <IpcRow key="IPC" data={ipcData} flujoNombre="IPC" /> : null,
    },
    {
      nombre: 'IERIC',
      fecha: getFlujoDate(iericData, 'IERIC'),
      componente: iericData ? <IericRow key="IERIC" data={iericData} flujoNombre="IERIC" /> : null,
    },
    {
      nombre: 'IPI Nación',
      fecha: getFlujoDate(ipiData, 'IPI'),
      componente: ipiData ? <IpiRow key="IPI" data={ipiData} flujoNombre="IPI Nación" /> : null,
    },
    {
      nombre: 'IPICORR',
      fecha: getFlujoDate(ipicorrData, 'IPICORR'),
      componente: ipicorrData ? <IpicorrRow key="IPICORR" data={ipicorrData} flujoNombre="IPICORR" /> : null,
    },
    {
      nombre: 'OEDE',
      fecha: getFlujoDate(oedeData, 'OEDE'),
      componente: oedeData.length > 0 ? <OedeRow key="OEDE" data={oedeData} flujoNombre="OEDE" /> : null,
    },
    {
      nombre: 'REM',
      fecha: getFlujoDate(remData, 'REM'),
      componente: remData ? <RemRow key="REM" data={remData} flujoNombre="REM" /> : null,
    },
    {
      nombre: 'RIPTE',
      fecha: getFlujoDate(ripteData, 'RIPTE'),
      componente: ripteData ? <RipteRow key="RIPTE" data={ripteData} flujoNombre="RIPTE" /> : null,
    },
    {
      nombre: 'SIPA',
      fecha: getFlujoDate(sipaData, 'SIPA'),
      componente: sipaData.length > 0 ? <SipaRow key="SIPA" data={sipaData} flujoNombre="SIPA" /> : null,
    },
    {
      nombre: 'SMVM',
      fecha: getFlujoDate(smvmData, 'SMVM'),
      componente: smvmData ? <SmvmRow key="SMVM" data={smvmData} flujoNombre="SMVM" /> : null,
    },
  ].filter(item => item.componente !== null);

  // Ordenar flujos por fecha
  const flujosOrdenados = [...flujosItems].sort((a, b) => {
    if (!a.fecha && !b.fecha) return 0;
    if (!a.fecha) return 1; // Sin fecha al final
    if (!b.fecha) return -1; // Sin fecha al final
    
    if (sortOrder === 'desc') {
      return b.fecha!.getTime() - a.fecha!.getTime(); // Más recientes primero
    } else {
      return a.fecha!.getTime() - b.fecha!.getTime(); // Más antiguos primero
    }
  });

  // Verificar si hay algún dato para mostrar
  const hasData = !loading && !error && flujosItems.length > 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-ipecd-light/20 via-white to-ipecd-light/10">
      {/* Banner Header */}
      <header className="w-full bg-gradient-to-r from-ipecd-dark via-ipecd-primary to-ipecd-dark shadow-2xl relative overflow-hidden">
        {/* Patrón decorativo de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-16 bg-white/30 rounded-full shadow-lg backdrop-blur-sm"></div>
                <div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                    Dashboard Flujos ETL
                  </h1>
                  <p className="text-white/90 font-medium flex items-center gap-2 text-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Monitoreo de últimos datos disponibles
                  </p>
                </div>
              </div>
              
              {/* Información de estado */}
              <div className="mt-4 space-y-2 pl-4 border-l-4 border-white/40 bg-white/10 backdrop-blur-sm rounded-r-lg py-3 pr-3">
                {lastUpdate && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-white/90 font-medium">
                      Última actualización: <span className="text-white font-semibold">{lastUpdate.toLocaleString('es-AR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </span>
                  </div>
                )}
                {timeUntilRefresh && !isAutoRefreshing && (
                  <div className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="text-white/90">
                      Próxima actualización automática: <span className="text-white font-semibold">{timeUntilRefresh}</span>
                    </span>
                  </div>
                )}
                {isAutoRefreshing && (
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Actualizando en segundo plano...
                  </div>
                )}
                {flujosConError > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-white font-semibold flex items-center gap-1 bg-red-500/30 px-2 py-1 rounded">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {flujosConError} flujo{flujosConError > 1 ? 's' : ''} con error{flujosConError > 1 ? 'es' : ''}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Botón de actualización */}
            <button
              onClick={handleManualRefresh}
              disabled={loading || isManualRefresh}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-white/50 transform hover:-translate-y-1 hover:scale-105 disabled:transform-none active:scale-95"
            >
              {isManualRefresh ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Actualizando...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Actualizar datos
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && !lastUpdate && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-xl border border-ipecd-light/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-ipecd-light border-t-ipecd-primary mb-4 shadow-lg"></div>
            <span className="text-ipecd-dark font-semibold text-lg bg-gradient-to-r from-ipecd-dark to-ipecd-primary bg-clip-text text-transparent">Cargando datos...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-xl p-5 mb-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 font-bold text-lg mb-1">Error</p>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {Object.keys(flujoErrors).length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-5 mb-6 shadow-lg backdrop-blur-sm">
            <div className="flex items-start gap-3 mb-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-amber-800 font-bold text-lg">Algunos flujos presentan errores:</p>
            </div>
            <ul className="space-y-2 ml-9">
              {Object.entries(flujoErrors).map(([flujo, errorMsg]) => (
                <li key={flujo} className="text-sm text-amber-700">
                  <span className="font-bold text-amber-900">{flujo}:</span> {errorMsg}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* --- NUEVA VISTA TIPO TABLA (DASHBOARD ROW) --- */}
        {hasData && (
          <div className="bg-white rounded-2xl shadow-xl border border-ipecd-light/50 overflow-hidden backdrop-blur-sm">
             {/* Cabecera de la Tabla */}
             <div className="hidden md:flex bg-gradient-to-r from-ipecd-dark via-ipecd-primary to-ipecd-dark px-6 py-4 text-xs font-bold text-white uppercase tracking-wider items-center shadow-lg">
                <div className="w-1/4 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Indicador
                </div>
                <div className="w-1/4 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Fecha datos</span>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                    className="ml-2 p-1.5 hover:bg-white/20 rounded-lg transition-all duration-200 hover:scale-110"
                    title={sortOrder === 'desc' ? 'Ordenar: más antiguos primero' : 'Ordenar: más recientes primero'}
                  >
                    {sortOrder === 'desc' ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex-1 flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Resumen / Estado
                </div>
            </div>

            {/* Selector de ordenamiento para móviles */}
            <div className="md:hidden bg-ipecd-light/30 px-6 py-3 border-b border-ipecd-light/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-ipecd-dark">Ordenar por fecha:</span>
                <button
                  onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-ipecd-primary/40 text-sm font-medium text-ipecd-dark hover:bg-ipecd-light/50 transition-colors"
                >
                  {sortOrder === 'desc' ? (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Más recientes
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Más antiguos
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="divide-y divide-ipecd-light/30">
                {flujosOrdenados.map((item, index) => (
                  <div 
                    key={item.nombre}
                    className="animate-fadeIn"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    {item.componente}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ==========================================================================
        VISTA ANTERIOR (CARDS) - COMENTADA POR SEGURIDAD
        Descomentar este bloque si se requiere volver al diseño de tarjetas grid.
        ==========================================================================
        
        {hasData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 opacity-50">
            <div className="col-span-full mb-4 font-bold text-red-500">VISTA LEGACY (DEBUG)</div>
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
            {iericData && (
              <IericCard data={iericData} flujoNombre="IERIC" />
            )}
            {ipiData && (
              <IpiCard data={ipiData} flujoNombre="IPI Nación" />
            )}
            {ipicorrData && (
              <IpicorrCard data={ipicorrData} flujoNombre="IPICORR" />
            )}
            {oedeData.length > 0 && (
              <OedeCard data={oedeData} flujoNombre="OEDE" />
            )}
            {remData && (
              <RemCard data={remData} flujoNombre="REM" />
            )}
            {ripteData && (
              <RipteCard data={ripteData} flujoNombre="RIPTE" />
            )}
            {sipaData.length > 0 && (
              <SipaCard data={sipaData} flujoNombre="SIPA" />
            )}
            {smvmData && (
              <SmvmCard data={smvmData} flujoNombre="SMVM" />
            )}
          </div>
        )}
        ========================================================================== 
        */}

      </div>
    </main>
  );
}