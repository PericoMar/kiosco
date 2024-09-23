import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-advert',
  standalone: true,
  imports: [],
  templateUrl: './advert.component.html',
  styleUrl: './advert.component.css'
})
export class AdvertComponent {
  @Input() advert: string = ''; // Se puede usar para mostrar texto dinámico en el anuncio
  @Output() quitAdvert = new EventEmitter<void>(); // Emitir evento cuando se cierra el anuncio
  logoUrl! :string;

  constructor () {
    this.logoUrl = 'assets/shop/LogoKC.png'; // Ruta de la imagen del logo
  }
  // Método para cerrar el anuncio y deslizarlo hacia arriba
  closeAdvert() {
    const advertElement = document.getElementById('advert-container');
    if (advertElement) {
      advertElement.classList.add('fade-out');
      setTimeout(() => {
        this.quitAdvert.emit(); // Emitir el evento después de la animación
      }, 500); // Duración de la animación
    }
  }
}
