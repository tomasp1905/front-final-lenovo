import { Component, OnInit } from '@angular/core';
import { FiltroPayload } from './objetos/filtroPayload';
import { Router } from '@angular/router';
import { ReporteService } from './reporte.service';
import { FormControl } from '@angular/forms';
import { UnidadAcademica } from '../proyectos-bianuales/listas/unidad-academica';
import { Observable } from 'rxjs';
import { map, flatMap, startWith } from 'rxjs/operators';
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
    let anio = event.option.value as Anio;
    //console.log(unidad);
    this.filtroPayload.listaDeAnios.push(anio);

    this.autocompleteControlAnios.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  seleccionarUnidadAcademica(event: MatAutocompleteSelectedEvent): void {
    let unidad = event.option.value as UnidadAcademica;
    //console.log(unidad);
    this.filtroPayload.listaDeUnidadesAcademicas.push(unidad);

    this.autocompleteControlUnidadAcademica.setValue('');
    event.option.focus();
    event.option.deselect();
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
  }

  limpiarFiltro() {
    this.filtroPayload =  new FiltroPayload();
  }

    enviarFiltro(): void {
       if( this.filtroPayload.listaDeUnidadesAcademicasCompleta == "TODOS") {
           this.filtroPayload.listaDeUnidadesAcademicas = []
       }
       if(this.filtroPayload.listaDeAniosCompletos == "TODOS"){
         this.filtroPayload.listaDeAnios = []
       }

       this.reporteService.create(this.filtroPayload).subscribe(response => {
           this.resultadoFiltro = response;
           swal.fire('Filtro aplicado con éxito', 'Ahora haga click en el botón GENERAR PDF', 'success')
         })
     }

}
