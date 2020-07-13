import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, flatMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import swal from 'sweetalert2';
import { ProgramaEstable } from './programa-estable';
import { Miembro } from '../proyectos-bianuales/objetos/miembro';
import { Socio } from '../proyectos-bianuales/objetos/socio';
import { Actividad } from '../proyectos-bianuales/objetos/actividad';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { Prioridad } from '../proyectos-bianuales/listas/prioridad';
import { ProgramaEstableService } from './programa-estable.service';
import { VerProyectoService } from '../ver-proyectos-activos/ver-proyecto.service';

@Component({
  selector: 'app-programas-estables',
  templateUrl: './programas-estables.component.html'
})
export class ProgramasEstablesComponent implements OnInit {

  programaEstable: ProgramaEstable = new ProgramaEstable();
  miembros: Miembro[] = [];
  socios : Socio[] = [];
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
  public telefonoSocioTexto: number = null ;
  public emailSocioTexto: string = '';

  public tipoDeActividadTexto: string = '';
  public indicadorDeResultadoTexto: string = '';
  public medioDeVerificacionTexto: string = '';
  public insumoRequeridoTexto: string = '';
  public fechaInicioTexto: string = '';
  public fechaFinalizacionTexto:string = '';

  mostrarInvestigacion = true;
  mostrarAntecedente = true;


  constructor(private programaEstableService: ProgramaEstableService, private router: Router,
              private activatedRoute: ActivatedRoute, private verProyectoService: VerProyectoService) { }

  ngOnInit() {
    this.cargarEstable();

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
            flatMap(value => value ? this._filterPrioridad(value) : this.programaEstableService.getPrioridades())
          );

  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();

    return this.programaEstableService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterCarrera(value: string): Observable<Carrera[]> {
    const filterValue = value.toLowerCase();

    return this.programaEstableService.filtrarCarreras(filterValue);
  }

  private _filterPrioridad(value: string): Observable<Prioridad[]> {
    const filterValue = value.toLowerCase();

    return this.programaEstableService.filtrarPrioridades(filterValue);
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


  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    let unidad = event.option.value as UnidadAcademica;
    console.log(unidad);
    this.programaEstable.unidadesAcademicas.push(unidad);

    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
    let carrera = event.option.value as Carrera;
    console.log(carrera);
    this.programaEstable.listaDeCarreras.push(carrera);

    this.autocompleteControlCarrera.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarPrioridad(event: MatAutocompleteSelectedEvent): void {
    let prioridad = event.option.value as Prioridad;
    console.log(prioridad);
    this.programaEstable.listaDePrioridades.push(prioridad);

    this.autocompleteControlPrioridad.setValue('');
    event.option.focus();
    event.option.deselect();
  }


  eliminarUnidadAcademica(id: number): void {
    this.programaEstable.unidadesAcademicas = this.programaEstable.unidadesAcademicas.filter((unidad: UnidadAcademica) => id !== unidad.id)
  }

  eliminarCarrera(id: number): void {
    this.programaEstable.listaDeCarreras = this.programaEstable.listaDeCarreras.filter((carrera: Carrera) => id !== carrera.id)
  }

  eliminarPrioridad(id: number): void {
    this.programaEstable.listaDePrioridades = this.programaEstable.listaDePrioridades.filter((prioridad: Prioridad) => id !== prioridad.id)
  }


  agregarMiembro(){
    const miembro = new Miembro();
    miembro.nombre = this.nombreMiembroTexto;
    miembro.apellido= this.apellidoMiembroTexto;
    miembro.clave = this.claveMiembroTexto;
    miembro.facultad = this.facultadMiembroTexto;
    this.programaEstable.miembros.push(miembro);
    this.nombreMiembroTexto= '';
    this.apellidoMiembroTexto = '';
    this.claveMiembroTexto = '';
    this.facultadMiembroTexto ='';
    console.log(this.programaEstable)
  }

  eliminarMiembro(id: number): void {
    this.programaEstable.miembros = this.programaEstable.miembros.filter((miembro: Miembro) => id !== miembro.id)
  }

  agregarSocio(){
    const socio = new Socio();
    socio.institucion = this.institucionSocioTexto;
    socio.domicilioLegal = this.domicilioSocioTexto;
    socio.descripcion = this.descripcionSocioTexto;
    socio.nombre = this.nombreSocioTexto;
    socio.apellido = this.apellidoSocioTexto;
    socio.telefono = this.telefonoSocioTexto
    socio.email = this.emailSocioTexto;
    this.programaEstable.socios.push(socio);
    this.institucionSocioTexto = '';
    this.domicilioSocioTexto = '';
    this.descripcionSocioTexto = '';
    this.nombreSocioTexto = '';
    this.apellidoSocioTexto = '';
    this.telefonoSocioTexto = null;
    this.emailSocioTexto = '';
    console.log(this.programaEstable)

  }

  eliminarSocio(id: number): void {
    this.programaEstable.socios = this.programaEstable.socios.filter((socio: Socio) => id !== socio.id)
  }

  agregarActividad(){
    const actividad = new Actividad();
    actividad.tipoDeActividad = this.tipoDeActividadTexto;
    actividad.indicadorDeResultado = this.indicadorDeResultadoTexto;
    actividad.medioDeVerificacion = this.medioDeVerificacionTexto;
    actividad.insumoRequerido = this.insumoRequeridoTexto;
    actividad.fechaInicio = this.fechaInicioTexto;
    actividad.fechaFinalizacion = this.fechaFinalizacionTexto;
    this.programaEstable.listaDeActividades.push(actividad);
    this.tipoDeActividadTexto = '';
    this.indicadorDeResultadoTexto = '';
    this.medioDeVerificacionTexto = '';
    this.insumoRequeridoTexto = '';
    this.fechaInicioTexto = '';
    this.fechaFinalizacionTexto = '';
    console.log(this.programaEstable)
  }

  eliminarActividad(id: number): void {
    this.programaEstable.listaDeActividades = this.programaEstable.listaDeActividades.filter((actividad: Actividad) => id !== actividad.id)
  }


  public crearProyecto(): void {
    if(this.programaEstable.director.nombre == null){
      this.programaEstable.director = null;
    }
    if (this.programaEstable.proyectoDeInvestigacion.nombre == null){
      this.programaEstable.proyectoDeInvestigacion = null;
    }
    this.programaEstableService.create(this.programaEstable).
      subscribe(response => {
        this.programaEstable.fechaDeCreacion = new Date();
        this.router.navigate(['/programa-estable/presupuesto', response.id]);
        swal.fire('Proyecto creado con éxito', `Proyecto ${this.programaEstable.titulo}`, 'success')
        console.log(this.programaEstable);
      })
  }


  cargarEstable(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProgramaEstable(id).subscribe((programaEstable) => this.programaEstable = programaEstable)
      }
    })
  }

  updateEstable(): void {
    this.programaEstableService.update(this.programaEstable)
      .subscribe(programaEstable => {
        this.router.navigate(['/ver-mis-proyectos'])
        swal.fire('Programa actualizado', `El programa ${this.programaEstable.titulo} se actualizó con éxito`, 'success');
      }
      )
  }

}
