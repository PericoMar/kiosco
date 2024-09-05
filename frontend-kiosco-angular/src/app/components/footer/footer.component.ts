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
  notAppears: boolean = true;

  reducedMovilityHeight: string = '900px';
  normalHeight: string = '1920px';

  reducedMovilityFamilyPageHeight: string = '600px';
  normalFamilyPageHeight: string = '1260px';

  familyPageProducts!: HTMLElement | null;

  ngOnInit(){
    //Coger el elemento HTML con id : family-page-products
    this.familyPageProducts = document.getElementById('family-page-products');
  }


  setScreenHeight(){
    // Cambiar la altura del body y ponerle un margin top al body:
    const body = document.getElementsByTagName('body')[0];
    if(body.style.height === this.reducedMovilityHeight){
      body.style.height = this.normalHeight;
      if(this.familyPageProducts) this.familyPageProducts.style.height = this.normalFamilyPageHeight;
      body.style.marginTop = '0px';
      return;
    }
    body.style.height = this.reducedMovilityHeight;
    if(this.familyPageProducts) this.familyPageProducts.style.height = this.reducedMovilityFamilyPageHeight
    body.style.marginTop = '1020px';
  }
}
