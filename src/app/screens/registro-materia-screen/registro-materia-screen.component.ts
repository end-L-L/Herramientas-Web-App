import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MateriasService } from 'src/app/services/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  public nrc:Number = 0;
  //Errores
  public errors:any = {};

  constructor(
    private materiasService: MateriasService,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.materia = this.materiasService.esquemaMateria();

    if(this.activatedRoute.snapshot.params['nrc'] != undefined){
      //Si el NRC existe, entonces estamos editando
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.nrc = this.activatedRoute.snapshot.params['nrc'];
      console.log("NRC: ", this.nrc);
      //Al iniciar la vista obtiene la materia por el NRC
      this.obtenerMateriaByNRC();
    }
    // Imprimir el Esquema de la Materia
    console.log("Materia: ", this.materia);
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

  public obtenerMateriaByNRC(){
    this.materiasService.getMateriaByNRC(this.nrc).subscribe({
      next: (response)=>{
        this.materia = response;
        console.log("Datos Materia: ", this.materia);
      }, 
      error: (error)=>{
        alert("Datos de Materia no Obtenidos");
      }
    });
  }

  public actualizarMateria(){
    //Validación
    this.errors = [];

    this.errors = this.materiasService.validarMateria(this.materia);
    if(!$.isEmptyObject(this.errors)){
      return false;
    }
    console.log("Pasó la validación");

    this.materiasService.editarMateria(this.materia).subscribe({
      next: (response)=>{
        alert("Materia editada correctamente");
        console.log("Materia editada: ", response);
        //Si se editó, entonces mandar al home
        this.regresar();
      }, 
      error: (error)=>{
        alert("No se pudo editar la materia");
      }
    });
  }


}
