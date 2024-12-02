import { Component, EventEmitter, Output } from '@angular/core';
import { CustomizationOption, Product } from '../../../interfaces/pedido';
import { ProductService } from '../../../services/product.service';
import { AppConfig } from '../../../../config/app-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent {
  constructor(private productService: ProductService) {}

  noPhotoUrl = AppConfig.NO_PHOTO_URL;

  // Producto o menú a confirmar
  product!: Product;

  // Respuesta de personalización antes de editar
  previousEditCustomization!: any;

  //Gestion de eventos del modal (sin librerias)
  @Output() confirmAction = new EventEmitter<{
    product: Product;
    quantity: number;
  }>();
  @Output() cancelAction = new EventEmitter<void>();

  // Cantidades
  quantity: number = 1;

  // Índice de la pregunta de personalización actual
  currentCustomizationIndex!: number;

  // Control de tipos de pregunta e inputs.
  currentQuestionType!: string;
  questionTypes = {
    single: 'radio',
    multiple: 'checkbox',
  };

  // Control de la visibilidad del modal
  isVisible = false;

  open(data: any, index: number): void {
    console.log('Data', data, 'Index', index);
    
    this.currentCustomizationIndex = index;
    this.quantity = 1;
  
    // Clonamos completamente el objeto data para evitar referencias compartidas
    this.product = structuredClone(data);
  
    // Guardar la respuesta del index con la que viene el producto (para comparar más tarde)
    const clonedPreviousEditCustomization = structuredClone(this.product.customizations[this.currentCustomizationIndex]);
    this.previousEditCustomization = clonedPreviousEditCustomization;
  
    this.isVisible = true;
  
    // Mostrar el modal después de un pequeño retraso para manejar las clases CSS
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
    return (
      this.product.customizationQuestions != undefined &&
      this.currentCustomizationIndex <
        this.product.customizationQuestions.length
    );
  }

  selectOption(option: CustomizationOption): void {
    const currentQuestion =
      this.product.customizationQuestions?.[this.currentCustomizationIndex];
    const questionName = currentQuestion?.name;
    const questionId = currentQuestion?.id;

    if (!questionName || !currentQuestion) {
      return; // Si no hay nombre de pregunta o pregunta actual, salir de la función
    }

    // Buscar si ya existe una respuesta para esta pregunta
    let existingCustomization = this.product.customizations.find(
      (c) => c.customizationQuestionId === questionId
    );

    if (existingCustomization) {
      if (currentQuestion.questionType === 'single') {
        // Si la pregunta es de selección única, reemplazar la respuesta
        existingCustomization.responses = [option];
      } else {
        // Verificar si la opción ya ha sido seleccionada (para evitar duplicados)
        const optionIndex = existingCustomization.responses.findIndex(
          (r) => r.id === option.id
        );

        if (optionIndex !== -1) {
          // Si ya existe la opción, la eliminamos (manejo de deselección)
          existingCustomization.responses.splice(optionIndex, 1);
        } else {
          // Verificar si se ha alcanzado el número máximo de selecciones
          if (
            currentQuestion.maxChoices &&
            existingCustomization.responses.length >= currentQuestion.maxChoices
          ) {
            // Mostrar un mensaje o realizar alguna acción indicando que no se pueden seleccionar más opciones
            console.warn(
              `No se pueden seleccionar más de ${currentQuestion.maxChoices} opciones para ${questionName}.`
            );
            return;
          }
          // Si no se ha alcanzado el límite, agregamos la opción
          existingCustomization.responses.push(option);
        }
      }
    } else {
      // Si no existe una respuesta para esta pregunta, la creamos
      this.product.customizations.push({
        customizationQuestionId: currentQuestion.id,
        name: questionName,
        responses: [option],
      });
    }
  }

  isOptionSelected(currentIndex: number, optionId: string): boolean {
    const customizationResponse = this.product.customizations[currentIndex];

    if (!customizationResponse || !customizationResponse.responses) {
      return false; // No hay respuesta aún
    }

    return customizationResponse.responses.some(
      (response: any) => response.id === optionId
    );
  }

  maxChoicesReached(currentIndex: number): boolean {
    const currentQuestion = this.product.customizationQuestions?.[currentIndex];
    const customizationResponse = this.product.customizations.find(
      (c) => c.customizationQuestionId === currentQuestion?.id
    );

    if (!customizationResponse || !customizationResponse.responses) {
      return false; // No hay respuesta aún
    }

    return (
      customizationResponse.responses.length >= currentQuestion?.maxChoices!
    );
  }

  minChoicesReached(currentIndex: number): boolean {
    const currentQuestion = this.product.customizationQuestions?.[currentIndex];
    const customizationResponse = this.product.customizations.find(
      (c) => c.customizationQuestionId === currentQuestion?.id
    );

    return (
      currentQuestion?.minChoices! == 0 ||
      customizationResponse?.responses.length! >= currentQuestion?.minChoices!
    );
  }

  getTotalPrice(product: Product): number {
    return this.productService.getTotalPrice(product);
  }

  previousCustomization(): void {
    this.currentCustomizationIndex--;
  }

  editCustomization(): void {
    // Compara la personalización actual con la original
    const currentCustomization =
      this.product.customizations[this.currentCustomizationIndex];
    const previousCustomization = this.previousEditCustomization;

    // Función para comparar personalizaciones (puedes ajustar la comparación si es necesario)
    const areCustomizationsEqual = (
      previusOption: any,
      actualOption: any
    ): boolean => {
      return JSON.stringify(previusOption) === JSON.stringify(actualOption);
    };

    // Si las personalizaciones son iguales, no se crea un nuevo objeto
    if (areCustomizationsEqual(currentCustomization, previousCustomization)) {
      console.log('Las personalizaciones son las mismas.');
      return;
    }

    // Si son diferentes, crea un nuevo producto con la personalización actualizada
    const newProduct: Product = { ...this.product }; // Clonamos el producto original
    console.log('Personalizaciones diferentes.', newProduct);

    newProduct.customizations = [...this.product.customizations]; // Asegurar una nueva copia del array de personalizaciones
    newProduct.customizations[this.currentCustomizationIndex] =
      currentCustomization; // Actualizamos la personalización específica

    // Emitir el nuevo producto con la cantidad
    this.confirmAction.emit({ product: newProduct, quantity: this.quantity });

    // Cerrar el modal
    this.close();
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  cancel(): void {
    this.product.customizations[this.currentCustomizationIndex] =
      this.previousEditCustomization;
    this.close();
  }

  close(): void {
    const modalContainer = document.querySelector(
      '.modal-container'
    ) as HTMLElement;
    const modalOverlay = document.querySelector(
      '.modal-overlay'
    ) as HTMLElement;
    if (modalContainer && modalOverlay) {
      modalContainer.classList.remove('show');
      modalOverlay.classList.remove('show');
    }
    setTimeout(() => {
      this.isVisible = false;
      this.cancelAction.emit();
    }, 300); // Esperar a que termine la animación
  }
}
