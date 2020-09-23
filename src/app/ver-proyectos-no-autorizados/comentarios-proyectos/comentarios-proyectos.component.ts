import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/proyectos-bianuales/objetos/comentario';
import { ProyectoBianual } from 'src/app/proyectos-bianuales/proyecto-bianual';
import swal from 'sweetalert2';
import { ComentariosProyectosService } from './comentarios-proyectos.service';
import { ActivatedRoute } from '@angular/router';
import { VerProyectoService } from 'src/app/ver-proyectos-activos/ver-proyecto.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-comentarios-proyectos',
  templateUrl: './comentarios-proyectos.component.html'
})
export class ComentariosProyectosComponent implements OnInit {

  proyectoBianual: ProyectoBianual = new ProyectoBianual();
  listaDeComentarios: Comentario[] = [];
  public contenidoTexto: string = '';


  constructor( private comentariosProyectosService:ComentariosProyectosService, private authService: AuthService,
               private activatedRoute: ActivatedRoute, private verProyectoService: VerProyectoService) { }

  ngOnInit() {
    this.cargarBianual();
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

    this.proyectoBianual.listaDeComentarios.push(comentario);
    this.contenidoTexto = '';
    // console.log(this.proyectoBianual.listaDeComentarios)
    // console.log(this.proyectoBianual.id)
  }

  eliminarComentario(id: number): void {
    this.proyectoBianual.listaDeComentarios = this.proyectoBianual.listaDeComentarios.filter((comentario: Comentario) =>  id !== comentario.id)
  }

  updateComentario(): void {
    // console.log(this.proyectoBianual.id)
    this.comentariosProyectosService.updateComentarioBianualNoAutorizado(this.proyectoBianual)
      .subscribe(proyectoBianual => {
        // swal.fire('Comentarios actualizado', `El Proyecto ${this.proyectoBianual.titulo} se actualizó con éxito`, 'success');
        window.location.reload();
      }
      )
  }

  cargarBianual(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProyectoBianual(id).subscribe((proyectoBianual) => this.proyectoBianual = proyectoBianual)
      }
    })
  }



}
