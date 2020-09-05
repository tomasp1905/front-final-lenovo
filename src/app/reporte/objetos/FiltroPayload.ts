import {Anio} from './anio';
import { UnidadAcademica } from 'src/app/proyectos-bianuales/listas/unidad-academica';

export class FiltroPayload {
  listaDeUnidadesAcademicas: Array<UnidadAcademica> = [];
  listaDeUnidadesAcademicasCompleta: boolean;
  listaDeAnios:Array<Anio> = [];
  listaDeAniosCompletos: boolean;
  listaDeEstados:string;
  tipoProyecto: string;
}
