import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FamilyService } from '../../../../../services/family.service';
import { Family } from '../../../../../interfaces/family';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatError, MatLabel, CommonModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css'
})
export class ProductModalComponent {
  productForm: FormGroup;
  isEditMode: boolean;

  productImgUrl: string | null = 'assets/camera.svg';
  families!: Family[];

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number | null, family: number | null, price_1: number | null, price_2: number | null, price_3: number | null, name: string | null, status: string | null },
    private fb: FormBuilder,
    private familyService: FamilyService
  ) {
    this.isEditMode = !!data.productId; // true si hay un id de producto
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price_1: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?€?')]],
      price_2: ['',  Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?€?')],
      price_3: ['',  Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?€?')],
      family: ['', Validators.required],
      status: ['', Validators.required]
    });

    if (this.isEditMode) {
      this.loadProductData(data.productId!);
    } else {
      data.status = 'Habilitado'; // Por defecto, el producto está habilitado
    }
  }

  ngOnInit(){
    this.families = this.familyService.families

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

  save() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this.dialogRef.close(productData); // Enviar los datos al cerrar el modal
    }
  }

  close() {
    this.dialogRef.close();
  }

  editImage() {
  }

  getStatusStyle(status: string) {
    if (status === 'Habilitado') {
      return {
        'background-color': '#c3e6cb',  // Fondo más oscuro
        'color': '#155724',            // Texto
        'padding': '6px 12px',         // Padding alrededor del texto
        'border-radius': '10px'         // Bordes redondeados
      };
    } else if (status === 'Deshabilitado') {
      return {
        'background-color': '#f5c6cb',
        'color': '#721c24',
        'padding': '6px 12px',
        'border-radius': '10px'
      };
    }
    return {};
  }

  changeStatus(){
    this.data.status = this.data.status === 'Habilitado' ? 'Deshabilitado' : 'Habilitado';
    console.log(this.data.status);
  }
  
}
