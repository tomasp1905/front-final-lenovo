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

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {

  filtroPayload: FiltroPayload = new FiltroPayload()

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

  public enviarFiltro(): void {
    console.log(this.filtroPayload)
    console.log(JSON.stringify(this.filtroPayload))
    if( this.filtroPayload.listaDeUnidadesAcademicasCompleta == "TODOS") {
        this.filtroPayload.listaDeUnidadesAcademicas = []
    }
    if(this.filtroPayload.listaDeAniosCompletos == "TODOS"){
      this.filtroPayload.listaDeAnios = []
    }
    this.reporteService.create(this.filtroPayload).
      subscribe(response => {
        swal.fire('Filtro generado con éxito', 'A continuación se visualizaran los resultados', 'success')
      })
  }




}
