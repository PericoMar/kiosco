import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  notAppears: boolean = false;

  reducedMovilityHeight: string = '70vh';
  normalHeight: string = '100vh';

  reducedMovilityFamilyPageHeight: string = '32vh';
  normalFamilyPageHeight: string = '65vh';

  familyPageProducts!: HTMLElement | null;

  ngOnInit() {
    // Coger el elemento HTML con id : family-page-products
    this.familyPageProducts = document.getElementById('family-page-products');
    // // Establecer la altura inicial
    // this.setScreenHeight();
  }

  setScreenHeight() {
    const body = document.getElementsByTagName('body')[0];
    
    // Cambiar la altura de la variable CSS
    const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--main-page-height').trim();
    
    if (currentHeight === this.reducedMovilityHeight) {
      // Cambiar a altura normal
      document.documentElement.style.setProperty('--main-page-height', this.normalHeight);
      if (this.familyPageProducts) {
        this.familyPageProducts.style.height = this.normalFamilyPageHeight;
      }
      document.documentElement.style.setProperty('--main-page-margin-top', '0');
      document.documentElement.style.setProperty('--modal-transform-position-y', '-50%');
      document.documentElement.style.setProperty('--order-summary-max-height', '95vh');
    } else {
      // Cambiar a altura reducida
      document.documentElement.style.setProperty('--main-page-height', this.reducedMovilityHeight);
      if (this.familyPageProducts) {
        this.familyPageProducts.style.height = this.reducedMovilityFamilyPageHeight;
      }
      document.documentElement.style.setProperty('--main-page-margin-top', '30vh');
      document.documentElement.style.setProperty('--modal-transform-position-y', '-30%');
      document.documentElement.style.setProperty('--order-summary-max-height', '65vh');
    }
  }
}
