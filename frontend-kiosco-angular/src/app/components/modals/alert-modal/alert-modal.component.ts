import { Component, Inject } from '@angular/core';
import { PaymentService } from '../../../services/payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../../interfaces/pedido';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {
  receivingData: boolean = false;

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<AlertModalComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { msg: string },
  ) {

  }

  ngOnInit(): void {
    console.log(this.data.msg);

  }


  close(retry : boolean) {
    this.dialogRef.close(retry);
  }
}
