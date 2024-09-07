import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../interfaces/family';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  constructor(private http : HttpClient) { }

  getFamilies() : Family[]{
    return [
      {
        id: "1",
        name: "Pizzas",
        img : "../../../assets/pizza.png",
      },
      {
        id: "2",
        name: "Bebidas",
        img : "../../../assets/bebidas.png",
      },
      {
        id: "3",
        name: "Hamburguesas",
        img : "../../../assets/burguer.png",
      },
      {
        id: "4",
        name: "Postres",
        img : "../../../assets/postre.png",
      }
    ]
  }
  getFamilyById(id: string) : Family {
    return this.getFamilies().find(family => family.id === id) as Family;
  }

  getFirstFamilyId() : string {
    return this.getFamilies()[0].id;
  }
}
