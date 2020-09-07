import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import swal from 'sweetalert2';

import { ProyectoBianual } from './proyecto-bianual';
import { UnidadAcademica } from './listas/unidad-academica';
import { ProyectoBianualService } from './proyecto-bianual.service';
import { Carrera } from './listas/carrera';
import { Prioridad } from './listas/prioridad';
import { Miembro } from './objetos/miembro';
import { Socio } from './objetos/socio';
import { Actividad } from './objetos/actividad';
import { VerProyectoService } from '../ver-proyectos-activos/ver-proyecto.service';
import { Director } from './objetos/director';
import { ProyectoDeInvestigacion } from './objetos/proyectoInvestigacion';



@Component({
  selector: 'app-proyectos-bianuales',
  templateUrl: './proyectos-bianuales.component.html'
})
export class ProyectosBianualesComponent implements OnInit {

  proyectoBianual: ProyectoBianual = new ProyectoBianual();
  miembros: Miembro[] = [];
  socios: Socio[] = [];
  listaDeActividades: Actividad[] = [];

  autocompleteControlUnidadAcademica = new FormControl();
  unidadesAcademicasFiltradas: Observable<UnidadAcademica[]>;

  autocompleteControlCarrera = new FormControl();
  carrerasFiltradas: Observable<Carrera[]>;

  autocompleteControlPrioridad = new FormControl();
  prioridadesFiltradas: Observable<Prioridad[]>;


  public nombreMiembroTexto: string = '';
  public apellidoMiembroTexto: string = '';
  public claveMiembroTexto: string = '';
  public facultadMiembroTexto: string = '';

  public institucionSocioTexto: string = '';
  public domicilioSocioTexto: string = '';
  public descripcionSocioTexto: string = '';
  public nombreSocioTexto: string = '';
  public apellidoSocioTexto: string = '';
  public telefonoSocioTexto: number = null;
  public emailSocioTexto: string = '';

  public tipoDeActividadTexto: string = '';
  public indicadorDeResultadoTexto: string = '';
  public medioDeVerificacionTexto: string = '';
  public insumoRequeridoTexto: string = '';
  public fechaInicioTexto: string = '';
  public fechaFinalizacionTexto: string = '';

  mostrarRenovacion = true;
  mostrarInvestigacion = true;

  private presupuestoSeleccionado: File;


  constructor(private proyectoBianualService: ProyectoBianualService, private router: Router,
    private verProyectoService: VerProyectoService, private activatedRoute: ActivatedRoute) {

     }

