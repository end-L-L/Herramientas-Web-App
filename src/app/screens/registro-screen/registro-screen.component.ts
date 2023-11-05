import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit {

  //Propiedades
  public editar:boolean = false;
  public user: any = {};
  public idUser: Number=0;
  //Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Errores
  public errors:any ={};

  constructor(
    private location: Location,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.esquemaUser();

    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];
      console.log("ID User: ", this.idUser);
      //Al iniciar la vista obtiene el usuario por su ID
      this.obtenerUserByID();
    }

    //Imprimir datos en consola
    console.log("User: ", this.user);

  }

  //Función para obtener un solo usuario por su ID
  public obtenerUserByID(){
    this.usuariosService.getUserByID(this.idUser).subscribe({
      next:(response)=>{
        this.user = response;
        //Agregamos valores faltantes
        this.user.first_name = response.user.first_name;
        this.user.last_name = response.user.last_name;
        this.user.email = response.user.email;
        this.user.fecha_nacimiento = response.fecha_nacimiento.split("T")[0];
        console.log("Datos user: ", this.user);
      }, 
      error: (error)=>{
        alert("No se pudieron obtener los datos del usuario para editar");
      }
  });
  }

  public actualizar(){}

  //Funciones para Password
  showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarUsuario(this.user);
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      return false;
    }
    //Valida la contraseña
    if(this.user.password == this.user.confirmar_password){
      //Funcion para registrarse
      alert("Todo chido vamos a registrar");

      this.usuariosService.registrarUsuario(this.user).subscribe({
        next: (response) => {
          alert("Usuario registrado correctamente");
          console.log("Usuario registrado: ", response);
          this.router.navigate(["/"]);
        },
        error: (error) => {
          alert("No se pudo registrar usuario");
        }
      });

    }else{
      alert("Las contraseñas no coinciden");
      this.user.password="";
      this.user.confirmar_password="";
    }
    //return true;
  }

  public regresar(){
    this.location.back();
  }

  //Función para Detectar el Cambio de Fecha
  public changeFecha(event :any){
    console.log(event);
    console.log(event.value.toISOString());
    
    this.user.fecha_nacimiento = event.value.toISOString().split("T")[0];
    console.log("Fecha: ", this.user.fecha_nacimiento);
  }

  public esquemaUser(){
    return {
      'matricula': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'fecha_nacimiento': '',
      'curp': '',
      'rfc': '',
      'edad': '',
      'telefono': '',
      'ocupacion': '',
    }
  }

}