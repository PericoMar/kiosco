import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  reducedMovilityHeight: string = '70vh';
  normalHeight: string = '100vh';

  reducedMovilityFamilyPageHeight: string = '32vh';
  normalFamilyPageHeight: string = '65vh';

  setScreenHeight() {
    const body = document.getElementsByTagName('body')[0];
    
    // Cambiar la altura de la variable CSS
    const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--main-page-height').trim();
    
    if (currentHeight === this.reducedMovilityHeight) {
      // Cambiar a altura normal
      document.documentElement.style.setProperty('--main-page-height', this.normalHeight);
      document.documentElement.style.setProperty('--family-page-height', this.normalFamilyPageHeight);
      document.documentElement.style.setProperty('--product-list-max-height', '60%');
      document.documentElement.style.setProperty('--main-page-margin-top', '0');
      document.documentElement.style.setProperty('--modal-transform-position-y', '-50%');
      document.documentElement.style.setProperty('--order-summary-max-height', '95vh');
      document.documentElement.style.setProperty('--payment-product-list-heigth', '35%');
      document.documentElement.style.setProperty('--order-options-flex-direction', 'column');
      document.documentElement.style.setProperty('--order-options-gap', '0px');
    } else {
      // Cambiar a altura reducida
      document.documentElement.style.setProperty('--main-page-height', this.reducedMovilityHeight);
      document.documentElement.style.setProperty('--family-page-height', this.reducedMovilityFamilyPageHeight);
      document.documentElement.style.setProperty('--product-list-max-height', '40%');
      document.documentElement.style.setProperty('--main-page-margin-top', '30vh');
      document.documentElement.style.setProperty('--modal-transform-position-y', '-30%');
      document.documentElement.style.setProperty('--order-summary-max-height', '65vh');
      document.documentElement.style.setProperty('--payment-product-list-heigth', '31%');
      document.documentElement.style.setProperty('--order-options-flex-direction', 'row');
      document.documentElement.style.setProperty('--order-options-gap', '50px');
    }
  }

  setDefaultScreenHeight() {
    document.documentElement.style.setProperty('--main-page-height', this.normalHeight);
    document.documentElement.style.setProperty('--family-page-height', this.normalFamilyPageHeight);
    document.documentElement.style.setProperty('--product-list-max-height', '60%');
    document.documentElement.style.setProperty('--main-page-margin-top', '0');
    document.documentElement.style.setProperty('--modal-transform-position-y', '-50%');
    document.documentElement.style.setProperty('--order-summary-max-height', '95vh');
    document.documentElement.style.setProperty('--payment-product-list-heigth', '35%');
    document.documentElement.style.setProperty('--order-options-flex-direction', 'column');
  }
}
