import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

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

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: number | null },
    private fb: FormBuilder
  ) {
    this.isEditMode = !!data.productId; // true si hay un id de producto
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
    });

    if (this.isEditMode) {
      this.loadProductData(data.productId!);
    }
  }

  loadProductData(productId: number) {
    // Lógica para cargar los datos del producto si es modo edición
    // Por ejemplo, hacer una petición al backend para obtener el producto
    console.log(`Cargar datos del producto con ID: ${productId}`);
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
}
