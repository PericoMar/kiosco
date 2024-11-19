import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PaymentModalComponent>,
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

  get msgDelete(): string {
    if(!this.data) return '¿Estás seguro?';

    if(!this.data.productType) return '¿Estás seguro?';

    return this.data.productType != 'Familia' ? `¿Estás seguro de que deseas eliminar este ${this.data.productType.toLowerCase()}?` : `¿Estás segura de que deseas eliminar esta ${this.data.productType.toLowerCase()}?`;
  }
}
