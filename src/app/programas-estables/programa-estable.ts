import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { ProyectoDeInvestigacion } from '../proyectos-bianuales/objetos/proyectoInvestigacion';

export class ProgramaEstable extends ProyectoBianual {
  antecedente: string;
  presentacion: string;
  proyectoDeInvestigacion: ProyectoDeInvestigacion = new ProyectoDeInvestigacion();

  lineaOperativa: string = 'Programa Estable';
}
