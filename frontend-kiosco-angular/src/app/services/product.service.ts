import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  getProductsByFamilyId(id: string){
    return [
      {
        id: "1",
        name: "Muzzarella",
        price: 350,
        img : "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y aceitunas"
      },
      {
        id: "2",
        name: "Fugazzeta",
        price: 400,
        img : "../../../assets/pizza.png",
        familyId: "1",
        description: "Fugazzeta con cebolla y queso"
      },
      //Insertar al menos 8 productos mas de la familia 1 para poder ver el scroll
      {
        id: "9",
        name: "Napolitana",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y ajo"
      },
      {
        id: "10",
        name: "Calabresa",
        price: 500,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y calabresa"
      },
      {
        id: "11",
        name: "Cuatro Quesos",
        price: 550,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, provolone, roquefort y parmesano"
      },
      {
        id: "12",
        name: "Hawaiana",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, jamón y ananá"
      },
      {
        id: "13",
        name: "Pepperoni",
        price: 500,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella y pepperoni"
      },
      {
        id: "14",
        name: "Vegetariana",
        price: 400,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, pimientos, cebolla, aceitunas y champiñones"
      },
      {
        id: "15",
        name: "Margherita",
        price: 450,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, tomate y albahaca"
      },
      {
        id: "16",
        name: "Barbacoa",
        price: 600,
        img: "../../../assets/pizza.png",
        familyId: "1",
        description: "Muzzarella, carne, cebolla y salsa barbacoa"
      },
      {
        id: "3",
        name: "Coca Cola",
        price: 100,
        img : "../../../assets/coca.png",
        familyId: "2",
        description: "Coca Cola 1.5L"
      },
      {
        id: "4",
        name: "Fanta",
        price: 100,
        img : "../../../assets/fanta.png",
        familyId: "2",
        description: "Fanta 1.5L"
      },
      {
        id: "5",
        name: "Hamburguesa",
        price: 150,
        img : "../../../assets/hamburguesa.png",
        familyId: "3",
        description: "Hamburguesa con queso"
      },
      {
        id: "6",
        name: "Papas",
        price: 50,
        img : "../../../assets/papas.png",
        familyId: "3",
        description: "Papas fritas"
      },
      {
        id: "7",
        name: "Helado",
        price: 200,
        img : "../../../assets/helado.png",
        familyId: "4",
        description: "Helado de chocolate"
      },
      {
        id: "8",
        name: "Brownie",
        price: 150,
        img : "../../../assets/brownie.png",
        familyId: "4",
        description: "Brownie de chocolate"
      }
    ].filter(product => product.familyId === id);
  }
}
