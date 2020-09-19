import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerProyectoService } from 'src/app/ver-proyectos-activos/ver-proyecto.service';
import { ComentariosProyectosService } from '../comentarios-proyectos/comentarios-proyectos.service';
import { ProyectoBienestar } from 'src/app/proyectos-bienestar/proyecto-bienestar';
import { Comentario } from 'src/app/proyectos-bianuales/objetos/comentario';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-comentarios-proyectos-bienestar',
  templateUrl: './comentarios-proyectos-bienestar.component.html'
})
export class ComentariosProyectosBienestarComponent implements OnInit {

  proyectoBienestar: ProyectoBienestar = new ProyectoBienestar();
  listaDeComentarios: Comentario[] = [];
  public contenidoTexto: string = '';

  constructor(private activatedRoute: ActivatedRoute, private comentariosProyectosService:ComentariosProyectosService,
              private verProyectoService: VerProyectoService, private authService: AuthService) { }

  ngOnInit() {
      this.cargarBienestar();
  }

  agregarComentario() {
    const comentario = new Comentario();
    comentario.contenido = this.contenidoTexto;
    var hoy = new Date();
    if(hoy.getMonth()>9){
    comentario.fechaDeCreacion = (hoy.getDate() + '-' + (hoy.getMonth()+1) + '-' + (hoy.getFullYear())).toString();
    }
    else{
    comentario.fechaDeCreacion = (hoy.getDate() + '-' + '0'+(hoy.getMonth()+1) + '-' + (hoy.getFullYear())).toString();
    }

    this.proyectoBienestar.listaDeComentarios.push(comentario);
    this.contenidoTexto = '';
    // console.log(this.programaEstable.id)

  }

  eliminarComentario(id: number): void {
    this.proyectoBienestar.listaDeComentarios = this.proyectoBienestar.listaDeComentarios.filter((comentario: Comentario) =>  id !== comentario.id)
  }

  updateComentario(): void {
    this.comentariosProyectosService.updateComentarioBienestarNoAutorizado(this.proyectoBienestar)
      .subscribe(proyectoBienestar => {
        swal.fire('Comentarios actualizado', `El Programa ${this.proyectoBienestar.titulo} se actualizó con éxito`, 'success');
      }
      )
  }

  cargarBienestar(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoBienestar(id).subscribe((proyectoBienestar) => this.proyectoBienestar = proyectoBienestar)
      }
    })
  }

}
