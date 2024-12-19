import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Ng2FittextModule } from "ng2-fittext";

@Component({
  selector: 'app-family-option-title',
  standalone: true,
  imports: [Ng2FittextModule, CommonModule],
  template: ` 
    <div class="container">
      <div class="option-title" [fittext]="true" [ngClass]="{'selected' : selected}"
          [modelToWatch]="title"
          [maxFontSize]="30"
          [minFontSize]="16"
          [activateOnResize]="true">{{title}}</div>
    </div>
  `,
  styles: `
  :host {
    width: 95%;
    height: 100%;
  }
  .container {
    width: 210px;
    max-width: 210px;
    height: 70px;
    max-height: 70px;
    display: flex; /* Permite alinear elementos en línea */
    align-items: center; /* Alinea verticalmente los elementos */
    justify-content: flex-start; /* Alinea horizontalmente los elementos */
    overflow: hidden; /* Necesario para ocultar contenido extra */
  }
  .option-title {
    font-weight: var(--family-name-font-weight);
    line-height: 1.2; /* Espaciado entre líneas */
  }
  .selected {
    font-weight: bold;
  }
  `
})
export class FamilyOptionTitleComponent {
  @Input() title: string = '';

  @Input() selected: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      const currentTitle = changes['title'].currentValue;
      console.log('Nuevo título:', currentTitle);
    }
  }
}
