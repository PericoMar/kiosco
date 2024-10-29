import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PrinterService } from '../../../../../services/printer/printer.service';
import { SnackbarService } from '../../../../../services/snackBar/snackbar.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-device-modal',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './device-modal.component.html',
  styleUrl: './device-modal.component.css'
})
export class DeviceModalComponent {
  deviceForm: FormGroup;
  isEditMode: boolean;


  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyId: number | null, name: string | null, status: string | null },
    private fb: FormBuilder,
    private printerService: PrinterService,
    private snackbarService: SnackbarService
  ) {
    this.isEditMode = !!data.familyId; // true si hay un id de producto
    this.deviceForm = this.fb.group({
      name: ['', Validators.required],
      status: ['Habilitado', Validators.required],
      printer : ['', Validators.required],
      area: [''],
      description: [''],
    });
    

    if (this.isEditMode) {
      this.loadProductData(data.familyId!);
    } 
  }


  loadProductData(productId: number) {
    // Lógica para cargar los datos del producto si es modo edición
    // Por ejemplo, hacer una petición al backend para obtener el producto
    console.log(`Cargar datos del producto con ID: ${productId}`);
  }


  onDelete(id : number) {
    // Lógica para eliminar el producto
    console.log('Eliminar producto');
  }



  getStatusClass(status: string): string {
    if (status === 'Habilitado') {
      return 'habilitado';
    } else if (status === 'Deshabilitado') {
      return 'deshabilitado';
    }
    return '';
  }

  changeStatus(){
    this.deviceForm.value.status = this.deviceForm.value.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.deviceForm.value.status);
  }

  save() {
    this.deviceForm.markAllAsTouched(); 
    if (this.deviceForm.valid) {
      const deviceData = this.deviceForm.value;
      this.dialogRef.close(deviceData);
      this.snackbarService.openSnackBar( `Dispositivo añadido con exito.` , 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
    } else {
      this.snackbarService.openSnackBar('Por favor, rellene los campos obligatorios', 'Cerrar');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
