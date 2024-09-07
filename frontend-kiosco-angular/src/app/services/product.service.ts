import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu, Product } from '../interfaces/pedido';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getProductsByFamilyId(id: string): (Product | Menu)[] {
    return [
      {
        id: "1",
        name: "Muzzarella",
        price: 350,
        img : "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y aceitunas",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: 'p1',
        name: 'Hamburguesa especial',
        img: 'assets/burguer.png',
        price: 12.99,
        description: 'Una deliciosa hamburguesa con ingredientes frescos y personalizables.',
        familyId: '1',
        customizations: [],
        customizationQuestions: [
          {
            id: 'pan',
            name: '¿Qué tipo de pan prefieres?',
            questionType: 'single',
            minChoices: 1,
            options: [
              { id: 'pan-avena', value: 'Pan de avena', price: 0, img: 'assets/pan.png' },
              { id: 'pan-integral', value: 'Pan integral', price: 0.5, img: 'assets/pan.png' },
              { id: 'pan-brioche', value: 'Pan brioche', price: 1.0, img: 'assets/pan.png' },
              { id: 'pan-cereales', value: 'Pan cereales', price: 1.5, img: 'assets/pan.png' },
              { id: 'pan-tostado', value: 'Pan tostado', price: 0, img: 'assets/pan.png' },
            ]
          },
          {
            id: 'carne',
            name: '¿Qué nivel de cocción deseas?',
            questionType: 'single',
            minChoices: 1,
            options: [
              { id: 'poco-hecho', value: 'Poco hecho', price: 0 },
              { id: 'en-su-punto', value: 'En su punto', price: 0 },
              { id: 'bien-hecho', value: 'Bien hecho', price: 0.5 }
            ]
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
              { id: 'champinones', value: 'Champiñones', price: 0.7 }
            ]
          }
        ],
      },
      {
        id: "2",
        name: "Fugazzeta",
        price: 400,
        img : "../../../assets/pizza.png",
        familyId: "1",
        description: "Fugazzeta con cebolla y queso",
        customizations: [],
        customizationsQuestions: [],
      },
      //Insertar al menos 8 productos mas de la familia 1 para poder ver el scroll
      {
        id: "9",
        name: "Napolitana",
        price: 450,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y ajo",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "10",
        name: "Calabresa",
        price: 500,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y calabresa",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "11",
        name: "Cuatro Quesos",
        price: 550,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, provolone, roquefort y parmesano",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "12",
        name: "Hawaiana",
        price: 450,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, jamón y ananá",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "13",
        name: "Pepperoni",
        price: 500,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y pepperoni",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "14",
        name: "Vegetariana",
        price: 400,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, pimientos, cebolla, aceitunas y champiñones",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "15",
        name: "Margherita",
        price: 450,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y albahaca",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "16",
        name: "Barbacoa",
        price: 600,
        img: "assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, carne, cebolla y salsa barbacoa",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "3",
        name: "Coca Cola",
        price: 100,
        img : "assets/coca.png",
        familyId: "2",
        description: "Coca Cola 1.5L",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "4",
        name: "Fanta",
        price: 100,
        img : "assets/fanta.png",
        familyId: "2",
        description: "Fanta 1.5L",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "5",
        name: "Hamburguesa",
        price: 150,
        img : "assets/burguer.png",
        familyId: "3",
        description: "Hamburguesa con queso",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "6",
        name: "Papas",
        price: 50,
        img : "assets/papas.png",
        familyId: "3",
        description: "Papas fritas",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "7",
        name: "Helado",
        price: 200,
        img : "assets/helado.png",
        familyId: "4",
        description: "Helado de chocolate",
        customizations: [],
        customizationsQuestions: [],
      },
      {
        id: "8",
        name: "Brownie",
        price: 150,
        img : "assets/camera.png",
        familyId: "4",
        description: "Brownie de chocolate",
        customizations: [],
        customizationsQuestions: [],
      }
    ].filter(product => product.familyId === id);
  }

  getTotalPrice(product : Product | Menu): number {
    let totalPrice = product.price;

    product.customizations.forEach(customization => {
      customization.responses.forEach(response => {
        totalPrice += response.price || 0;
      });
    });

    //Devolverlo con dos decimales aproximados
    return Math.round(totalPrice * 100) / 100;
  }
}
