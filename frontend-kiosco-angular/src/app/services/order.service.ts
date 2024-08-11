// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private consumptionOption!: string;
  private cartProducts: Product[] = [];
  private _products: BehaviorSubject<Product[]>;

  constructor() {
    this._products = new BehaviorSubject<Product[]>([]);
  }

  get products(): Observable<Product[]> {
    return this._products.asObservable();
  }

  get totalPrice(): number {
    return this.cartProducts.reduce((sum, product) => sum + product.price*product.amount, 0);
  }

  get countTotalProducts(): number {
    return this.cartProducts.reduce((sum, product) => sum + product.amount, 0);
  }

  addProduct(product: Product): void {
    let productSelected = this.findProduct(product);
    if (productSelected) {
      productSelected.amount++;
      this._products.next(this.cartProducts)
    } else {
      product.amount ++;
      this.cartProducts.push(product);
      this._products.next(this.cartProducts);
    }
  }

  subtractProduct(product: Product): void {
    let productSelected = this.findProduct(product);
    if (productSelected) {
      if (productSelected.amount > 1) {
        productSelected.amount -- ;
        this._products.next(this.cartProducts)
      } else {
        productSelected.amount -- ;
        this.cartProducts = this.cartProducts.filter((p) => p.id !== productSelected.id);
        this._products.next(this.cartProducts)
      }
    }
  }

  private findProduct(product: Product): any {
    return this.cartProducts.find((obj) => obj.id === product.id);
  }

  setConsumptionOption(option: string) {
    this.consumptionOption = option;
  }

  getConsumptionOption(): string {
    return this.consumptionOption;
  }
}
