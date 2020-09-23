import { Component, OnInit } from '@angular/core';
import { ProyectoEspecial } from 'src/app/proyectos-especiales/proyecto-especial';
import { Comentario } from 'src/app/proyectos-bianuales/objetos/comentario';
import { ActivatedRoute } from '@angular/router';
import { VerProyectoService } from 'src/app/ver-proyectos-activos/ver-proyecto.service';
import { ComentariosProyectosService } from '../comentarios-proyectos/comentarios-proyectos.service';
import swal from 'sweetalert2';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-comentarios-proyectos-especiales',
  templateUrl: './comentarios-proyectos-especiales.component.html'
})
export class ComentariosProyectosEspecialesComponent implements OnInit {

  proyectoEspecial: ProyectoEspecial = new ProyectoEspecial();
  listaDeComentarios: Comentario[] = [];
  public contenidoTexto: string = '';

  constructor(private activatedRoute: ActivatedRoute, private comentariosProyectosService:ComentariosProyectosService,
              private verProyectoService: VerProyectoService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarEspecial();
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

    this.proyectoEspecial.listaDeComentarios.push(comentario);
    this.contenidoTexto = '';
    // console.log(this.programaEstable.id)

  }

  eliminarComentario(id: number): void {
    this.proyectoEspecial.listaDeComentarios = this.proyectoEspecial.listaDeComentarios.filter((comentario: Comentario) =>  id !== comentario.id)
  }

  updateComentario(): void {
    this.comentariosProyectosService.updateComentarioEspecialNoAutorizado(this.proyectoEspecial)
      .subscribe(proyectoBienestar => {
        // swal.fire('Comentarios actualizado', `El Programa ${this.proyectoEspecial.titulo} se actualizó con éxito`, 'success');
        window.location.reload();
      }
      )
  }

  cargarEspecial(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoEspecial(id).subscribe((proyectoEspecial) => this.proyectoEspecial = proyectoEspecial)
      }
    })
  }

}
