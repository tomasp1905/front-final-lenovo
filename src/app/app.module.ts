import { BrowserModule } from '@angular/platform-browser';

import { NgModule, LOCALE_ID } from '@angular/core';
import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es')

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ElegirProyectoComponent } from './elegir-proyecto/elegir-proyecto.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProyectosBianualesComponent } from './proyectos-bianuales/proyectos-bianuales.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VerProyectosComponent } from './ver-proyectos-activos/ver-proyectos.component';
import { DetalleProyectoComponent } from './ver-proyectos-activos/detalle-proyecto-bianual/detalle-proyecto.component';
import { ProyectosBienestarComponent } from './proyectos-bienestar/proyectos-bienestar.component';
import { ProgramasEstablesComponent } from './programas-estables/programas-estables.component';
import { ProyectosEspecialesComponent } from './proyectos-especiales/proyectos-especiales.component';
import { DetalleProyectoSinteticoComponent } from './ver-proyectos-activos/detalle-proyecto-bianual-sintetico/detalle-proyecto-sintetico.component';
import { DetalleSocioComponent } from './ver-proyectos-activos/detalle-proyecto-bianual-socio/detalle-socio.component';
import { DetalleMiembroComponent } from './ver-proyectos-activos/detalle-proyecto-bianual-miembro/detalle-miembro.component';
import { DetalleProgramaEstableComponent } from './ver-proyectos-activos/detalle-programa-estable/detalle-programa-estable.component';
import { DetalleProgramaEstableMiembroComponent } from './ver-proyectos-activos/detalle-programa-estable-miembro/detalle-programa-estable-miembro.component';
import { DetalleProgramaEstableSocioComponent } from './ver-proyectos-activos/detalle-programa-estable-socio/detalle-programa-estable-socio.component';
import { DetalleProgramaEstableSinteticoComponent } from './ver-proyectos-activos/detalle-programa-estable-sintetico/detalle-programa-estable-sintetico.component';
import { DetalleProyectoBienestarComponent } from './ver-proyectos-activos/detalle-proyecto-bienestar/detalle-proyecto-bienestar.component';
import { DetalleProyectoBienestarMiembroComponent } from './ver-proyectos-activos/detalle-proyecto-bienestar-miembro/detalle-proyecto-bienestar-miembro.component';
import { DetalleProyectoBienestarSinteticoComponent } from './ver-proyectos-activos/detalle-proyecto-bienestar-sintetico/detalle-proyecto-bienestar-sintetico.component';
import { DetalleProyectoEspecialComponent } from './ver-proyectos-activos/detalle-proyecto-especial/detalle-proyecto-especial.component';
import { DetalleProyectoEspecialMiembroComponent } from './ver-proyectos-activos/detalle-proyecto-especial-miembro/detalle-proyecto-especial-miembro.component';
import { DetalleProyectoEspecialSocioComponent } from './ver-proyectos-activos/detalle-proyecto-especial-socio/detalle-proyecto-especial-socio.component';
import { DetalleProyectoEspecialSinteticoComponent } from './ver-proyectos-activos/detalle-proyecto-especial-sintetico/detalle-proyecto-especial-sintetico.component';
import { PresupuestoComponent } from './proyectos-bianuales/presupuesto/presupuesto.component';
import { PresupuestoEstableComponent } from './programas-estables/presupuesto-estable/presupuesto-estable.component';
import { PresupuestoBienestarComponent } from './proyectos-bienestar/presupuesto-bienestar/presupuesto-bienestar.component';
import { PresupuestoEspecialComponent } from './proyectos-especiales/presupuesto-especial/presupuesto-especial.component';
import { VerProyectosFinalizadosComponent } from './ver-proyectos-finalizados/ver-proyectos-finalizados.component';
import { DetalleProyectoBianualComponent } from './ver-proyectos-finalizados/detalle-proyecto-bianual-finalizado/detalle-proyecto-bianual.component';
import { DetalleProgramaEstableFinalizadoComponent } from './ver-proyectos-finalizados/detalle-programa-estable-finalizado/detalle-programa-estable-finalizado.component';
import { DetalleProyectoBienestarFinalizadoComponent } from './ver-proyectos-finalizados/detalle-proyecto-bienestar-finalizado/detalle-proyecto-bienestar-finalizado.component';
import { DetalleProyectoEspecialFinalizadoComponent } from './ver-proyectos-finalizados/detalle-proyecto-especial-finalizado/detalle-proyecto-especial-finalizado.component';
import { VerProyectosAutorizadosComponent } from './ver-proyectos-autorizados/ver-proyectos-autorizados.component';
import { VerProyectosNoAutorizadosComponent } from './ver-proyectos-no-autorizados/ver-proyectos-no-autorizados.component';
import { DetalleProgramaEstableNoAutorizadoComponent } from './ver-proyectos-no-autorizados/detalle-programa-estable-no-autorizado/detalle-programa-estable-no-autorizado.component';
import { DetalleProyectoBianualNoAutorizadoComponent } from './ver-proyectos-no-autorizados/detalle-proyecto-bianual-no-autorizado/detalle-proyecto-bianual-no-autorizado.component';
import { DetalleProyectoBienestarNoAutorizadoComponent } from './ver-proyectos-no-autorizados/detalle-proyecto-bienestar-no-autorizado/detalle-proyecto-bienestar-no-autorizado.component';
import { DetalleProyectoEspecialNoAutorizadoComponent } from './ver-proyectos-no-autorizados/detalle-proyecto-especial-no-autorizado/detalle-proyecto-especial-no-autorizado.component';
import { DetalleProgramaEstableAutorizadoComponent } from './ver-proyectos-autorizados/detalle-programa-estable-autorizado/detalle-programa-estable-autorizado.component';
import { DetalleProyectoBianualAutorizadoComponent } from './ver-proyectos-autorizados/detalle-proyecto-bianual-autorizado/detalle-proyecto-bianual-autorizado.component';
import { DetalleProyectoBienestarAutorizadoComponent } from './ver-proyectos-autorizados/detalle-proyecto-bienestar-autorizado/detalle-proyecto-bienestar-autorizado.component';
import { DetalleProyectoEspecialAutorizadoComponent } from './ver-proyectos-autorizados/detalle-proyecto-especial-autorizado/detalle-proyecto-especial-autorizado.component';
import { LoginComponent } from './usuarios/login.component';
import { AuthGuard } from './usuarios/guards/auth.guard';
import { RoleGuard } from './usuarios/guards/role.guard';
import { RegistroComponent } from './usuarios/registro/registro.component';
import { VerUsuariosComponent } from './usuarios/ver-usuarios/ver-usuarios.component';
import { TokenInterceptor } from './usuarios/interceptors/token.interceptor';
import { AuthInterceptor } from './usuarios/interceptors/auth.interceptor';
import { MisProyectosComponent } from './mis-proyectos/mis-proyectos.component';
import { DetalleBianualMisProyectosComponent } from './mis-proyectos/detalle-bianual-mis-proyectos/detalle-bianual-mis-proyectos.component';
import { RestaurarContraComponent } from './usuarios/restaurar-contra/restaurar-contra.component';
import { VerificarCodigoComponent } from './usuarios/restaurar-contra/verificar-codigo/verificar-codigo.component';
import { CambiarPasswordComponent } from './usuarios/restaurar-contra/cambiar-password/cambiar-password.component';
import { RendicionContableComponent } from './proyectos-bianuales/rendicion-contable/rendicion-contable.component';
import { RendicionContableEspecialComponent } from './proyectos-especiales/rendicion-contable-especial/rendicion-contable-especial.component';
import { RendicionContableEstableComponent } from './programas-estables/rendicion-contable-estable/rendicion-contable-estable.component';
import { RendicionContableBienestarComponent } from './proyectos-bienestar/rendicion-contable-bienestar/rendicion-contable-bienestar.component';
import { ProyectoEstadoPipe } from './elegir-proyecto/proyecto-estado.pipe';
import { DetalleEstableMisProyectosComponent } from './mis-proyectos/detalle-estable-mis-proyectos/detalle-estable-mis-proyectos.component';
import { DetalleBienestarMisProyectosComponent } from './mis-proyectos/detalle-bienestar-mis-proyectos/detalle-bienestar-mis-proyectos.component';
import { DetalleEspecialMisProyectosComponent } from './mis-proyectos/detalle-especial-mis-proyectos/detalle-especial-mis-proyectos.component';
import { ReporteComponent } from './reporte/reporte.component';





