import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Usuario } from '../usuario';
import { RegistroService } from './registro.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { UnidadAcademica } from 'src/app/proyectos-bianuales/listas/unidad-academica';
import { Carrera } from 'src/app/proyectos-bianuales/listas/carrera';
import { Cargo } from './cargo';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  usuario:Usuario;
  cargos: Cargo[];

  constructor(private registroService:RegistroService, private router: Router, private activatedRoute: ActivatedRoute) { }

  autocompleteControlUnidadAcademica = new FormControl();
  unidadesAcademicasFiltradas: Observable<UnidadAcademica[]>;

  autocompleteControlCarrera = new FormControl();
  carrerasFiltradas: Observable<Carrera[]>;

  ngOnInit() {
    this.usuario = new Usuario();

    this.unidadesAcademicasFiltradas = this.autocompleteControlUnidadAcademica.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterUnidadAcademica(value) : [])
      );

      this.carrerasFiltradas = this.autocompleteControlCarrera.valueChanges
        .pipe(
          map(value => typeof value === 'string' ? value : value.nombre),
          flatMap(value => value ? this._filterCarrera(value) : [])
        );

      this.registroService.getCargos().subscribe(cargos => this.cargos = cargos);

  }

  public crearUsuario(): void {
    console.log(this.usuario)
    this.registroService.create(this.usuario).
      subscribe(response => {
        this.router.navigate(['/login']);
        swal.fire('Usuario creado con éxito', 'El administrador/a lo habilitará proximamente para que pueda utilizar la plataforma', 'success')
      })
  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();

    return this.registroService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterCarrera(value: string): Observable<Carrera[]> {
    const filterValue = value.toLowerCase();

    return this.registroService.filtrarCarreras(filterValue);
  }

  mostrarNombreUnidadAcademica(unidad?: UnidadAcademica): string | undefined {
    return unidad ? unidad.nombre : undefined;
  }


  mostrarNombreCarrera(carrera?: Carrera): string | undefined {
    return carrera ? carrera.nombre : undefined;
  }

  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    let unidad = event.option.value as UnidadAcademica;
    console.log(unidad);
    this.usuario.listaDeUnidadesAcademicas.push(unidad);

    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
    let carrera = event.option.value as Carrera;
    console.log(carrera);
    this.usuario.listaDeCarreras.push(carrera);


    this.autocompleteControlCarrera.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  eliminarUnidadAcademica(id: number): void {
    this.usuario.listaDeUnidadesAcademicas = this.usuario.listaDeUnidadesAcademicas.filter((unidad: UnidadAcademica) => id !== unidad.id)
  }

  eliminarCarrera(id: number): void {
    this.usuario.listaDeCarreras = this.usuario.listaDeCarreras.filter((carrera: Carrera) => id !== carrera.id)
  }

  compararCargo(o1: Cargo, o2: Cargo): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }




}
