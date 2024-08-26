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
        img : "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y aceitunas",
        amount: 0
      },
      {
        id: "2",
        name: "Fugazzeta",
        price: 400,
        img : "../../../assets/pizza.png",
        familyId: "1",
        description: "Fugazzeta con cebolla y queso",
        amount: 0
      },
      //Insertar al menos 8 productos mas de la familia 1 para poder ver el scroll
      {
        id: "9",
        name: "Napolitana",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y ajo",
        amount: 0
      },
      {
        id: "10",
        name: "Calabresa",
        price: 500,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y calabresa",
        amount: 0
      },
      {
        id: "11",
        name: "Cuatro Quesos",
        price: 550,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, provolone, roquefort y parmesano",
        amount: 0
      },
      {
        id: "12",
        name: "Hawaiana",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, jamón y ananá",
        amount: 0
      },
      {
        id: "13",
        name: "Pepperoni",
        price: 500,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y pepperoni",
        amount: 0
      },
      {
        id: "14",
        name: "Vegetariana",
        price: 400,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, pimientos, cebolla, aceitunas y champiñones",
        amount: 0
      },
      {
        id: "15",
        name: "Margherita",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y albahaca",
        amount: 0
      },
      {
        id: "16",
        name: "Barbacoa",
        price: 600,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, carne, cebolla y salsa barbacoa",
        amount: 0
      },
      {
        id: "3",
        name: "Coca Cola",
        price: 100,
        img : "../../../assets/coca.png",
        familyId: "2",
        description: "Coca Cola 1.5L",
        amount: 0
      },
      {
        id: "4",
        name: "Fanta",
        price: 100,
        img : "../../../assets/fanta.png",
        familyId: "2",
        description: "Fanta 1.5L",
        amount: 0
      },
      {
        id: "5",
        name: "Hamburguesa",
        price: 150,
        img : "../../../assets/hamburguesa.png",
        familyId: "3",
        description: "Hamburguesa con queso",
        amount: 0
      },
      {
        id: "6",
        name: "Papas",
        price: 50,
        img : "../../../assets/papas.png",
        familyId: "3",
        description: "Papas fritas",
        amount: 0
      },
      {
        id: "7",
        name: "Helado",
        price: 200,
        img : "../../../assets/helado.png",
        familyId: "4",
        description: "Helado de chocolate",
        amount: 0
      },
      {
        id: "8",
        name: "Brownie",
        price: 150,
        img : "../../../assets/brownie.png",
        familyId: "4",
        description: "Brownie de chocolate",
        amount: 0
      }
    ].filter(product => product.familyId === id);
  }
}