const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'elegir-proyecto', component: ElegirProyectoComponent},
  { path: 'proyecto-bianual', component: ProyectosBianualesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'proyecto-bienestar', component: ProyectosBienestarComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'programa-estable', component: ProgramasEstablesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_ADMIN'] } },
  { path: 'proyecto-especial', component: ProyectosEspecialesComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'ver-proyectos-activos', component: VerProyectosComponent},
  { path: 'ver-proyecto-bianual/:id', component: ProyectosBianualesComponent },
  { path: 'ver-programa-estable/:id', component: ProgramasEstablesComponent },
  { path: 'ver-proyecto-bienestar/:id', component: ProyectosBienestarComponent },
  { path: 'ver-proyecto-especial/:id', component: ProyectosEspecialesComponent },
  { path: 'proyecto-bianual/presupuesto/:id', component: PresupuestoComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'programa-estable/presupuesto/:id', component: PresupuestoEstableComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'proyecto-bienestar/presupuesto/:id', component: PresupuestoBienestarComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'proyecto-especial/presupuesto/:id', component: PresupuestoEspecialComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'ver-proyectos-finalizados', component: VerProyectosFinalizadosComponent },
  { path: 'ver-proyectos-no-autorizados', component: VerProyectosNoAutorizadosComponent },
  { path: 'ver-proyectos-autorizados', component: VerProyectosAutorizadosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'ver-usuarios', component: VerUsuariosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_ADMIN'] } },
  { path: 'ver-mis-proyectos', component: MisProyectosComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'restaurar-contra', component: RestaurarContraComponent },
  { path: 'verificar-codigo', component: VerificarCodigoComponent },
  { path: 'cambiar-pass', component: CambiarPasswordComponent },
  { path: 'proyecto-bianual/rendicion-contable/:id', component: RendicionContableComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'proyecto-especial/rendicion-contable/:id', component: RendicionContableEspecialComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'programa-estable/rendicion-contable/:id', component: RendicionContableEstableComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  { path: 'proyecto-bienestar/rendicion-contable/:id', component: RendicionContableBienestarComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_USER', 'ROLE_ADMIN'] } },
  {path: 'reporte' , component: ReporteComponent, canActivate: [AuthGuard, RoleGuard], data: { role: ['ROLE_ADMIN'] } },




];

@NgModule({
  declarations: [
    AppComponent,
    ElegirProyectoComponent,
    FooterComponent,
    HeaderComponent,
    ProyectosBianualesComponent,
    VerProyectosComponent,
    DetalleProyectoComponent,
    ProyectosBienestarComponent,
    ProgramasEstablesComponent,
    ProyectosEspecialesComponent,
    DetalleProyectoSinteticoComponent,
    DetalleSocioComponent,
    DetalleMiembroComponent,
    DetalleProgramaEstableComponent,
    DetalleProgramaEstableMiembroComponent,
    DetalleProgramaEstableSocioComponent,
    DetalleProgramaEstableSinteticoComponent,
    DetalleProyectoBienestarComponent,
    DetalleProyectoBienestarMiembroComponent,
    DetalleProyectoBienestarSinteticoComponent,
    DetalleProyectoEspecialComponent,
    DetalleProyectoEspecialMiembroComponent,
    DetalleProyectoEspecialSocioComponent,
    DetalleProyectoEspecialSinteticoComponent,
    PresupuestoComponent,
    PresupuestoEstableComponent,
    PresupuestoBienestarComponent,
    PresupuestoEspecialComponent,
    VerProyectosFinalizadosComponent,
    DetalleProyectoBianualComponent,
    DetalleProgramaEstableFinalizadoComponent,
    DetalleProyectoBienestarFinalizadoComponent,
    DetalleProyectoEspecialFinalizadoComponent,
    VerProyectosAutorizadosComponent,
    VerProyectosNoAutorizadosComponent,
    DetalleProgramaEstableNoAutorizadoComponent,
    DetalleProyectoBianualNoAutorizadoComponent,
    DetalleProyectoBienestarNoAutorizadoComponent,
    DetalleProyectoEspecialNoAutorizadoComponent,
    DetalleProgramaEstableAutorizadoComponent,
    DetalleProyectoBianualAutorizadoComponent,
    DetalleProyectoBienestarAutorizadoComponent,
    DetalleProyectoEspecialAutorizadoComponent,
    LoginComponent,
    RegistroComponent,
    VerUsuariosComponent,
    MisProyectosComponent,
    DetalleBianualMisProyectosComponent,
    RestaurarContraComponent,
    VerificarCodigoComponent,
    CambiarPasswordComponent,
    RendicionContableComponent,
    RendicionContableEspecialComponent,
    RendicionContableEstableComponent,
    RendicionContableBienestarComponent,
    ProyectoEstadoPipe,
    DetalleEstableMisProyectosComponent,
    DetalleBienestarMisProyectosComponent,
    DetalleEspecialMisProyectosComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
