import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentService } from '../../../services/payment/payment.service';
import { Order } from '../../../interfaces/pedido';
import { OrderService } from '../../../services/order.service';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './payment-modal.component.html',
  styleUrl: './payment-modal.component.css'
})
export class PaymentModalComponent implements OnInit{

  receivingData: boolean = false;
  cancelandoPago: boolean = false;
  terminalSessionId!: string;

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { order: Order },
  ) {

  }

  ngOnInit(): void {
    this.terminalSessionId = '';
    console.log(this.orderService.totalPrice);
    this.paymentService.payWithCard(this.orderService.totalPrice).subscribe({
      next: (response) => {
        console.log(response);
        this.terminalSessionId = response.id;
        this.paymentService.pollTerminalSession(response.id).subscribe({
          next: (result) => {
            this.dialogRef.close({ success: true, status: result.status, data: result.data, terminalSessionId: this.terminalSessionId, canceled: false });
          },
          error: (error) => {
            this.dialogRef.close({ success: false, status: error.status, data: error.data, terminalSessionId: this.terminalSessionId, canceled: false });
          },
        });

      },
      error: (error) => {
        error.status = 'Unauthorized';
        this.dialogRef.close({ success: false, status: error.status, data: error.data, terminalSessionId: this.terminalSessionId, canceled: false });
      }
    });
  }


  close() {
    this.cancelandoPago = true;
    this.paymentService.cancelPayment(this.terminalSessionId).subscribe({
      next: (response) => {
        console.log(response);
        this.dialogRef.close({canceled: true});
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
