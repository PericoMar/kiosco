import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productType: string, name: string, id: number },
  ) {

  }


  loadProductData(productId: number) {
    // Lógica para cargar los datos del producto si es modo edición
    // Por ejemplo, hacer una petición al backend para obtener el producto
    console.log(`Cargar datos del producto con ID: ${productId}`);
  }

  onDelete() {
    this.dialogRef.close({id: this.data.id, productType: this.data.productType});  
  }

  close() {
    this.dialogRef.close();
  }
}
