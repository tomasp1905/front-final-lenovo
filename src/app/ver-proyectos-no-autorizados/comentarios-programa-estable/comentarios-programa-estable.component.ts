import { Component, OnInit } from '@angular/core';
import { ProgramaEstable } from 'src/app/programas-estables/programa-estable';
import { Comentario } from 'src/app/proyectos-bianuales/objetos/comentario';
import { ActivatedRoute } from '@angular/router';
import { ComentariosProyectosService } from '../comentarios-proyectos/comentarios-proyectos.service';
import swal from 'sweetalert2';
import { VerProyectoService } from 'src/app/ver-proyectos-activos/ver-proyecto.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'app-comentarios-programa-estable',
  templateUrl: './comentarios-programa-estable.component.html'
})
export class ComentariosProgramaEstableComponent implements OnInit {

  programaEstable: ProgramaEstable = new ProgramaEstable();
  listaDeComentarios: Comentario[] = [];
  public contenidoTexto: string = '';

  constructor(private activatedRoute: ActivatedRoute, private comentariosProyectosService:ComentariosProyectosService,
              private verProyectoService: VerProyectoService, private authService: AuthService) { }

  ngOnInit() {
    this.cargarEstable();
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

    this.programaEstable.listaDeComentarios.push(comentario);
    this.contenidoTexto = '';
    // console.log(this.programaEstable.id)

  }

  eliminarComentario(id: number): void {
    this.programaEstable.listaDeComentarios = this.programaEstable.listaDeComentarios.filter((comentario: Comentario) =>  id !== comentario.id)
  }

  updateComentario(): void {
    this.comentariosProyectosService.updateComentarioEstableNoAutorizado(this.programaEstable)
      .subscribe(programaEstable => {
        swal.fire('Comentarios actualizado', `El Programa ${this.programaEstable.titulo} se actualizó con éxito`, 'success');
      }
      )
  }

  cargarEstable(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if (id) {
        this.verProyectoService.getProgramaEstable(id).subscribe((programaEstable) => this.programaEstable = programaEstable)
      }
    })
  }

}
