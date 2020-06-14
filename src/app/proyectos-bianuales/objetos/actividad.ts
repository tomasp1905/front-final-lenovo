import { Entidad } from './entidad';

export class Actividad extends Entidad {
  tipoDeActividad: string;
  indicadorDeResultado: string;
  medioDeVerificacion: string;
  insumoRequerido: string;
  fechaInicio: string;
  fechaFinalizacion: string;
}
