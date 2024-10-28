import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../interfaces/family';
import { AppConfig } from '../../config/app-config';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';


interface FamilyData {
  // { id: 1, name: 'Hamburguesas', products: 3, desc: 'Todas las hamburguesas', status: 'Habilitado' },
  id: number;
  name: string;
  desc: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  public families: Family[] = [
    {
      id: "1",
      name: "Pizzas",
      img : "assets/pizza.png",
    },
    {
      id: "2",
      name: "Bebidas",
      img : "assets/bebidas.png",
    },
    {
      id: "3",
      name: "Hamburguesas",
      img : "assets/burguer.png",
    },
    {
      id: "4",
      name: "Postres",
      img : "assets/postre.png",
    }
  ];

  constructor(private http: HttpClient,
    // private productService: ProductService,
  ) {
    
  }

  addFamily(family: any): Observable<Family> {
    return this.http.post<Family>(`${AppConfig.API_URL}/familia`, family);
  }

  getFamiliesObservable(): Observable<Family[]> {
    return this.http.get<Family[]>(`${AppConfig.API_URL}/familias`);
  }

  getFamilyById(id: string): Family | undefined {
    return this.families.find((family) => family.id == id);
  }

  getFirstFamilyId(): string {
    return this.families[0].id;
  }

  getFamilyName(id: string): string {
    return this.families.find((family) => family.id == id)?.name || '';
  }

  getFamiliesData() : FamilyData[] {
    return this.families.map(family => {
      return {
        id: parseInt(family.id),
        name: family.name,
        // products: this.productService.getNumberOfProductsByFamilyId(family.id),
        desc: `Todas las ${family.name}`,
        status: 'Habilitado'
      }
    });
  }
}
