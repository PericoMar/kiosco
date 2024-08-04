import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.css'
})
export class ConfirmModalComponent {
  @Input() data: any;
  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  isVisible = false;

  open(data: any): void {
    this.data = data;
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

  close(): void {
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
    this.confirmAction.emit();
    this.close();
  }
}
