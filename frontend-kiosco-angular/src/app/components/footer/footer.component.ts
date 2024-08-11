import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  setScreenHeight(){
    // Cambiar la altura del body y ponerle un margin top al body:
    const body = document.getElementsByTagName('body')[0];
    if(body.style.height === '800px'){
      body.style.height = '1920px';
      body.style.marginTop = '0px';
      return;
    }
    body.style.height = '900px';
    body.style.marginTop = '1020px';
  }
}
