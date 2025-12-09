export interface AnacData {
  fecha: string;
  aeropuerto: string;
  cantidad: number;
}

export interface AnacResponse {
  success: boolean;
  message: string;
  data: AnacData[];
  total: number;
}

export interface CbaCbtData {
  fecha: string;
  cba_adulto: number;
  cbt_adulto: number;
  cba_hogar: number;
  cbt_hogar: number;
  cba_nea: number;
  cbt_nea: number;
}

export interface CbaCbtResponse {
  success: boolean;
  message: string;
  data: CbaCbtData;
  total: number;
}

export interface DnrpaData {
  fecha: string;
  id_provincia_indec: number;
  id_vehiculo: number;
  cantidad: number;
}

export interface DnrpaResponse {
  success: boolean;
  message: string;
  data: DnrpaData[];
  total: number;
}

export interface EmaeData {
  fecha: string;
  sector_productivo: number;
  categoria_descripcion: string;
  valor: number;
}

export interface EmaeResponse {
  success: boolean;
  message: string;
  data: EmaeData[];
  total: number;
}

export interface IpcData {
  fecha: string;
  region: string;
  categoria: string;
  division: string;
  subdivision: string;
  valor: number;
}

export interface IpcResponse {
  success: boolean;
  message: string;
  data: IpcData[];
  total: number;
}

