import { Component } from '@angular/core';
import { OverviewGraphComponent } from './overview-graph/overview-graph.component';
import { TableComponent } from '../table/table.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { FamilyService } from '../../../../services/family.service';
import { SnackbarService } from '../../../../services/snackBar/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../services/user/user.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewGraphComponent, TableComponent, CommonModule, ReactiveFormsModule, FormsModule, MatMenuModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  startMonth!: string;
  endMonth!: string;
  loadingData: boolean = false;
  hayProductosSinFamilia: boolean = false;
  dataSource!: MatTableDataSource<any>;  

  private productChangesSubscription!: Subscription;

  notifications: any[] = [
    // { id: 1, message: 'Nueva impresora añadida.' },
    // { id: 2, message: 'Nuevo datáfono disponible.' }
  ];
  showNotifications: boolean = false;

  displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'productType', columnName: 'Tipo' },
    { columnId: 'name', columnName: 'Nombre / Texto' },
    // { columnId: 'price', columnName: 'Tarifa' },
    { columnId: 'family', columnName: 'Familia / Grupo / Producto' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];


  constructor(private router : Router,
    private dialog : MatDialog,
    private productService : ProductService,
    private familyService : FamilyService,
    private snackbarService : SnackbarService,
    private userService : UserService
  ) { }

  families : any[] = [];

  ngOnInit() {
    this.familyService.getFamiliesObservable(this.userService.clienteId).subscribe({
      next: (families) => {
        this.families = families;
      }
    });

    this.refreshTable(null);

    this.productChangesSubscription = this.productService.productChanged$.subscribe(changes => {
      this.refreshTable(changes);  // Llamar a la función para recargar la tabla
    });

    const now = new Date();
    this.startMonth = this.getMonthString(now.getMonth(), now.getFullYear() - 1); // Un mes antes
    this.endMonth = this.getMonthString(now.getMonth(), now.getFullYear()); // Mes actual
  }

  refreshTable(changes: any) {
    console.log('Recargar tabla de productos');
    this.loadingData = true;
    let productsData: any[] = [];

    // Función para configurar los productos y actualizar la tabla
    const updateTable = (products: any[]) => {
      this.dataSource = new MatTableDataSource<any>(products);
      this.hayProductosSinFamilia = products.some((product: any) => product.familyId === '');
      this.loadingData = false; // Indicar que se han cargado los datos
    };
  
    if (this.productService.keyExists()) {
      // Si existe la clave, obtén los datos desde localStorage
      productsData = this.productService.getProductsData();
      updateTable(productsData);
    } else {
      // Si no existe la clave, obtiene los productos a través de un Observable
      this.productService.getProductsObservable(this.userService.clienteId).subscribe({
        next: (products) => {
          this.productService.products = products;  // Asignar los productos al servicio
          productsData = this.productService.getProductsData();  // Obtener los productos
          updateTable(productsData);  // Llamar a la función para actualizar la tabla
        },
        error: () => {
          this.loadingData = false;  // Maneja el caso de error
          console.error('Error al cargar los productos.');
        }
      });
    }
  }

  getMonthString(month: number, year: number): string {
    return `${year}-${('0' + (month + 1)).slice(-2)}`; // Formato "YYYY-MM"
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  openProductModal(productId: number | null = null): void {
    if(this.familyService.families.length !== 0){
      this.productService.openProductModal(productId);
    } else {
      this.snackbarService.openSnackBar('Añada primero alguna familia en la pagina de familias.', 'Cerrar');
    }
  }

  
  // Función para obtener los alérgenos seleccionados como un array de strings
  private getSelectedAllergens(allergens: boolean[]): string[] {
    const allergenNames = [
      'gluten', 'lactosa', 'altramuces', 'huevos',
      'apio', 'cacahuetes', 'crustaceos', 'cascara',
      'mostaza', 'pescado', 'sesamo', 'soja',
      'dioxido-azufre', 'moluscos'
    ];
  
    return allergens
      .map((selected, index) => (selected ? allergenNames[index] : ''))
      .filter((allergen) => allergen !== null);
  }
  
  updateProduct(productId: number, productData: any) {
    // Lógica para actualizar producto
    console.log('Actualizar producto', productId, productData);
  }


  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
}
