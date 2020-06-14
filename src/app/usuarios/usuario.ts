import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { Cargo } from './registro/cargo';

export class Usuario {
  id:number;
  username:string;
  password:string;
  nombre:string;
  apellido:string;
  email:string;
  roles:string[] = [];
  telefono:string;
  listaDeCarreras: Array<Carrera> = [];
  dni: string;
  listaDeUnidadesAcademicas: Array<UnidadAcademica> = [];
  cargo: Cargo;
}
