import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-lista-materias-screen',
  templateUrl: './lista-materias-screen.component.html',
  styleUrls: ['./lista-materias-screen.component.scss']
})
export class ListaMateriasScreenComponent implements OnInit {

  public token: string = "";
  public lista_materias: any[] = [];

  displayedColumnsMateria: string[] = ['nrc', 'nombre', 'seccion', 'dias', 'horaInicio', 'horaFinal', 'salon', 'programa', 'editar', 'eliminar'];
  dataSourceMateria = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourceMateria.paginator = this.paginator;
  }

  constructor(
    private facadeService: FacadeService,
    private materiasService: MateriasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    //Obtener Token
    this.token = this.facadeService.getSessionToken();
    console.log("Token: ", this.token);
    
    //Validar Existencia de Token
    if(this.token == ""){
      this.router.navigate([""]);
    }

    //Obtener Lista de Usuarios
    this.obtenerMaterias();

    // Iniciar Paginator
    this.initPaginator();
  }

  // Función Para Obtener la Lista de Materias
  public obtenerMaterias(){
    this.materiasService.obtenerListaMaterias().subscribe({
      next: (response)=>{
        this.lista_materias = response;
        console.log("Lista materias: ", this.lista_materias);
        if(this.lista_materias.length > 0){
          this.dataSourceMateria = new MatTableDataSource<DatosMateria>(this.lista_materias as DatosMateria[]);
        }
      }, 
      error: (error)=>{
        alert("No se pudo obtener la lista de usuarios");
      }
    });
  }

  //Paginador
  public initPaginator(){
    setTimeout(() => {
      this.dataSourceMateria.paginator = this.paginator;
      //console.log("Paginator: ", this.dataSourceIngresos.paginator);
      //Modificar etiquetas del paginador a español
      this.paginator._intl.itemsPerPageLabel = 'Registros por página';
      this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
        if (length === 0 || pageSize === 0) {
          return `0 / ${length}`;
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} - ${endIndex} de ${length}`;
      };
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Última página';
      this.paginator._intl.previousPageLabel = 'Página anterior';
      this.paginator._intl.nextPageLabel = 'Página siguiente';
    },500);
    //this.dataSourceIngresos.paginator = this.paginator;
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goRegistrarMateria(){
    this.router.navigate(['/registro-materia']);
  }

  goEditarMateria(nrc:any){}

  goEliminarMateria(nrc:any){}

}

export interface DatosMateria {
  nrc: number,
  nombre: string;
  seccion: number;
  dias: string;
  horaInicio: string;
  horaFinal: string,
  salon: string,
  programa: string,
}