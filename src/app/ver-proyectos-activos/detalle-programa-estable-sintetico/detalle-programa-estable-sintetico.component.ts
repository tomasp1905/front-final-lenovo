import { Component, OnInit, Input } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { ModalProgramaEstableSinteticoService } from './modal-programa-estable-sintetico.service';

@Component({
  selector: 'app-detalle-programa-estable-sintetico',
  templateUrl: './detalle-programa-estable-sintetico.component.html'
})
export class DetalleProgramaEstableSinteticoComponent implements OnInit {

    @Input() programaEstable: ProgramaEstable;

  constructor(private modalProgramaEstableSinteticoService: ModalProgramaEstableSinteticoService) { }

  ngOnInit() {
  }

  cerrarModalSintetico(){
    this.modalProgramaEstableSinteticoService.cerrarModal();
  }

}
