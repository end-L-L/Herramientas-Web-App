import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { Router } from '@angular/router';
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
    private materiasService: MateriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.materia = this.materiasService.esquemaMateria();
    //console.log("Materia: ", this.materia);
  }

  public regresar(){
    this.location.back();
  }

  public registrarMateria(){
    //Validar
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      //Pasa la validación y sale de la función
      console.log("Materia: ", this.materia);
      return false;
    }

    this.materiasService.registrarMateria(this.materia).subscribe({
      next: (response) => {
        alert("Materia Registrada Correctamente");
        console.log("Materia Registrada: ", response);
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        alert("No se Pudo Registrar Materia");
      }
    });

  }

  public actualizar(){}


}
