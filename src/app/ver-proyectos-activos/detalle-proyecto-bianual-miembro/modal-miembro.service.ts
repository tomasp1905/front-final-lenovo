import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalMiembroService {

  modal: boolean = false;

  constructor() { }

  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}