  ngOnInit() {
    this.cargarBianual();

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

    this.prioridadesFiltradas = this.autocompleteControlPrioridad.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterPrioridad(value) : this.proyectoBianualService.getPrioridades())
      );

  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBianualService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterCarrera(value: string): Observable<Carrera[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBianualService.filtrarCarreras(filterValue);
  }

  private _filterPrioridad(value: string): Observable<Prioridad[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoBianualService.filtrarPrioridades(filterValue);
  }


  mostrarNombreUnidadAcademica(unidad?: UnidadAcademica): string | undefined {
    return unidad ? unidad.nombre : undefined;
  }


  mostrarNombreCarrera(carrera?: Carrera): string | undefined {
    return carrera ? carrera.nombre : undefined;
  }

  mostrarNombrePrioridad(prioridad?: Prioridad): string | undefined {
    return prioridad ? prioridad.nombre : undefined;
  }


  // seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
  //   let unidad = event.option.value as UnidadAcademica;
  //   //console.log(unidad);
  //   this.proyectoBianual.unidadesAcademicas.push(unidad);
  //
  //   this.autocompleteControlUnidadAcademica.setValue('');
  //   event.option.focus();
  //   event.option.deselect();
  // }

  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    const existe = this.proyectoBianual.unidadesAcademicas.filter(unidad => unidad.id == event.option.value.id);
    if(existe.length == 0){
    let unidad = event.option.value as UnidadAcademica;
    this.proyectoBianual.unidadesAcademicas.push(unidad);
    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }
  }

  // seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
  //   let carrera = event.option.value as Carrera;
  //   this.proyectoBianual.listaDeCarreras.push(carrera);
  //   this.autocompleteControlCarrera.setValue('');
  //   event.option.focus();
  //   event.option.deselect();
  // }

   seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
     const existe = this.proyectoBianual.listaDeCarreras.filter(carrera => carrera.id == event.option.value.id);
     if(existe.length == 0){
     let carrera = event.option.value as Carrera;
     this.proyectoBianual.listaDeCarreras.push(carrera);
     this.autocompleteControlCarrera.setValue('');
     event.option.focus();
     event.option.deselect();
   }
 }


  // seleccionarPrioridad(event: MatAutocompleteSelectedEvent): void {
  //   let prioridad = event.option.value as Prioridad;
  //   //console.log(prioridad);
  //   this.proyectoBianual.listaDePrioridades.push(prioridad);
  //
  //   this.autocompleteControlPrioridad.setValue('');
  //   event.option.focus();
  //   event.option.deselect();
  // }

   seleccionarPrioridad(event: MatAutocompleteSelectedEvent): void {
     const existe = this.proyectoBianual.listaDePrioridades.filter(prioridad => prioridad.id == event.option.value.id);
     if(existe.length == 0){
     let prioridad = event.option.value as Prioridad;
     this.proyectoBianual.listaDePrioridades.push(prioridad);
     this.autocompleteControlPrioridad.setValue('');
     event.option.focus();
     event.option.deselect();
   }
   }



  eliminarUnidadAcademica(id: number): void {
    this.proyectoBianual.unidadesAcademicas = this.proyectoBianual.unidadesAcademicas.filter((unidad: UnidadAcademica) => id !== unidad.id)
  }

  eliminarCarrera(id: number): void {
    this.proyectoBianual.listaDeCarreras = this.proyectoBianual.listaDeCarreras.filter((carrera: Carrera) => id !== carrera.id)
  }

  eliminarPrioridad(id: number): void {
    this.proyectoBianual.listaDePrioridades = this.proyectoBianual.listaDePrioridades.filter((prioridad: Prioridad) => id !== prioridad.id)
  }


  agregarMiembro() {
    const miembro = new Miembro();
    miembro.nombre = this.nombreMiembroTexto;
    miembro.apellido = this.apellidoMiembroTexto;
    miembro.clave = this.claveMiembroTexto;
    miembro.facultad = this.facultadMiembroTexto;
    this.proyectoBianual.miembros.push(miembro);
    this.nombreMiembroTexto = '';
    this.apellidoMiembroTexto = '';
    this.claveMiembroTexto = '';
    this.facultadMiembroTexto = '';
  }

  eliminarMiembro(): void {
    this.proyectoBianual.miembros = this.proyectoBianual.miembros.filter((miembro: Miembro) => miembro.id)
  }



  agregarSocio() {
    const socio = new Socio();
    socio.institucion = this.institucionSocioTexto;
    socio.domicilioLegal = this.domicilioSocioTexto;
    socio.descripcion = this.descripcionSocioTexto;
    socio.nombre = this.nombreSocioTexto;
    socio.apellido = this.apellidoSocioTexto;
    socio.telefono = this.telefonoSocioTexto
    socio.email = this.emailSocioTexto;
    this.proyectoBianual.socios.push(socio);
    this.institucionSocioTexto = '';
    this.domicilioSocioTexto = '';
    this.descripcionSocioTexto = '';
    this.nombreSocioTexto = '';
    this.apellidoSocioTexto = '';
    this.telefonoSocioTexto = null;
    this.emailSocioTexto = '';
    //console.log(this.proyectoBianual)
  }

  eliminarSocio(): void {
    this.proyectoBianual.socios = this.proyectoBianual.socios.filter((socio: Socio) => socio.id)
  }



  agregarActividad() {
    const actividad = new Actividad();
    actividad.tipoDeActividad = this.tipoDeActividadTexto;
    actividad.indicadorDeResultado = this.indicadorDeResultadoTexto;
    actividad.medioDeVerificacion = this.medioDeVerificacionTexto;
    actividad.insumoRequerido = this.insumoRequeridoTexto;
    actividad.fechaInicio = this.fechaInicioTexto;
    actividad.fechaFinalizacion = this.fechaFinalizacionTexto;
    this.proyectoBianual.listaDeActividades.push(actividad);
    this.tipoDeActividadTexto = '';
    this.indicadorDeResultadoTexto = '';
    this.medioDeVerificacionTexto = '';
    this.insumoRequeridoTexto = '';
    this.fechaInicioTexto = '';
    this.fechaFinalizacionTexto = '';
    //console.log(this.proyectoBianual)

  }

  eliminarActividad(id: number): void {
    this.proyectoBianual.listaDeActividades = this.proyectoBianual.listaDeActividades.filter((actividad: Actividad) =>  id !== actividad.id)
  }


  public crearProyecto(): void {
    if (this.proyectoBianual.proyectoDeInvestigacion.nombre == null){
      this.proyectoBianual.proyectoDeInvestigacion = null;
    }
    this.proyectoBianualService.create(this.proyectoBianual).
      subscribe(response => {
        this.proyectoBianual.fechaDeCreacion = new Date();

        this.router.navigate(['/proyecto-bianual/presupuesto', response.id]);
        swal.fire('Proyecto creado con éxito', `Proyecto ${this.proyectoBianual.titulo}`, 'success')

      })
  }


  cargarBianual(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoBianual(id).subscribe((proyectoBianual) => this.proyectoBianual = proyectoBianual)
      }
    })
  }

  updateBianual(): void {
    this.proyectoBianualService.update(this.proyectoBianual)
      .subscribe(proyectoBianual => {
        swal.fire('Proyecto actualizado', `El Proyecto ${this.proyectoBianual.titulo} se actualizó con éxito`, 'success');
      }
      )
  }




}
