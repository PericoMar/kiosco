import { Component, Input, SimpleChanges } from '@angular/core';
import { Ng2FittextModule } from "ng2-fittext";

@Component({
  selector: 'app-family-title',
  standalone: true,
  imports: [Ng2FittextModule],
  template: ` 
    <div style="overflow:hidden; font-size:520px;">
      <div class="title" [fittext]="true"
          [modelToWatch]="title"
          [maxFontSize]="80"
          [minFontSize]="30"
          [activateOnResize]="true">{{title}}</div>
    </div>
  `,
  styles: `
  :host {
    width: 100%;
    height: 100%;
  }
  div {
    width: 622px;
    max-width: 622px;
    height: 244px;
    max-height: 244px;
  }
  .title {
    line-height: 1.2; /* Espaciado entre líneas */
    overflow: hidden; /* Oculta el texto que se pase del contenedor */
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis; /* Agregar "..." si el texto es muy largo */
  }
  `
})
export class FamilyTitleComponent {
  @Input() title: string = '';


  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      const currentTitle = changes['title'].currentValue;
      console.log('Nuevo título:', currentTitle);
    }
  }
}

