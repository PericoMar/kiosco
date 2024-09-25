import { Component, EventEmitter, Output } from '@angular/core';
import { CustomizationOption, Menu, Product } from '../../../interfaces/pedido';
import { ProductService } from '../../../services/product.service';
import { AppConfig } from '../../../../config/app-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css'
})
export class EditModalComponent {

  constructor(
    private productService: ProductService
  ) { }

  noPhotoUrl = AppConfig.NO_PHOTO_URL;

  // Producto o menú a confirmar
  product!: Product | Menu

  // Respuesta de personalización antes de editar
  previousEditCustomization!: any;
  
  //Gestion de eventos del modal (sin librerias)
  @Output() confirmAction = new EventEmitter<{ product: Product | Menu, quantity: number }>();
  @Output() cancelAction = new EventEmitter<void>();

  // Cantidades
  quantity: number = 1;

  // Índice de la pregunta de personalización actual
  currentCustomizationIndex!: number;

  // Control de tipos de pregunta e inputs.
  currentQuestionType!: string;
  questionTypes = {
    single: 'radio',
    multiple: 'checkbox'
  }

  // Control de la visibilidad del modal
  isVisible = false;

  open(data: any, index: number): void {
    console.log('Data', data , 'Index', index);
    this.currentCustomizationIndex = index;
    this.quantity = 1;

    this.product = data;

    // Guardar la respuesta del index con la que viene el producto
    const clonedPreviousEditCustomization = JSON.parse(JSON.stringify(this.product.customizations[this.currentCustomizationIndex]));
    this.previousEditCustomization = clonedPreviousEditCustomization

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
    return this.product.customizationQuestions != undefined && this.currentCustomizationIndex < this.product.customizationQuestions.length
  }

  selectOption(option: CustomizationOption): void {
    const currentQuestion = this.product.customizationQuestions?.[this.currentCustomizationIndex];
    const questionName = currentQuestion?.name;
    const questionId = currentQuestion?.id;

    if (!questionName || !currentQuestion) {
        return; // Si no hay nombre de pregunta o pregunta actual, salir de la función
    }

    // Buscar si ya existe una respuesta para esta pregunta
    let existingCustomization = this.product.customizations.find(c => c.customizationQuestionId === questionId);

    console.log(existingCustomization);

    if (existingCustomization) {
      if(currentQuestion.questionType === 'single'){
        // Si la pregunta es de selección única, reemplazar la respuesta
        existingCustomization.responses = [option];
      } else {
        // Verificar si la opción ya ha sido seleccionada (para evitar duplicados)
        const optionIndex = existingCustomization.responses.findIndex(r => r.id === option.id);

        if (optionIndex !== -1) {
            // Si ya existe la opción, la eliminamos (manejo de deselección)
            existingCustomization.responses.splice(optionIndex, 1);
        } else {
            // Verificar si se ha alcanzado el número máximo de selecciones
            if (currentQuestion.maxChoices && existingCustomization.responses.length >= currentQuestion.maxChoices) {
                // Mostrar un mensaje o realizar alguna acción indicando que no se pueden seleccionar más opciones
                console.warn(`No se pueden seleccionar más de ${currentQuestion.maxChoices} opciones para ${questionName}.`);
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
          responses: [option]
        });
    }
    console.log(this.product.customizationQuestions);
    console.log(this.product.customizations);
    console.log(this.product);
  }

  isOptionSelected(currentIndex: number, optionId: string): boolean {
    const customizationResponse = this.product.customizations[currentIndex];
  
    if (!customizationResponse || !customizationResponse.responses) {
      return false; // No hay respuesta aún
    }
  
    return customizationResponse.responses.some((response : any) => response.id === optionId);
  }

  maxChoicesReached(currentIndex: number): boolean {
    const currentQuestion = this.product.customizationQuestions?.[currentIndex];
    const customizationResponse = this.product.customizations.find(c => c.customizationQuestionId === currentQuestion?.id);
  
    if (!customizationResponse || !customizationResponse.responses) {
      return false; // No hay respuesta aún
    }
  
    return customizationResponse.responses.length >= currentQuestion?.maxChoices!;
  }

  minChoicesReached(currentIndex: number): boolean {
    const currentQuestion = this.product.customizationQuestions?.[currentIndex];
    const customizationResponse = this.product.customizations.find(c => c.customizationQuestionId === currentQuestion?.id);
  

    return currentQuestion?.minChoices! == 0 || customizationResponse?.responses.length! >= currentQuestion?.minChoices!;
  }

  getTotalPrice(product : Product | Menu): number {
    return this.productService.getTotalPrice(product);
  }

  previousCustomization(): void {
    this.currentCustomizationIndex--;
  }

  editCustomization(): void {
    // Crea un nuevo producto basado en las opciones editadas
    const newProduct : Product | Menu = { ...this.product }; // Asumiendo que `id` es el identificador único y que deseas crear un nuevo producto

    // Emitir el evento con el nuevo producto y la cantidad
    this.confirmAction.emit({ product: newProduct, quantity: this.quantity });

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
    console.log(this.previousEditCustomization);
    this.product.customizations[this.currentCustomizationIndex] = this.previousEditCustomization;
    this.close();
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


}
