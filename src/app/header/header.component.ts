import { Component, OnInit } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router) { }

  logout():void {
    let username = this.authService.usuario.username;
    this.authService.logout();
    swal.fire('Logout', `Usuario con clave ${username} cerró sesión con éxito`, 'success');
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
