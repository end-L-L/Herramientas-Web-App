import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MateriasService } from 'src/app/services/materias.service';

@Component({
  selector: 'app-eliminar-materia-modal',
  templateUrl: './eliminar-materia-modal.component.html',
  styleUrls: ['./eliminar-materia-modal.component.scss']
})
export class EliminarMateriaModalComponent implements OnInit {

  constructor(
    private materiaService: MateriasService,
    private dialogRef: MatDialogRef<EliminarMateriaModalComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log("NRC Materia: ", this.data.nrc);
  }

  public cerrar_modal(){
    this.dialogRef.close({isDelete:false});
  }

  public eliminarMateria(){
    this.materiaService.eliminarMateria(this.data.nrc).subscribe({
      next: (response)=>{
        console.log(response);
        this.dialogRef.close({isDelete:true});
      },
      error: (error)=>{
        this.dialogRef.close({isDelete:false});
      }
    });
  }
}