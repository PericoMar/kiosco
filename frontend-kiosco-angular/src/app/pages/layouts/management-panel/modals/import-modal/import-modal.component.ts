import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-import-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import-modal.component.html',
  styleUrl: './import-modal.component.css'
})
export class ImportModalComponent {

  importForm: FormGroup;
  selectedFile: File | null = null;

  columns: string[] = ['Tipo', 'Nombre', 'Familia' ,'Descripción', 'Precio'];
  rows: any[] = [
    { Tipo:'Producto', Nombre: 'Producto 1', Descripción: 'Ejemplo de producto 1', Precio: 10.5 },
    { Nombre: 'Producto 2', Descripción: 'Ejemplo de producto 2', Precio: 20.0 },
    { Nombre: 'Producto 3', Descripción: 'Ejemplo de producto 3', Precio: 15.75 },
  ];

  constructor(
    public dialogRef: MatDialogRef<ImportModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { elementType: string },
    private fb: FormBuilder
  ) {
    this.importForm = this.fb.group({
      excelFile: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelect(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFile = fileInput.files[0];
      this.importForm.patchValue({ excelFile: this.selectedFile });
    }
  }

  save() {
    if (this.importForm.valid && this.selectedFile) {
      // Lógica para manejar el archivo Excel y descripción
      console.log('Archivo seleccionado:', this.selectedFile);
      console.log('Descripción:', this.importForm.value.description);
      
      // Aquí podrías procesar el archivo o enviarlo al backend
      // FormData puede ayudarte a enviar el archivo en una solicitud HTTP
      const formData = new FormData();
      formData.append('description', this.importForm.value.description);
      formData.append('excelFile', this.selectedFile);

      this.dialogRef.close();
    }
  }
}
