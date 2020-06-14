 import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';

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

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }


}
