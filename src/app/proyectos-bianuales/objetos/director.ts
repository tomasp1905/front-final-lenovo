import { Persona } from './persona';
import { ProyectoBianual } from '../proyecto-bianual';
import { Cargo } from 'src/app/usuarios/registro/cargo';

export class Director extends Persona {
  nombre: string;
  username: number;
  facultad: string;
  proyectoBianuals: ProyectoBianual[] = [];
  

}
