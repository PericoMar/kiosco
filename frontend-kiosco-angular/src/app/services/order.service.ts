// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private consumptionOption!: string;
  order: Product[] = [];

  constructor() { }

  addProduct(product: Product) {
    this.order.push(product);
  }

  setConsumptionOption(option: string) {
    this.consumptionOption = option;
  }

  getConsumptionOption(): string {
    return this.consumptionOption;
  }
}
