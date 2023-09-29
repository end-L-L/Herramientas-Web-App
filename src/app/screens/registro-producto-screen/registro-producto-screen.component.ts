import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UsuariosService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-registro-producto-screen',
  templateUrl: './registro-producto-screen.component.html',
  styleUrls: ['./registro-producto-screen.component.scss']
})
export class RegistroProductoScreenComponent implements OnInit{

  //Propiedades
  public editar:boolean = false;
  public product: any = {};

  //Errores
   public errors:any ={};
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.product = this.esquemaProduct();
    console.log("product: ", this.product);
  }

  constructor(
    private location: Location,
    private usuariosService: UsuariosService,
    private router: Router
  ){}

  public regresar(){
    this.location.back();
  }

  public home(){
    this.router.navigate([""]);
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.usuariosService.validarProducto(this.product);
    if($.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      alert("Todo OK");
      return false;
    }
  }
  
  public esquemaProduct() {
    return {
      'id': '',
      'product_name': '',
      'price':'',
      'department':''
    }
  }
}
