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
import { UserService } from './user/user.service';


@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  // public families: Family[]
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
    private imageService: ImageService,
    private userService: UserService 
  ) { 
  }

  private FAMILIES_LOCAL_STORAGE_KEY = 'families';

  private familyChangedSource = new Subject<any>();
  familyChanged$ = this.familyChangedSource.asObservable();

  keyExists(key: string = 'families'): boolean {
    return localStorage.getItem(key) !== null;
  }

  get families(): Family[] {
    return JSON.parse(localStorage.getItem(this.FAMILIES_LOCAL_STORAGE_KEY) || '[]');
  }

  set families(families: Family[]) {
    localStorage.setItem(this.FAMILIES_LOCAL_STORAGE_KEY, JSON.stringify(families));
  }

  // Método para emitir cambios
  emitFamilyChange(changes: any): void {
    this.familyChangedSource.next(changes);
  }

  addFamily(family: any): Observable<any> {
    return this.http.post<Family>(`${AppConfig.API_URL}/familia/${this.userService.clienteId}`, family);
  }

  updateFamily(familyId: number, family: any): Observable<any> {
    return this.http.put<Family>(`${AppConfig.API_URL}/familia/${familyId}`, family);
  }

  getFamiliesObservable(cliente_id: number): Observable<Family[]> {
    return this.http.get<Family[]>(`${AppConfig.API_URL}/familias/${cliente_id}`);
  }

  getFamilyById(id: string): Family | undefined {
    return this.families.find((family) => family.id == id);
  }

  getFamilyByIdObservable(id: string): Observable<Family> {
    return this.http.get<Family>(`${AppConfig.API_URL}/familia/${id}`);
  }

  getFirstFamilyId(): string {
    return this.families[0].id;
  }

  getFamilyName(id: string): string {
    let familyName = '';
    this.getFamiliesObservable(this.userService.clienteId).subscribe(families => {
      familyName = families.find((family) => family.id == id)?.name || '';
    });
    return familyName;
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

  openFamilyModal(familyId: number | null = null): void {
    const dialogRef = this.dialog.open(FamilyModalComponent, {
      width: '700px',
      data: { familyId: familyId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        console.log('ID de la familia:', familyId);
        if (familyId) {
          this.updateFamilyData(familyId, result);
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
      desc: familyData.description,
      status: familyData.status === 'Habilitado' ? 1 : 0,
    };
  
    // Agregar el nuevo producto al array de productos
    this.addFamily(newFamily).pipe(
      switchMap((response) => {
        console.log('Familia añadido correctamente', response);

        this.addFamilyToLocalStorage(newFamily);

        // Verificar si productData.image está definido
        return familyData.img && familyData.img instanceof File
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

  addFamilyToLocalStorage(family: Family) {
    this.families = [...this.families, family];
  }

  updateFamilyData(familyId: number, familyData: any) {

    const family = {
      name: familyData.name,
      desc: familyData.description,
      status: familyData.status === 'Habilitado' ? 1 : 0,
    };
  
    // Agregar el nuevo producto al array de productos
    this.updateFamily(familyId, family).pipe(
      switchMap((response) => {
        console.log('Familia añadido correctamente', response);
        
        this.updateFamilyInLocalStorage(familyId, family);

        // Verificar si productData.image está definido
        return familyData.img && familyData.img instanceof File
          ? this.imageService.uploadImage('Familias', response.familia, 'imagen', familyData.img)
          : of(null); // Retorna un observable vacío si no hay imagen
      })
    ).subscribe({
      next: (uploadResponse) => {
        if (uploadResponse) {
          console.log('Imagen subida correctamente', uploadResponse);
        }
        this.snackbarService.openSnackBar('Familia actualizada correctamente', 'Cerrar', 3000, ['custom-snackbar', 'success-snackbar']);
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

  updateFamilyInLocalStorage(familyId: number, family: any) {
    this.deleteFamilyFromLocalStorage(familyId);
    this.addFamilyToLocalStorage(family);
  }

  openDeleteFamilyModal(product: any): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productType: 'Familia', name: product.name, id: product.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteFamilyFromLocalStorage(product.id);

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

  deleteFamilyFromLocalStorage(familyId: number) {
    this.families = this.families.filter((family) => Number(family.id) !== familyId);
  }

  deleteFamily(familyId: number) : Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/familia/${familyId}`);
  }
}
