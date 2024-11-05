import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../interfaces/family';
import { AppConfig } from '../../config/app-config';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { FamilyData } from '../interfaces/family-data';
import { FamilyModalComponent } from '../pages/layouts/management-panel/modals/family-modal/family-modal.component';
import { MatDialog } from '@angular/material/dialog';


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
    private dialog : MatDialog
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
        status: 'Habilitado',
        type: 'familia',
      }
    });
  }

  openFamilyModal(productId: number | null = null): void {
    const dialogRef = this.dialog.open(FamilyModalComponent, {
      width: '700px',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        console.log('ID de la familia:', productId);
        if (productId) {
          this.updateFamily(productId, result);
        } else {
          this.addFamilyData(result);
        }
      }
    });
  }

  addFamilyData(familyData: any) {
    // Generar un ID único corto para el nuevo producto
    const newId = (this.families.length + 1).toString();
  
    // Crear un nuevo producto a partir de los datos del formulario
    const newProduct = {
      id: newId,
      name: familyData.name,
      img: 'assets/sandwich.png', // La URL de la imagen que ya has obtenido
    };
  
    // Agregar el nuevo producto al array de productos
    this.families.push(newProduct);
    this.addFamily(newProduct).subscribe(
      {
        next: (response) => {
          console.log('Producto añadido correctamente', response);
        },
        error: (error) => {
          console.error('Error al añadir producto', error);
        }
      }
    );

  }

  updateFamily(familyId: number, familyData: any) {
    // this.familyService.updateFamily(familyId, familyData);
  }

  openDeleteFamilia(element: any) {
    // this.familyService.openDeleteFamilia(element);
  }
}
