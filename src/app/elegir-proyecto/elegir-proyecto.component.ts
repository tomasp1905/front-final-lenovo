 import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { ElegirProyectoService } from './elegir-proyecto.service';
import { HttpClient } from '@angular/common/http';
import { DisponibilidadProyecto } from './disponibilidadProyecto';


@Component({
  selector: 'app-elegir-proyecto',
  templateUrl: './elegir-proyecto.component.html',
  styleUrls: ['./elegir-proyecto.component.css']
})
export class ElegirProyectoComponent implements OnInit {

  mostrarBianual = true;
  mostrarEstable = true;
  mostrarEspecial = true;
  mostrarBienestar = true;

  disponibilidadProyecto:DisponibilidadProyecto;

  constructor(private authService:AuthService, private elegirProyectoService:ElegirProyectoService) { }

  ngOnInit() {
  }

  cambiarEstado(){
    console.log("Entro al camponente y se va al service")
    this.elegirProyectoService.cambiar();
    console.log("Volvio al componente")
  }










}
