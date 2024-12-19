import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from '../../../../../services/snackBar/snackbar.service';
import { CommonModule } from '@angular/common';
import { PaymentService } from '../../../../../services/payment/payment.service';
import { ButtonSpinnerComponent } from '../../../../../components/button-spinner/button-spinner.component';

@Component({
  selector: 'app-dataphone-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonSpinnerComponent],
  templateUrl: './dataphone-modal.component.html',
  styleUrl: './dataphone-modal.component.css'
})
export class DataphoneModalComponent {
  dataphoneForm: FormGroup;
  isEditMode: boolean;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DataphoneModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, area: string, description: string, nombre: string, num_serie: string, TID: string, estado: string, descripcion: string, supervisor: string, devoluciones: boolean },
    private fb: FormBuilder,
    private paymentService: PaymentService,
    private snackbarService: SnackbarService
  ) {
    this.isEditMode = !!data.id; // true si hay un id de producto
    this.dataphoneForm = this.fb.group({
      nombre : ['', Validators.required],
      num_serie : ['', Validators.required],
      TID : ['', Validators.required],
      estado : ['Habilitado', Validators.required],
      zona: [''],
      descripcion : [''],
      supervisor : [''],
      devoluciones : [false] // Si se usa para devoluciones o no (Si no se usa para devoluciones es un datafono de cobros)
    });

    if (this.isEditMode) {
      this.loadProductData(data.id!);
    } 
  }


  loadProductData(dataphoneId: number) {
    const dataphone = this.paymentService.getDataphoneById(dataphoneId);
    dataphone.estado = +dataphone.estado === 1 ? 'Habilitado' : 'Deshabilitado';
    dataphone.devoluciones = Number(dataphone.devoluciones) == 1
    this.dataphoneForm.patchValue(dataphone);
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
    this.dataphoneForm.value.estado = this.dataphoneForm.value.estado === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.dataphoneForm.value.estado);
  }

  save() {
    this.dataphoneForm.markAllAsTouched(); 
    console.log(this.dataphoneForm.value);
    
    if (this.dataphoneForm.valid) {
        this.loading = true;
        const dataphoneData = structuredClone(this.dataphoneForm.value);
        dataphoneData.estado = this.transformEstado(dataphoneData.estado);

        if (this.data.id) {
            this.editDataphone(dataphoneData);
        } else {
            this.addDataphone(dataphoneData);
        }
    } else {
        this.snackbarService.openSnackBar('Por favor, rellene los campos obligatorios', 'Cerrar');
    }
  }

  // Metodo para "cambiar" el tipo de dato del estado para mandarlo a base de datos:
  // Si el estado es 'Habilitado' se manda como 1
  // Si el estado es 'Deshabilitado' se manda como 0
  transformEstado(estado: string): number {
    if (estado === 'Habilitado') {
      return 1;
    } else if (estado === 'Deshabilitado') {
      return 0;
    }
    // Por si el estado tiene un valor inesperado
    return -1; // Puedes manejar este caso de acuerdo a tu lógica
  }


  editDataphone(dataphoneData: any) {
      dataphoneData.id = this.data.id;

      this.paymentService.updateDataphoneObservable(dataphoneData).subscribe({
          next: (response) => {
              this.handleSuccess(response, 'Datafono editado con éxito.');
          },
          error: (error) => {
              this.handleError(error, 'editar');
          },
          complete: () => {
              this.loading = false;
              this.dialogRef.close({ reload: true });
          }
      });
  }

  addDataphone(dataphoneData: any) {
      this.paymentService.addDataphoneObservable(dataphoneData).subscribe({
          next: (response) => {
              this.handleSuccess(response, 'Datafono añadido con éxito.');
          },
          error: (error) => {
              this.handleError(error, 'añadir');
          },
          complete: () => {
              this.loading = false;
              this.dialogRef.close({ reload: true });
          }
      });
  }

  handleSuccess(response: any, message: string) {
      this.loading = false;
      const dataphoneData = response.data;
      dataphoneData.id = response.data.id;
      dataphoneData.type = 'dataphone'; 
      if (this.data.id) {
        this.paymentService.updateDataphone(dataphoneData);
      } else {
        this.paymentService.addDataphone(dataphoneData);
      }
      this.snackbarService.openSnackBar(message, 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
  }

  handleError(error: any, action: string) {
      this.loading = false;
      console.error(`Error al ${action} dataphone:`, error);
      if (error.status === 422) {
          this.snackbarService.openSnackBar(`Error al ${action} dataphone: ${error.error.message}`, 'Cerrar');
      }
  }


  close() {
    this.dialogRef.close({ reload: false });
  }
}
