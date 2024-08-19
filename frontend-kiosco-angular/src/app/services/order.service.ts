// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private consumptionOption!: string;
  private paymentMethod!: string;
  private cartProducts: Product[][] = [];
  private _products: BehaviorSubject<Product[][]>;

  constructor() {
    this._products = new BehaviorSubject<Product[][]>([]);
  }

  get products(): Observable<Product[][]> {
    return this._products.asObservable();
  }

  get totalPrice(): number {
    let total:number = 0;
    this.cartProducts.forEach(element => {
      total += element.reduce((sum,product) => sum + product.price, 0);
    });
    return total;
  }

  get countTotalProducts(): number {
    return this.cartProducts.reduce((sum,product) => sum + product.length, 0);
  }

  addProduct(product: Product): void {
    let indexProduct = this.findProduct(product);
    if (indexProduct >= 0) {
      this.cartProducts[indexProduct].push(product);
      this._products.next(this.cartProducts)
    } else {
      this.cartProducts.push([product]);
      this._products.next(this.cartProducts);
    }
  }

  subtractProduct(product: Product): void {
    let indexProduct = this.findProduct(product);
    if (this.cartProducts[indexProduct].length > 1) {
      this.cartProducts[indexProduct].pop();
    } else {
      this.cartProducts.splice(indexProduct, 1);
    }
    this._products.next(this.cartProducts);
  }

  private findProduct(product: Product): number {
    for (let i = 0; i < this.cartProducts.length; i++) {
      const subArray = this.cartProducts[i];
      const foundProduct = subArray.find((obj) => obj.id === product.id);
      if (foundProduct) {
        return i; //El return sirve como break
      }
    }
    return -1;
  }
  

  setConsumptionOption(option: string) {
    this.consumptionOption = option;
  }

  getConsumptionOption(): string {
    return this.consumptionOption;
  }

  setPaymentMethod(option:string): void{
    this.paymentMethod = option;
  }

  getPaymentMethod(option:string): string{
    return this.paymentMethod;
  }
}
