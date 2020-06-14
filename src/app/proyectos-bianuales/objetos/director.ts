import { Persona } from './persona';
import { ProyectoBianual } from '../proyecto-bianual';

export class Director extends Persona {
  nombre: string;
  username: number;
  facultad: string;
  cargo: string;
  proyectoBianuals: ProyectoBianual[] = [];
}
