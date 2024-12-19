import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { KioskService } from '../../services/kiosk/kiosk.service';

@Component({
  selector: 'app-confirm-page',
  standalone: true,
  imports: [],
  templateUrl: './confirm-page.component.html',
  styleUrl: './confirm-page.component.css'
})
export class ConfirmPageComponent {
  numOrder: number = this.cartService.getOrder().id;

  constructor(
    private cartService: OrderService,
    private router: Router,
    private kioscoService: KioskService
  ){}


  ngOnInit(){
    setTimeout(()=>{
      //Resetear el pedido (Aqui o en bd)
      this.cartService.clearOrder()
      this.router.navigate(['/kiosco', this.kioscoService.num_serie]);
    }, 30000);
  }
}
