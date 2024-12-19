import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PrinterService } from '../../../../../services/printer/printer.service';
import { SnackbarService } from '../../../../../services/snackBar/snackbar.service';

@Component({
  selector: 'app-kiosk-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './kiosk-modal.component.html',
  styleUrl: './kiosk-modal.component.css'
})
export class KioskModalComponent {
  kioskForm: FormGroup;
  isEditMode: boolean;


  constructor(
    public dialogRef: MatDialogRef<KioskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { familyId: number | null, name: string | null, status: string | null },
    private fb: FormBuilder,
    private printerService: PrinterService,
    private snackbarService: SnackbarService
  ) {
    this.isEditMode = !!data.familyId; // true si hay un id de producto
    this.kioskForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['Habilitado', Validators.required],
      printers: this.fb.array([''], Validators.required),
      datafono_id: [''],
      zona: [''],
      descripcion: [''],
    });
    

    if (this.isEditMode) {
      this.loadProductData(data.familyId!);
    } 

    console.log(this.availablePrinters);
  }

  get printers() : FormArray {
    return this.kioskForm.get("printers") as FormArray
  }
   
  newPrinter(): FormGroup {
    return this.fb.group({
      printer: '',
    })
  }
 
  addPrinter() {
    this.printers.push(this.newPrinter());
  }
 
  removePrinter(i:number) {
    this.printers.removeAt(i);
  }

  get availablePrinters() {
    const availablePrinters = this.printerService.printers
    // Añadir una opción que sea todas las impresoras:
    availablePrinters.unshift({impresora_ip: '', estado: 'Habilitado', nombre: 'Todas las impresoras', id:'', descripcion: '', cliente_id: ''});
    return availablePrinters;
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
    this.kioskForm.value.status = this.kioskForm.value.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.kioskForm.value.status);
  }

  save() {
    this.kioskForm.markAllAsTouched(); 
    if (this.kioskForm.valid) {
      const deviceData = this.kioskForm.value;
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
