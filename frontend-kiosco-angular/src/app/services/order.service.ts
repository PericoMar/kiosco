// src/app/services/order.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private consumptionOption!: string;

  constructor() { }

  setConsumptionOption(option: string) {
    this.consumptionOption = option;
  }

  getConsumptionOption(): string {
    return this.consumptionOption;
  }
}
