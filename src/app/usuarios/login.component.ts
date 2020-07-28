import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'

})
export class LoginComponent implements OnInit {

  titulo:string = 'Iniciar Sesión';
  usuario:Usuario;

  constructor(private authService:AuthService, private router:Router) {
  this.usuario = new Usuario();
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      swal.fire('Login', `Usuario con clave ${this.authService.usuario.username} ya está autenticado`, 'info');
      this.router.navigate(['/elegir-proyecto']);
    }
  }

  login():void{
    console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error de autenticación', 'Clave o Contraseña vacías', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe(response => {
      console.log(response);

      this.authService.guardarUsuario(response.access_token);
      this.authService.guardarToken(response.access_token);
      let usuario = this.authService.usuario;

      this.router.navigate(['/elegir-proyecto']);
      swal.fire('Login', `Usuario con clave ${usuario.username} autenticado con éxito`, 'success')
    }, err => {
      if(err.status == 400){
          swal.fire('Error de autenticación', 'Clave o Contraseña incorrecta', 'error');
      }
    }
  );
  }


}
