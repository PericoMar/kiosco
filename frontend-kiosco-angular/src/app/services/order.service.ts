// src/app/services/order.service.ts
import { Injectable } from '@angular/core';
import { Menu, Order, OrderItem, Product } from '../interfaces/pedido';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private consumptionOption: string = '';
  private paymentMethod: string = '';
  private cartProduct: Order | null = null
  private _products: BehaviorSubject<Order | null>;

  constructor(
    private productService: ProductService,
  ) {
    this._products = new BehaviorSubject<Order | null>(null);
  }

  get products(): Observable<Order | null> {
    return this._products.asObservable();
  }

  clearOrder(){
    this.cartProduct = null;
    this._products.next(null);
  }

  getOrder(): Order{
    if (this.cartProduct){
      return this.cartProduct;
    }else{
      return {
        id: Date.now(),
        items: [],
        total: 0,
        date: new Date(),
        consumptionOption: this.consumptionOption,
        paymentMethod: this.paymentMethod,
      }
    }
  }

  get totalPrice(): number {
    if (!this.cartProduct) return 0;

    return this.cartProduct.items.reduce((total, item) => {
      return total + item.quantity * this.productService.getTotalPrice((item.details as Product | Menu));
    }, 0);
  }

  get countTotalProducts(): number {
    if (!this.cartProduct) return 0;

    return this.cartProduct.items.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  }

  addProduct(product: Product | Menu, quantity: number = 1): void {
    console.log("Antes", this._products);

    if (!this.cartProduct) {
        this.cartProduct = {
            id: Date.now(),
            items: [],
            total: 0,
            date: new Date(),
            consumptionOption: this.consumptionOption,
            paymentMethod: this.paymentMethod,
        };
    }

    // Crear una copia del producto para evitar que las personalizaciones se sobrescriban
    const clonedProduct = JSON.parse(JSON.stringify(product));

    // Buscar si el producto o menú ya está en el pedido
    const existingItemIndex = this.cartProduct.items.findIndex(item => {
        console.log("original:",item.details);
        console.log("clonado",clonedProduct);
        return (
            item.details.id === clonedProduct.id &&
            item.type === (clonedProduct.hasOwnProperty('products') ? 'menu' : 'product') &&
            JSON.stringify(item.details.customizations) === JSON.stringify(clonedProduct.customizations)
        );
    });

    if (existingItemIndex >= 0) {
        // Si el producto/menú ya existe, incrementa la cantidad
        console.log("Ya existe");
        this.cartProduct.items[existingItemIndex].quantity += quantity;
    } else {
      console.log("No existe nuevo producto:",product)
        // Si no existe, añade un nuevo OrderItem
        const newItem: OrderItem = {
            type: clonedProduct.hasOwnProperty('products') ? 'menu' : 'product',
            quantity: quantity,
            details: clonedProduct,
        };
        this.cartProduct.items.push(newItem);
    }

    // Recalcula el total del pedido
    this.cartProduct.total = this.totalPrice;

    // Actualiza el observable con el nuevo estado del carrito
    this._products.next(this.cartProduct);

    console.log("Después", this.cartProduct);
}


  subtractProduct(product: Product | Menu): void {
    if (!this.cartProduct) return;

    const existingItemIndex = this.cartProduct.items.findIndex(item =>
      item.details.id === product.id && item.type === (product.hasOwnProperty('products') ? 'menu' : 'product')
    );

    if (existingItemIndex >= 0) {
      if (this.cartProduct.items[existingItemIndex].quantity > 1) {
        this.cartProduct.items[existingItemIndex].quantity--;
      } else {
        this.cartProduct.items.splice(existingItemIndex, 1);
      }

      // Recalcula el total del pedido
      this.cartProduct.total = this.totalPrice;

      // Actualiza el observable con el nuevo estado del carrito
      this._products.next(this.cartProduct);
    }
  }

  private findProduct(product: Product | Menu): number {
    if (!this.cartProduct) return -1;

    return this.cartProduct.items.findIndex(item =>
      item.details.id === product.id && item.type === (product.hasOwnProperty('products') ? 'menu' : 'product')
    );
  }

  setConsumptionOption(option: string) {
    this.consumptionOption = option;
    if (this.cartProduct) {
      this.cartProduct.consumptionOption = option;
      this._products.next(this.cartProduct);
    }
  }

  getConsumptionOption(): string {
    return this.consumptionOption;
  }

  setPaymentMethod(option: string): void {
    this.paymentMethod = option;
    if (this.cartProduct) {
      this.cartProduct.paymentMethod = option;
      this._products.next(this.cartProduct);
    }
  }

  getPaymentMethod(): string {
    return this.paymentMethod;
  }
}