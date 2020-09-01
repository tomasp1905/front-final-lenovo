import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { Contador } from './Contador';

export class ResultadoFiltro {
  listaDeProyectosBianuales: Array<ProyectoBianual> = [];
  listaDeProyectosBienestar: Array<ProyectoBienestar> = [];
  listaDeProyectosEspeciales: Array<ProyectoEspecial> = [];
  listaDeProgramasEstables: Array<ProgramaEstable> = [];
  contador: Contador = new Contador();
}
