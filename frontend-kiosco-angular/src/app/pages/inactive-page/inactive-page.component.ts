import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyService } from '../../services/family.service';
import { OrderService } from '../../services/order.service';
import { ScreenService } from '../../services/screen/screen.service';

@Component({
  selector: 'app-inactive-page',
  standalone: true,
  imports: [],
  templateUrl: './inactive-page.component.html',
  styleUrl: './inactive-page.component.css'
})
export class InactivePageComponent {
  countdown: number = 10;
  private countdownInterval: any;
  firstFamilyId: any;

  constructor(
    private router: Router,
    private familyService: FamilyService,
    private orderService: OrderService,
    private screenService: ScreenService
  ) {}

  ngOnInit(): void {
    this.firstFamilyId = this.familyService.getFirstFamilyId();
    this.startCountdown();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown < 0) {
        this.cancelOrder();
      }
    }, 1000);
  }

  cancelOrder() {
    clearInterval(this.countdownInterval);
    this.orderService.clearOrder();
    this.screenService.setDefaultScreenHeight();
    this.router.navigate(['/']); // Redirigir a la página de inicio o donde desees
  }

  continueShopping() {
    clearInterval(this.countdownInterval);
    this.router.navigate(['/products-selection/family/', this.firstFamilyId]); // Redirigir a la página de selección de productos
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval); // Limpiar el intervalo cuando se destruye el componente
  }
}
