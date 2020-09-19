import { Carrera } from './listas/carrera';
import { UnidadAcademica } from './listas/unidad-academica';
import { Prioridad } from './listas/prioridad';
import { Miembro } from './objetos/miembro';
import { Socio } from './objetos/socio';
import { Director } from './objetos/director';
import { Actividad } from './objetos/actividad';
import { ProyectoDeInvestigacion } from './objetos/proyectoInvestigacion';
import { Comentario } from './objetos/comentario';



export class ProyectoBianual {
  id: number;
  titulo: string;
  anioDePresentacion: number;
  tipoDeProyecto: string;

  listaDeCarreras: Array<Carrera> = [];
  unidadesAcademicas: Array<UnidadAcademica> = [];
  catedra: string;
  listaDePrioridades: Array<Prioridad> = [];

  director: Director = new Director();
  miembros: Miembro[] = [];
  socios: Socio[] = [];
  listaDeActividades: Actividad[] = [];

  razonRenovacion: string;
  situacionAResolver: string;
  sintesisDelProyecto: string;
  objetivoGeneral: string;
  objetivoEspecifico: string;
  beneficiarios: string;
  numeroDeBeneficiarios:number;
  vinculacionCurricular: string;
  vinculacionInvestigacion: string;
  supuestos: string;
  evaluacion: string;

  proyectoDeInvestigacion: ProyectoDeInvestigacion = new ProyectoDeInvestigacion();

  lineaOperativa: string = 'Proyecto Bianual';

  presupuesto: string;

  fechaDeCreacion:Date;
  fechaDeAutorizacion:Date;
  fechaDeInicio:Date;
  fechaDeFinalizacion:Date;

  estado: string;

  rendicionContable: string;

  listaDeComentarios: Comentario[] = [];

}
