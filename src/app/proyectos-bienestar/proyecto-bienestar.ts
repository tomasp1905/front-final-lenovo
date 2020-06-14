import { ProyectoBianual } from '../proyectos-bianuales/proyecto-bianual';
import { Tematica } from './lista/tematica';

export class ProyectoBienestar extends ProyectoBianual {
    listaDeTematicas: Array<Tematica> = [];
    

    lineaOperativa: string = 'Proyecto Bienestar';
}
