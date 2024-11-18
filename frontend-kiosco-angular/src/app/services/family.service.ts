import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Family } from '../interfaces/family';
import { AppConfig } from '../../config/app-config';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { ProductService } from './product.service';
import { FamilyData } from '../interfaces/family-data';
import { FamilyModalComponent } from '../pages/layouts/management-panel/modals/family-modal/family-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from '../pages/layouts/management-panel/modals/delete-modal/delete-modal.component';
import { SnackbarService } from './snackBar/snackbar.service';
import { ImageService } from './image/image.service';


@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  public families: Family[] = [];
  //  = [
  //   {
  //     id: "1",
  //     name: "Pizzas",
  //     img : "assets/pizza.png",
  //   },
  //   {
  //     id: "2",
  //     name: "Bebidas",
  //     img : "assets/bebidas.png",
  //   },
  //   {
  //     id: "3",
  //     name: "Hamburguesas",
  //     img : "assets/burguer.png",
  //   },
  //   {
  //     id: "4",
  //     name: "Postres",
  //     img : "assets/postre.png",
  //   }
  // ];

  constructor(private http: HttpClient,
    // private productService: ProductService,
    private dialog : MatDialog,
    private snackbarService: SnackbarService,
    private imageService: ImageService
  ) { 
  }

  private familyChangedSource = new Subject<any>();
  familyChanged$ = this.familyChangedSource.asObservable();

  // Método para emitir cambios
  emitFamilyChange(changes: any): void {
    this.familyChangedSource.next(changes);
  }

  addFamily(family: any): Observable<any> {
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
        desc: family.desc ? family.desc : 'Sin descripción',
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
    const newFamily = {
      id: newId,
      name: familyData.name,
      img: 'assets/sandwich.png', // La URL de la imagen que ya has obtenido
    };
  
    // Agregar el nuevo producto al array de productos
    this.addFamily(newFamily).pipe(
      switchMap((response) => {
        console.log('Familia añadido correctamente', response);
    
        // Verificar si productData.image está definido
        return familyData.img
          ? this.imageService.uploadImage('Familias', response.familia.id, 'imagen', familyData.img)
          : of(null); // Retorna un observable vacío si no hay imagen
      })
    ).subscribe({
      next: (uploadResponse) => {
        if (uploadResponse) {
          console.log('Imagen subida correctamente', uploadResponse);
        }
        this.snackbarService.openSnackBar('Familia añadida correctamente', 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
        this.emitFamilyChange({ type: 'familia' });
      },
      error: (error) => {
        console.error('Error en el proceso:', error);
        if (error?.stage === 'addProduct') {
          console.error('Error al añadir producto');
        } else if (error?.stage === 'uploadImage') {
          console.error('Error al subir imagen');
        }
      }
    });    

  }

  updateFamily(familyId: number, familyData: any) {
    // this.familyService.updateFamily(familyId, familyData);
  }

  openDeleteFamilyModal(product: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productType: product.productType, name: product.name, id: product.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFamily(product.id).subscribe({
          next: (response) => {
            this.snackbarService.openSnackBar('Familia eliminada correctamente', 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
            this.emitFamilyChange({ type: 'familia' });
          },
          error: (error) => {
            console.error('Error al eliminar familia', error);
          }
        });
      }
    });
  }

  deleteFamily(familyId: number) : Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/familia/${familyId}`);
  }
}
