import { Component, Inject, Input } from '@angular/core';
import { PaymentService } from '../../../services/payment/payment.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from '../../../interfaces/pedido';
import { OrderService } from '../../../services/order.service';
import { ButtonSpinnerComponent } from '../../button-spinner/button-spinner.component';

@Component({
  selector: 'app-alert-modal',
  standalone: true,
  imports: [ButtonSpinnerComponent],
  templateUrl: './alert-modal.component.html',
  styleUrl: './alert-modal.component.css'
})
export class AlertModalComponent {
  canRetry: boolean = false;

  paymentAlert : boolean = true;

  constructor(
    private paymentService: PaymentService,
    public dialogRef: MatDialogRef<AlertModalComponent>,
    private orderService: OrderService,
    @Inject(MAT_DIALOG_DATA) public data: { msg: string, status: string, data: any, terminalSessionId: string, paymentAlert: boolean},
  ) {

  }

  ngOnInit(): void {
    this.paymentAlert = this.data.paymentAlert;
    console.log(this.data.msg);
    if(this.data.status == 'SignatureVerificationRequired'){
      this.paymentService.signatureVerfication(this.data.terminalSessionId, false).subscribe({
        next: (response) => {
          console.log(response);
          this.canRetry = true;
        },
        error: (error) => {
          console.error(error);
          this.dialogRef.close(false);
        }
      });
    } else {
      this.canRetry = true;
    }
  }


  close(retry : boolean) {
    this.dialogRef.close(retry);
  }

}
