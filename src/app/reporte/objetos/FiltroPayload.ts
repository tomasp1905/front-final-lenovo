import {Anio} from './anio';
import { UnidadAcademica } from 'src/app/proyectos-bianuales/listas/unidad-academica';

export class FiltroPayload {
  listaDeUnidadesAcademicas: Array<UnidadAcademica> = [];
  listaDeUnidadesAcademicasCompleta: string;

  listaDeAnios:Array<Anio> = [];
  listaDeAniosCompletos: string;

  listaDeEstados:string;
  tipoProyecto: string;
}
