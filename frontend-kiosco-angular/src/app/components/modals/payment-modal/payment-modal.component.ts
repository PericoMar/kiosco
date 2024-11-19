import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment/payment.service';
import { Order } from '../../../interfaces/pedido';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit{
  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order },
  ) {

  }

  ngOnInit(): void {
    this.paymentService.payWithCard(this.data.order).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  loadProductData(productId: number) {
    // Lógica para cargar los datos del producto si es modo edición
    // Por ejemplo, hacer una petición al backend para obtener el producto
    console.log(`Cargar datos del producto con ID: ${productId}`);
  }

  close() {
    this.dialogRef.close({cancel : true});
  }

}
