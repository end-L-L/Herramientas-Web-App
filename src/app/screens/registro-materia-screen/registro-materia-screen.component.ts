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

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    
  }

  public regresar(){
    this.location.back();
  }
}
