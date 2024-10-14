import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu, Product } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: (Product | Menu)[] = [];

  constructor(private http: HttpClient) {}


  getProductsObservable(): Observable<(Product | Menu)[]> {
    return this.http.get<(Product | Menu)[]>(`${AppConfig.API_URL}/articulos`);
  }

  getProducts(): (Product | Menu)[] {
    return this.products;
  }

  getTotalPrice(product: Product | Menu): number {
    let totalPrice = product.price;

    product.customizations.forEach((customization) => {
      customization.responses.forEach((response) => {
        totalPrice += response.price || 0;
      });
    });

    //Devolverlo con dos decimales aproximados
    return Math.round(totalPrice * 100) / 100;
  }

  // Obtener productos filtrados por ID de familia
  getProductsByFamilyId(id: string): (Product | Menu)[] {
    return this.products.filter((product) => product.familyId === id);
  }
}
