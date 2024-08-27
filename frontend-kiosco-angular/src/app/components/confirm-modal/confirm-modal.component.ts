import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomizationOption, CustomizationQuestion, Menu, Product } from '../../interfaces/pedido';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css',
  animations: [
    trigger('slideInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in')
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ConfirmModalComponent {
  // @Input() product!: Product | Menu;
  //   export interface Product {
  //     id: string;
  //     name: string;
  //     img?: string;
  //     price: number;
  //     description: string;
  //     familyId: string;
  //     customizations?: CustomizationResponse[];  // Opcional, puede no tener personalizaciones
  //     customizationQuestions?: CustomizationQuestion[];  // Opcional, puede no tener preguntas de personalización
  // }
  // Tener un producto con datos de prueba:
  // Ejemplo de datos de prueba para un producto
  product!: Product | Menu
  

  @Output() confirmAction = new EventEmitter<number>();
  @Output() cancelAction = new EventEmitter<void>();
  quantity: number = 1;

  currentCustomizationIndex: number = 0;

  isVisible = false;

  open(data: any): void {
    this.product = data;
    this.isVisible = true;
    setTimeout(() => {
      const modalContainer = document.querySelector('.modal-container') as HTMLElement;
      const modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
      if (modalContainer && modalOverlay) {
        modalContainer.classList.add('show');
        modalOverlay.classList.add('show');
      }
    }, 0);
  }

  thereAreQuestionsLeft(): boolean {
    if (this.product.customizationQuestions && this.product.customizationQuestions.length > 0) {
      console.log(this.currentCustomizationIndex < this.product.customizationQuestions.length);
      return this.currentCustomizationIndex < this.product.customizationQuestions.length;
    }
    console.log('No hay preguntas de personalización');
    return false;
  }

  selectOption(option : CustomizationOption): void {
    if(this.product.customizations) {
      this.product.customizations[this.currentCustomizationIndex] = {name: this.product.customizationQuestions?.[this.currentCustomizationIndex]?.name, value: option.value, price: option.price};
    }
    console.log(this.product.customizations);
  }

  previousCustomization(): void {
    this.currentCustomizationIndex--;
  }

  nextCustomization(): void {
    this.currentCustomizationIndex++;
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  close(): void {
    console.log('close');
    const modalContainer = document.querySelector('.modal-container') as HTMLElement;
    const modalOverlay = document.querySelector('.modal-overlay') as HTMLElement;
    if (modalContainer && modalOverlay) {
      modalContainer.classList.remove('show');
      modalOverlay.classList.remove('show');
    }
    setTimeout(() => {
      this.isVisible = false;
      this.cancelAction.emit();
    }, 300); // Esperar a que termine la animación
  }

  confirm(): void {
    this.confirmAction.emit(this.quantity);
    this.close();
  }
  
}
