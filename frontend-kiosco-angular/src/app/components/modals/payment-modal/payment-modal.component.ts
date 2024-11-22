import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment/payment.service';
import { Order } from '../../../interfaces/pedido';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit{

  receivingData: boolean = false;

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order },
  ) {

  }

  ngOnInit(): void {
    console.log(this.orderService.totalPrice);
    this.paymentService.payWithCard(this.orderService.totalPrice).subscribe({
      next: (response) => {
        console.log(response);

        this.paymentService.pollTerminalSession(response.id).subscribe({
          next: (result) => {
            this.dialogRef.close({ success: true, status: result.status, data: result.data });
          },
          error: (error) => {
            this.dialogRef.close({ success: false, status: error.status, data: error.data });
          },
        });

      },
      error: (error) => {
        error.status = 'Unauthorized';
        this.dialogRef.close({ success: false, status: error.status, data: error.data });
      }
    });
  }


  close() {
    this.dialogRef.close({cancel : true});
  }

}
