import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Usuario } from '../usuario';
import { VerUsuarioService } from './ver-usuario.service';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.component.html'
})
export class VerUsuariosComponent implements OnInit {

  usuariosAdmin: Usuario[];
  usuariosUser: Usuario[];
  usuariosVisit: Usuario[];

  constructor(private verUsuarioService: VerUsuarioService) { }

  ngOnInit() {
    this.verUsuarioService.getUsuariosAdmin().subscribe(
      usuariosAdmin => this.usuariosAdmin = usuariosAdmin
    );
    this.verUsuarioService.getUsuariosUser().subscribe(
      usuariosUser => this.usuariosUser = usuariosUser
    );
    this.verUsuarioService.getUsuariosVisit().subscribe(
      usuariosVisit => this.usuariosVisit = usuariosVisit
    );
  }

  establecerComoAdmin(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea establecer como Admin el usuario con clave ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.verUsuarioService.establecerComoAdmin(usuario.id).subscribe(
          response => {
            this.usuariosAdmin = this.usuariosAdmin.filter(usu => usu !== usuario)
            // swalWithBootstrapButtons.fire(
            //   '¡Rol Admin establecido!',
            //   `El usuario con clave ${usuario.username} es Admin`,
            //   'success'
            // )
            window.location.reload();
          }
        )
      }
    })
  }

  establecerComoUser(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea establecer como Docente el usuario con clave ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.verUsuarioService.establecerComoUser(usuario.id).subscribe(
          response => {
            this.usuariosUser = this.usuariosUser.filter(usu => usu !== usuario)
            // swalWithBootstrapButtons.fire(
            //   '¡Rol Docente establecido!',
            //   `El usuario con clave ${usuario.username} es Docente`,
            //   'success'
            // )
            window.location.reload();
          }
        )
      }
    })
  }

  establecerComoVisit(usuario: Usuario): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: '¿Está seguro?',
      text: `¿Seguro que desea establecer como Visitante el usuario con clave ${usuario.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, seguro',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.verUsuarioService.establecerComoVisit(usuario.id).subscribe(
          response => {
            this.usuariosVisit = this.usuariosVisit.filter(usu => usu !== usuario)
            // swalWithBootstrapButtons.fire(
            //   '¡Rol Visitante establecido!',
            //   `El usuario con clave ${usuario.username} es Visitante`,
            //   'success'
            // )
            window.location.reload();
          }
        )
      }
    })
  }




}
