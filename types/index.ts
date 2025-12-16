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

export interface IericData {
  fecha: string;
  id_provincia: number;
  cant_empresas: number;
  porcentaje_var_interanual: number;
}

export interface IericResponse {
  success: boolean;
  message: string;
  data: IericData[];
  total: number;
}

export interface IpiData {
  fecha: string;
  ipi_manufacturero: number;
  alimentos: number;
  textil: number;
  maderas: number;
  sustancias: number;
  min_no_metalicos: number;
  min_metales: number;
  var_mensual_ipi_manufacturero: number;
  var_mensual_alimentos: number;
  var_mensual_textil: number;
  var_mensual_maderas: number;
  var_mensual_sustancias: number;
  var_mensual_min_no_metalicos: number;
  var_mensual_min_metales: number;
}

export interface IpiResponse {
  success: boolean;
  message: string;
  data: IpiData;
  total: number;
}

export interface IpicorrData {
  fecha: string;
  var_ia_nivel_general: number;
  vim_nivel_general: number;
  vim_alimentos: number;
  vim_textil: number;
  vim_maderas: number;
  vim_min_nometalicos: number;
  vim_metales: number;
  var_ia_alimentos: number;
  var_ia_textil: number;
  var_ia_maderas: number;
  var_ia_min_nometalicos: number;
  var_ia_metales: number;
}

export interface IpicorrResponse {
  success: boolean;
  message: string;
  data: IpicorrData;
  total: number;
}

export interface OedeData {
  fecha: string;
  id_provincia: number;
  id_categoria: string;
  id_subcategoria: number;
  valor: number;
}

export interface OedeResponse {
  success: boolean;
  message: string;
  data: OedeData[];
  total: number;
}

export interface RemData {
  fecha: string;
  cambio_nominal: number;
}

export interface RemResponse {
  success: boolean;
  message: string;
  data: RemData;
  total: number;
}

export interface RipteData {
  fecha: string;
  valor: number;
}

export interface RipteResponse {
  success: boolean;
  message: string;
  data: RipteData;
  total: number;
}

export interface SipaData {
  fecha: string;
  id_provincia: number;
  id_tipo_registro: number;
  cantidad_con_estacionalidad: number;
  cantidad_sin_estacionalidad: number;
}

export interface SipaResponse {
  success: boolean;
  message: string;
  data: SipaData[];
  total: number;
}

export interface SmvmData {
  fecha: string;
  salario_mvm_mensual: number;
  salario_mvm_diario: number;
  salario_mvm_hora: number;
}

export interface SmvmResponse {
  success: boolean;
  message: string;
  data: SmvmData;
  total: number;
}

