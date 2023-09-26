import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registro-screen',
  templateUrl: './registro-screen.component.html',
  styleUrls: ['./registro-screen.component.scss']
})
export class RegistroScreenComponent implements OnInit {

  //Propiedades
  public editar:boolean = false;
  public user: any = {};
  //Contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  //Errores
  public errors:any ={};

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.user = this.esquemaUser();
    console.log("User: ", this.user);

  }

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