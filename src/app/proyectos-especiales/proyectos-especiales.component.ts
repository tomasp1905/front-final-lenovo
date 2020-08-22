import { Component, OnInit } from '@angular/core';
import { ProyectoEspecial } from './proyecto-especial';
import { Miembro } from '../proyectos-bianuales/objetos/miembro';
import { Socio } from '../proyectos-bianuales/objetos/socio';
import { Actividad } from '../proyectos-bianuales/objetos/actividad';
import { Observable } from 'rxjs';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Carrera } from '../proyectos-bianuales/listas/carrera';
import { FormControl } from '@angular/forms';
import { ProyectoEspecialService } from './proyecto-especial.service';
import { map, startWith, flatMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import swal from 'sweetalert2';
import { VerProyectoService } from '../ver-proyectos-activos/ver-proyecto.service';

@Component({
  selector: 'app-proyectos-especiales',
  templateUrl: './proyectos-especiales.component.html'

})
export class ProyectosEspecialesComponent implements OnInit {

  proyectoEspecial: ProyectoEspecial = new ProyectoEspecial();
  miembros: Miembro[] = [];
  socios : Socio[] = [];
  listaDeActividades: Actividad[] = [];

  autocompleteControlUnidadAcademica = new FormControl();
  unidadesAcademicasFiltradas: Observable<UnidadAcademica[]>;

  autocompleteControlCarrera = new FormControl();
  carrerasFiltradas: Observable<Carrera[]>;


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

   mostrarRenovacion = true;


  constructor(private proyectoEspecialService: ProyectoEspecialService, private router: Router,
              private verProyectoService: VerProyectoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.cargarEspecial();

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

  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoEspecialService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterCarrera(value: string): Observable<Carrera[]> {
    const filterValue = value.toLowerCase();

    return this.proyectoEspecialService.filtrarCarreras(filterValue);
  }


  mostrarNombreUnidadAcademica(unidad?: UnidadAcademica): string | undefined {
    return unidad ? unidad.nombre : undefined;
  }

  mostrarNombreCarrera(carrera?: Carrera): string | undefined {
    return carrera ? carrera.nombre : undefined;
  }


  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    let unidad = event.option.value as UnidadAcademica;
    //console.log(unidad);
    this.proyectoEspecial.unidadesAcademicas.push(unidad);

    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarCarrera(event: MatAutocompleteSelectedEvent): void {
    let carrera = event.option.value as Carrera;
    //console.log(carrera);
    this.proyectoEspecial.listaDeCarreras.push(carrera);

    this.autocompleteControlCarrera.setValue('');
    event.option.focus();
    event.option.deselect();
  }



  eliminarUnidadAcademica(id: number): void {
    this.proyectoEspecial.unidadesAcademicas = this.proyectoEspecial.unidadesAcademicas.filter((unidad: UnidadAcademica) => id !== unidad.id)
  }

  eliminarCarrera(id: number): void {
    this.proyectoEspecial.listaDeCarreras = this.proyectoEspecial.listaDeCarreras.filter((carrera: Carrera) => id !== carrera.id)
  }


  agregarMiembro(){
    const miembro = new Miembro();
    miembro.nombre = this.nombreMiembroTexto;
    miembro.apellido= this.apellidoMiembroTexto;
    miembro.clave = this.claveMiembroTexto;
    miembro.facultad = this.facultadMiembroTexto;
    this.proyectoEspecial.miembros.push(miembro);
    this.nombreMiembroTexto= '';
    this.apellidoMiembroTexto = '';
    this.claveMiembroTexto = '';
    this.facultadMiembroTexto ='';
    //console.log(this.proyectoEspecial)
  }

  eliminarMiembro(id: number): void {
    this.proyectoEspecial.miembros = this.proyectoEspecial.miembros.filter((miembro: Miembro) => id !== miembro.id)
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
    this.proyectoEspecial.socios.push(socio);
    this.institucionSocioTexto = '';
    this.domicilioSocioTexto = '';
    this.descripcionSocioTexto = '';
    this.nombreSocioTexto = '';
    this.apellidoSocioTexto = '';
    this.telefonoSocioTexto = null;
    this.emailSocioTexto = '';
    //console.log(this.proyectoEspecial)

  }

  eliminarSocio(id: number): void {
    this.proyectoEspecial.socios = this.proyectoEspecial.socios.filter((socio: Socio) => id !== socio.id)
  }

  agregarActividad(){
    const actividad = new Actividad();
    actividad.tipoDeActividad = this.tipoDeActividadTexto;
    actividad.indicadorDeResultado = this.indicadorDeResultadoTexto;
    actividad.medioDeVerificacion = this.medioDeVerificacionTexto;
    actividad.insumoRequerido = this.insumoRequeridoTexto;
    actividad.fechaInicio = this.fechaInicioTexto;
    actividad.fechaFinalizacion = this.fechaFinalizacionTexto;
    this.proyectoEspecial.listaDeActividades.push(actividad);
    this.tipoDeActividadTexto = '';
    this.indicadorDeResultadoTexto = '';
    this.medioDeVerificacionTexto = '';
    this.insumoRequeridoTexto = '';
    this.fechaInicioTexto = '';
    this.fechaFinalizacionTexto = '';
    //console.log(this.proyectoEspecial)
  }

  eliminarActividad(id: number): void {
    this.proyectoEspecial.listaDeActividades = this.proyectoEspecial.listaDeActividades.filter((actividad: Actividad) => id !== actividad.id)
  }


  public crearProyecto(): void {
    if(this.proyectoEspecial.director.nombre == null){
      this.proyectoEspecial.director = null;
    }
    this.proyectoEspecialService.create(this.proyectoEspecial).
      subscribe(response => {
          this.proyectoEspecial.fechaDeCreacion = new Date();
          this.router.navigate(['/proyecto-especial/presupuesto', response.id]);
        swal.fire('Proyecto creado con éxito', `Proyecto ${this.proyectoEspecial.titulo}`, 'success')
        //console.log(this.proyectoEspecial);
      })
  }


  cargarEspecial(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoEspecial(id).subscribe((proyectoEspecial) => this.proyectoEspecial = proyectoEspecial)
      }
    })
  }

  updateEspecial(): void {
    this.proyectoEspecialService.update(this.proyectoEspecial)
      .subscribe(proyectoEspecial => {
        swal.fire('Proyecto actualizado', `El Proyecto ${this.proyectoEspecial.titulo} se actualizó con éxito`, 'success');
       //console.log(this.proyectoEspecial)
      }
      )
  }

}
