import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  ) { }

  ngOnInit(): void {
    
  }

  public regresar(){
    this.location.back();
  }

  public registrar(){}

  public actualizar(){}

  public esquemaMateria(){
    return {
      'nrc': '',
      'nombre': '',
      'seccion': '',
      'dias': '',
      'horaInicio': '',
      'horaFin': '',
      'salon': '',
      'programaEducativo': '',
    }
  }
}
