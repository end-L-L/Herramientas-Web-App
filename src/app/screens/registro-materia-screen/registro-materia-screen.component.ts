import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
declare var $:any;

@Component({
  selector: 'app-registro-materia-screen',
  templateUrl: './registro-materia-screen.component.html',
  styleUrls: ['./registro-materia-screen.component.scss']
})
export class RegistroMateriaScreenComponent implements OnInit {

  //Propiedades
  public editar:boolean = false;
  public materia:any = {};
  //Errores
  public errors:any = {};

  constructor(
    private location: Location,
    private materiasService: MateriasService
  ) { }

  ngOnInit(): void {
    this.materia = this.materiasService.esquemaMateria();
    //console.log("Materia: ", this.materia);
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){
    //Validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      console.log("Materia: ", this.materia);
      return false;
    }
  }

  public actualizar(){}


}
