import { AnacResponse, CbaCbtResponse, DnrpaResponse, EmaeResponse, IpcResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_DATOS || 'http://localhost:8000/api';

// Debug: verificar que la variable de entorno se esté leyendo correctamente
if (typeof window !== 'undefined') {
  console.log('🔍 API_BASE_URL:', API_BASE_URL);
  console.log('🔍 NEXT_PUBLIC_API_DATOS:', process.env.NEXT_PUBLIC_API_DATOS);
}

export async function getAnacUltimosDisponibles(aeropuerto: string): Promise<AnacResponse> {
  try {
    const url = `${API_BASE_URL}/anac/ultimos-disponibles?aeropuerto=${encodeURIComponent(aeropuerto)}`;
    console.log('Fetching ANAC from:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ANAC API Error:', response.status, response.statusText, errorText);
      throw new Error(`Error al obtener datos ANAC: ${response.status} ${response.statusText}`);
    }

    const data: AnacResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching ANAC data:', error);
    throw error;
  }
}

export async function getCbaCbtUltimoDisponible(): Promise<CbaCbtResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/cba-cbt/ultimo-disponible`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data: CbaCbtResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching CBA-CBT data:', error);
    throw error;
  }
}

export async function getDnrpaUltimosDisponibles(
  idProvinciaIndec: number,
  idVehiculo: number
): Promise<DnrpaResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/dnrpa/ultimos-disponibles?id_provincia_indec=${idProvinciaIndec}&id_vehiculo=${idVehiculo}`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data: DnrpaResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching DNRPA data:', error);
    throw error;
  }
}

export async function getEmaeUltimaFecha(): Promise<EmaeResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/emae/ultima-fecha`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data: EmaeResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching EMAE data:', error);
    throw error;
  }
}

export async function getIpcUltimaFecha(): Promise<IpcResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ipc/ultima-fecha`,
      {
        method: 'GET',
        headers: {
          'accept': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.statusText}`);
    }

    const data: IpcResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching IPC data:', error);
    throw error;
  }
}

