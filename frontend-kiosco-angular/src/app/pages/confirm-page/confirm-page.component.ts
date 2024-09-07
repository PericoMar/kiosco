import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-page',
  standalone: true,
  imports: [],
  templateUrl: './confirm-page.component.html',
  styleUrl: './confirm-page.component.css'
})
export class ConfirmPageComponent {
  numOrder: number = this.cartService.getOrder().id;

  constructor(private cartService: OrderService, private router: Router){}


  ngOnInit(){
    setTimeout(()=>{
      //Resetear el pedido (Aqui o en bd)
      this.router.navigate(['/']);
    }, 5000);
  }
}
