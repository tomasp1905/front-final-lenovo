import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import swal from 'sweetalert2';
import { ProyectoBienestar } from './proyecto-bienestar';
import { Miembro } from '../proyectos-bianuales/objetos/miembro';
import { Socio } from '../proyectos-bianuales/objetos/socio';
import { Actividad } from '../proyectos-bianuales/objetos/actividad';
import { Tematica } from './lista/tematica';
import { startWith, map, flatMap } from 'rxjs/operators';
import { ProyectoBienestarService } from './proyecto-bienestar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { VerProyectoService } from '../ver-proyectos-activos/ver-proyecto.service';

@Component({
  selector: 'app-proyectos-bienestar',
  templateUrl: './proyectos-bienestar.component.html'
})
export class ProyectosBienestarComponent implements OnInit {

  proyectoBienestar: ProyectoBienestar = new ProyectoBienestar();
  miembros: Miembro[] = [];
  socios : Socio[] = [];
  listaDeActividades: Actividad[] = [];
  listaDeTematicas: Tematica[] = [];

  autocompleteControlUnidadAcademica = new FormControl();
  unidadesAcademicasFiltradas: Observable<UnidadAcademica[]>;

  autocompleteControlCarrera = new FormControl();
  carrerasFiltradas: Observable<Carrera[]>;

  autocompleteControlTematica = new FormControl();
  tematicasFiltradas: Observable<Tematica[]>;

  public nombreMiembroTexto: string = '';
  public apellidoMiembroTexto: string = '';
  public claveMiembroTexto: string = '';
  public facultadMiembroTexto: string = '';

  public tipoDeActividadTexto: string = '';
  public indicadorDeResultadoTexto: string = '';
  public medioDeVerificacionTexto: string = '';
  public insumoRequeridoTexto: string = '';
  public fechaInicioTexto: string = '';
  public fechaFinalizacionTexto:string = '';

 mostrarRenovacion = true;

  constructor(private proyectoBinestarService: ProyectoBienestarService, private router: Router,
              private verProyectoService: VerProyectoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

   this.cargarBienestar();

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


    this.tematicasFiltradas = this.autocompleteControlTematica.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterTematica(value) : this.proyectoBinestarService.getTematicas())
      );
  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBinestarService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterCarrera(value: string): Observable<Carrera[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBinestarService.filtrarCarreras(filterValue);
  }


  private _filterTematica(value: string): Observable<Tematica[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBinestarService.filtrarTematicas(filterValue);
  }


  mostrarNombreUnidadAcademica(unidad?: UnidadAcademica): string | undefined {
    return unidad ? unidad.nombre : undefined;
  }

  mostrarNombreCarrera(carrera?: Carrera): string | undefined {
    return carrera ? carrera.nombre : undefined;
  }


  mostrarNombreTematica(tematica?: Tematica): string | undefined {
    return tematica ? tematica.nombre : undefined;
  }


  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    let unidad = event.option.value as UnidadAcademica;
    //console.log(unidad);
    this.proyectoBienestar.unidadesAcademicas.push(unidad);

    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
    let carrera = event.option.value as Carrera;
    //console.log(carrera);
    this.proyectoBienestar.listaDeCarreras.push(carrera);

    this.autocompleteControlCarrera.setValue('');
    event.option.focus();
    event.option.deselect();
  }


  seleccionarTematica(event: MatAutocompleteSelectedEvent): void {
    let tematica = event.option.value as Tematica;
    //console.log(tematica);
    this.proyectoBienestar.listaDeTematicas.push(tematica);

    this.autocompleteControlTematica.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  eliminarUnidadAcademica(id: number): void {
    this.proyectoBienestar.unidadesAcademicas = this.proyectoBienestar.unidadesAcademicas.filter((unidad: UnidadAcademica) => id !== unidad.id)
  }

  eliminarCarrera(id: number): void {
    this.proyectoBienestar.listaDeCarreras = this.proyectoBienestar.listaDeCarreras.filter((carrera: Carrera) => id !== carrera.id)
  }


  eliminarTematica(id: number): void {
    this.proyectoBienestar.listaDeTematicas = this.proyectoBienestar.listaDeTematicas.filter((tematica: Tematica) => id !== tematica.id)
  }

  agregarMiembro(){
    const miembro = new Miembro();
    miembro.nombre = this.nombreMiembroTexto;
    miembro.apellido= this.apellidoMiembroTexto;
    miembro.clave = this.claveMiembroTexto;
    miembro.facultad = this.facultadMiembroTexto;
    this.proyectoBienestar.miembros.push(miembro);
    this.nombreMiembroTexto= '';
    this.apellidoMiembroTexto = '';
    this.claveMiembroTexto = '';
    this.facultadMiembroTexto ='';
    //console.log(this.proyectoBienestar)
  }

  eliminarMiembro(id: number): void {
    this.proyectoBienestar.miembros = this.proyectoBienestar.miembros.filter((miembro: Miembro) => id !== miembro.id)
  }

  agregarActividad(){
    const actividad = new Actividad();
    actividad.tipoDeActividad = this.tipoDeActividadTexto;
    actividad.indicadorDeResultado = this.indicadorDeResultadoTexto;
    actividad.medioDeVerificacion = this.medioDeVerificacionTexto;
    actividad.insumoRequerido = this.insumoRequeridoTexto;
    actividad.fechaInicio = this.fechaInicioTexto;
    actividad.fechaFinalizacion = this.fechaFinalizacionTexto;
    this.proyectoBienestar.listaDeActividades.push(actividad);
    this.tipoDeActividadTexto = '';
    this.indicadorDeResultadoTexto = '';
    this.medioDeVerificacionTexto = '';
    this.insumoRequeridoTexto = '';
    this.fechaInicioTexto = '';
    this.fechaFinalizacionTexto = '';
    //console.log(this.proyectoBienestar)
  }

  eliminarActividad(id: number): void {
    this.proyectoBienestar.listaDeActividades = this.proyectoBienestar.listaDeActividades.filter((actividad: Actividad) => id !== actividad.id)
  }

  public crearProyecto(): void {
    if(this.proyectoBienestar.director.nombre == null){
      this.proyectoBienestar.director = null;
    }
    this.proyectoBinestarService.create(this.proyectoBienestar).
      subscribe(response => {
        this.proyectoBienestar.fechaDeCreacion = new Date();
        this.router.navigate(['/proyecto-bienestar/presupuesto', response.id]);
        swal.fire('Proyecto creado con éxito', `Proyecto ${this.proyectoBienestar.titulo}`, 'success')
        //console.log(this.proyectoBienestar);
      })
  }


  cargarBienestar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoBienestar(id).subscribe((proyectoBienestar) => this.proyectoBienestar = proyectoBienestar)
      }
    })
  }

  updateBienestar(): void {
    this.proyectoBinestarService.update(this.proyectoBienestar)
      .subscribe(proyectoBienestar => {
        swal.fire('Proyecto actualizado', `El Proyecto ${this.proyectoBienestar.titulo} se actualizó con éxito`, 'success');
        //console.log(this.proyectoBienestar)
      }
      )
  }

}
