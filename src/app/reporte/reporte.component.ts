import { Component, OnInit } from '@angular/core';
import { FiltroPayload } from './objetos/filtroPayload';
import { Router } from '@angular/router';
import { ReporteService } from './reporte.service';
import { FormControl } from '@angular/forms';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Observable } from 'rxjs';
import { map, flatMap, startWith, filter } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import swal from 'sweetalert2';
import { Anio } from './objetos/anio';
import { ResultadoFiltro } from './objetos/ResultadoFiltro';
import { FiltroConResultado } from './objetos/FiltroConResultado';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {

  filtroPayload: FiltroPayload = new FiltroPayload()

  resultadoFiltro: ResultadoFiltro = new ResultadoFiltro()

  autocompleteControlUnidadAcademica = new FormControl();
  unidadesAcademicasFiltradas: Observable<UnidadAcademica[]>;

  autocompleteControlAnios = new FormControl();
  aniosFiltrados: Observable<Anio[]>;

  constructor(public reporteService: ReporteService, private router: Router) { }

  ngOnInit() {
    this.unidadesAcademicasFiltradas = this.autocompleteControlUnidadAcademica.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filterUnidadAcademica(value) : [])
      );

      this.aniosFiltrados = this.autocompleteControlAnios.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.numero),
          flatMap(value => value ? this._filterAnio(value) : this.reporteService.getAnios())
        );

  }

  private _filterUnidadAcademica(value: string): Observable<UnidadAcademica[]> {
    const filterValue = value.toLowerCase();
    return this.reporteService.filtrarUnidadesAcademicas(filterValue);
  }

  private _filterAnio(value: string): Observable<Anio[]> {
    const filterValue = value.toLowerCase();

    return this.reporteService.filtrarAnios(filterValue);
  }

  mostrarNombreUnidadAcademica(unidad?: UnidadAcademica): string | undefined {
    return unidad ? unidad.nombre : undefined;
  }

  mostrarAnio(anio?: Anio): string | undefined {
    return anio ? anio.numero : undefined;
  }

  seleccionarAnio(event: MatAutocompleteSelectedEvent): void {
    const existe = this.filtroPayload.listaDeAnios.filter(anio => anio.numero == event.option.value.numero);
    if(existe.length == 0){
    let anio = event.option.value as Anio;
    this.filtroPayload.listaDeAnios.push(anio);

    this.autocompleteControlAnios.setValue('');
    event.option.focus();
    event.option.deselect();
    }
  }

  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    const existe = this.filtroPayload.listaDeUnidadesAcademicas.filter(unidad => unidad.id == event.option.value.id);
    if(existe.length == 0){
    let unidad = event.option.value as UnidadAcademica;
    this.filtroPayload.listaDeUnidadesAcademicas.push(unidad);
    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
  }
  }

  seleccionarTodos(indicador: string){
    switch(indicador) {
      case "unidad": {
        this.filtroPayload.listaDeUnidadesAcademicasCompleta = !this.filtroPayload.listaDeUnidadesAcademicasCompleta;
          if(this.filtroPayload.listaDeUnidadesAcademicasCompleta){
            this.autocompleteControlUnidadAcademica.disable({onlySelf: true, emitEvent: false})
    this.filtroPayload.listaDeUnidadesAcademicas = new Array<UnidadAcademica>();
          } else this.autocompleteControlUnidadAcademica.enable({onlySelf: true, emitEvent: false})
      }; break;
      case "anio": {
        this.filtroPayload.listaDeAniosCompletos = !this.filtroPayload.listaDeAniosCompletos;
        if(this.filtroPayload.listaDeAniosCompletos){
          this.autocompleteControlAnios.disable({onlySelf: true, emitEvent: false})
  this.filtroPayload.listaDeAnios = new Array<Anio>();
        } else this.autocompleteControlAnios.enable({onlySelf: true, emitEvent: false})
      }; break;
      default:
    }
  }

  generarPdf(): void {
      const filtroConResultado: FiltroConResultado = {
       filtroPayolad: this.filtroPayload,
       resultadoFiltro: this.resultadoFiltro
      }

      this.reporteService.generatePdf(filtroConResultado).subscribe((data: Blob) => {
        var blob = new Blob([data], { type: 'application/pdf' });
        saveAs(blob, 'reporte.pdf');
        })
      this.filtroPayload =  new FiltroPayload();
  }

  limpiarFiltro() {
    this.filtroPayload =  new FiltroPayload();
  }

    enviarFiltro(): void {
       if(this.filtroPayload.listaDeUnidadesAcademicasCompleta) this.filtroPayload.listaDeUnidadesAcademicas = []
       if(this.filtroPayload.listaDeAniosCompletos) this.filtroPayload.listaDeAnios = []

       this.reporteService.create(this.filtroPayload).subscribe((response:ResultadoFiltro) => {
            const resultadoContador = Object.keys(response.contador).map(key => response.contador[key]).reduce((prev, next) => (prev + next), 0);
            if(resultadoContador > 0){
           this.resultadoFiltro = response;
           swal.fire('Filtro aplicado con éxito', 'Ahora haga click en el botón GENERAR PDF', 'success')
          } else {
           swal.fire('Filtro aplicado con éxito','No existen resultados para esta búsqueda.', 'error')
          }
          })
     }

}
