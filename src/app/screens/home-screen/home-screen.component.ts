import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { UsuariosService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit{
  
  public token: string = "";
  public lista_usuarios: any[] = [];

  displayedColumns: string[] = ['matricula', 'nombre', 'email', 'fecha_nacimiento', 'edad', 'curp', 'rfc', 'telefono', 'ocupacion', 'editar', 'eliminar'];
  dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  constructor(
    private facadeService: FacadeService,
    private  usuariosService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Validar que haya inicio de sesión
    //Obtengo el token del login
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    if(this.token == ""){
      this.router.navigate([""]);
    }   
  }

  //Obtener lista de usuarios
  public obtenerUsuarios(){
    this.usuariosService.obtenerListaUsers().subscribe({
      next: (response)=>{
        this.lista_usuarios = response;
        console.log("Lista users: ", this.lista_usuarios);
        if(this.lista_usuarios.length > 0){
          //Agregar datos del nombre e email
          this.lista_usuarios.forEach(usuario => {
            usuario.first_name = usuario.user.first_name;
            usuario.last_name = usuario.user.last_name;
            usuario.email = usuario.user.email;
          });
          console.log("Otro user: ", this.lista_usuarios);
          
          this.dataSource = new MatTableDataSource<DatosUsuario>(this.lista_usuarios as DatosUsuario[]);
        }
      }, 
      error: (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
  });
  }

  //Cerrar Sesión
  public logout(){
    this.facadeService.logout().subscribe({
      next: (response) => {
        console.log("Entró");
        
        this.facadeService.destroyUser();
        //Navega al login
        this.router.navigate(["/"]);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
} //Fin

// Inicio
export interface DatosUsuario {
  id: number,
  matricula: number;
  first_name: string;
  last_name: string;
  email: string;
  fecha_nacimiento: string,
  curp: string,
  rfc: string,
  edad: number,
  telefono: string,
  ocupacion: string
}