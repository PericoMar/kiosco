import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { max, min, Subscription } from 'rxjs';
import { ImportModalComponent } from '../modals/import-modal/import-modal.component';
import { FamilyService } from '../../../../services/family.service';
import { SnackbarService } from '../../../../services/snackBar/snackbar.service';
import { UserService } from '../../../../services/user/user.service';

@Component({
  selector: 'app-products-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

  private productChangesSubscription!: Subscription;

  elementType: string = 'Productos';

  heigth: string = '60%';

  displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'productType', columnName: 'Tipo' },
    { columnId: 'name', columnName: 'Nombre / Texto' },
    { columnId: 'family', columnName: 'Familia / Grupo / Producto' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource!: MatTableDataSource<any>;

  loadingData: boolean = false;
  hayProductosSinFamilia: boolean = false;

  families : any[] = [];

  constructor(private dialog: MatDialog,
    private productService: ProductService,
    private familyService: FamilyService,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit() {
    if(this.familyService.keyExists()){
      this.families = this.familyService.families;
    } else {
      this.familyService.getFamiliesObservable(this.userService.clienteId).subscribe({
        next: (families) => {
          this.familyService.families = families;
          this.families = families;
        }
      });
    }

    this.refreshTable(null);

    this.productChangesSubscription = this.productService.productChanged$.subscribe(changes => {
      this.refreshTable(changes);  // Llamar a la función para recargar la tabla
    });
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
  

  openProductModal(productId: number | null = null): void {
    if(this.familyService.families.length !== 0){
      this.productService.openProductModal(productId);
    } else {
      this.snackbarService.openSnackBar('Añada primero alguna familia en la pagina de familias', 'Cerrar');
    }
  }

  openImportModal(): void {
    const dialogRef = this.dialog.open(ImportModalComponent, {
      width: '700px',
      data: { elementType: this.elementType }
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   if (result) {
    //     console.log('Datos recibidos del modal:', result);
    //     console.log('ID del producto:', productId);
    //     if (productId) {
    //       this.updateProduct(productId, result);
    //     } else {
    //       this.addProduct(result);
    //     }
    //     this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
    //   }
    // });
  }
}
