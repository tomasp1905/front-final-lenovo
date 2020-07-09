import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import { ElegirProyectoService } from './elegir-proyecto.service';
import { DisponibilidadProyecto } from './disponibilidadProyecto';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-elegir-proyecto',
  templateUrl: './elegir-proyecto.component.html',
  styleUrls: ['./elegir-proyecto.component.css']
})

export class ElegirProyectoComponent implements OnInit {

  projectsList: Array<DisponibilidadProyecto> = new Array<DisponibilidadProyecto>();

  constructor(private authService: AuthService, private elegirProyectoService: ElegirProyectoService) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.elegirProyectoService.findAll().subscribe((data: Array<DisponibilidadProyecto>) => {
     
      data.forEach(element => {
        element.route = `/${element.tipoDeProyecto.replace(/ /g, "-").toLowerCase()}`
      });
      this.projectsList = data;
      
    });
  }

  changeStatusProject(disponibilidadProyecto: DisponibilidadProyecto) {
    this.elegirProyectoService.update(disponibilidadProyecto.id).subscribe(data => {
      this.getAllProjects();
    });
  }


}
