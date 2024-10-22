import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu, Product } from '../interfaces/pedido';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public products: (Product | Menu)[] = [
    {
      id: '1',
      name: 'Muzzarella',
      price: 10.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y aceitunas',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: 'p1',
      name: 'Hamburguesa especial',
      img: 'assets/burguer.png',
      price: 12.99,
      description:
        'Una deliciosa hamburguesa con ingredientes frescos y personalizables.',
      familyId: '1',
      customizations: [],
      customizationQuestions: [
        {
          id: 'pan',
          name: '¿Qué tipo de pan prefieres?',
          questionType: 'single',
          minChoices: 1,
          options: [
            {
              id: 'pan-avena',
              value: 'Pan de avena',
              price: 0,
              img: 'assets/pan.png',
            },
            {
              id: 'pan-integral',
              value: 'Pan integral',
              price: 0.5,
              img: 'assets/pan.png',
            },
            {
              id: 'pan-brioche',
              value: 'Pan brioche',
              price: 1.0,
              img: 'assets/pan.png',
            },
            {
              id: 'pan-cereales',
              value: 'Pan cereales',
              price: 1.5,
              img: 'assets/pan.png',
            },
            {
              id: 'pan-tostado',
              value: 'Pan tostado',
              price: 0,
              img: 'assets/pan.png',
            },
          ],
        },
        {
          id: 'carne',
          name: '¿Qué nivel de cocción deseas?',
          questionType: 'single',
          minChoices: 1,
          options: [
            { id: 'poco-hecho', value: 'Poco hecho', price: 0 },
            { id: 'en-su-punto', value: 'En su punto', price: 0 },
            { id: 'bien-hecho', value: 'Bien hecho', price: 0.5 },
          ],
        },
        {
          id: 'extra',
          name: 'Añade algún extra:',
          questionType: 'multiple',
          minChoices: 0,
          maxChoices: 2,
          options: [
            { id: 'bacon', value: 'Bacon', price: 1.5 },
            { id: 'aguacate', value: 'Aguacate', price: 1.0 },
            { id: 'champinones', value: 'Champiñones', price: 0.7 },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'Fugazzeta',
      price: 9.75,
      img: '../../../assets/pizza.png',
      familyId: '1',
      description: 'Fugazzeta con cebolla y queso',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '9',
      name: 'Napolitana',
      price: 11.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y ajo',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '10',
      name: 'Calabresa',
      price: 10,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella y calabresa',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '11',
      name: 'Cuatro Quesos',
      price: 10.75,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, provolone, roquefort y parmesano',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '12',
      name: 'Hawaiana',
      price: 10,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, jamón y ananá',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '13',
      name: 'Pepperoni',
      price: 10.30,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella y pepperoni',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '14',
      name: 'Vegetariana',
      price: 8,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, pimientos, cebolla, aceitunas y champiñones',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '15',
      name: 'Margherita',
      price: 10.30,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, tomate y albahaca',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '16',
      name: 'Barbacoa',
      price: 12,
      img: 'assets/pizza.png',
      familyId: '1',
      description: 'Muzzarella, carne, cebolla y salsa barbacoa',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '3',
      name: 'Coca Cola',
      price: 1.25,
      img: 'assets/coca.png',
      familyId: '2',
      description: 'Coca Cola 1.5L',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '4',
      name: 'Fanta',
      price: 1,
      img: 'assets/fanta.png',
      familyId: '2',
      description: 'Fanta 1.5L',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '5',
      name: 'Hamburguesa',
      price: 8.95,
      img: 'assets/burguer.png',
      familyId: '3',
      description: 'Hamburguesa con queso',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '6',
      name: 'Papas',
      price: 2.30,
      img: 'assets/papas.png',
      familyId: '3',
      description: 'Papas fritas',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '7',
      name: 'Helado',
      price: 3.50,
      img: 'assets/helado.png',
      familyId: '4',
      description: 'Helado de chocolate',
      customizations: [],
      customizationQuestions: [],
    },
    {
      id: '8',
      name: 'Brownie',
      price: 4.40,
      img: 'assets/brownie.png',
      familyId: '4',
      description: 'Brownie de chocolate',
      customizations: [],
      customizationQuestions: [],
    },
  ];

  constructor(private http: HttpClient) {}

  getProductsObservable(): Observable<(Product | Menu)[]> {
    return this.http.get<(Product | Menu)[]>(`${AppConfig.API_URL}/articulos`);
  }

  getProducts(): (Product | Menu)[] {
    return this.products;
  }

  getTotalPrice(product: Product | Menu): number {
    let totalPrice = Number(product.price);

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
