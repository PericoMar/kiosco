import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  reducedMovilityHeight: string = '900px';
  normalHeight: string = '1920px';

  setScreenHeight(){
    // Cambiar la altura del body y ponerle un margin top al body:
    const body = document.getElementsByTagName('body')[0];
    if(body.style.height === this.reducedMovilityHeight){
      body.style.height = this.normalHeight;
      body.style.marginTop = '0px';
      return;
    }
    body.style.height = this.reducedMovilityHeight;
    body.style.marginTop = '1020px';
  }
}
