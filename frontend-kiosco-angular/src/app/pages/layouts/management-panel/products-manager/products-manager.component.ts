import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-products-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

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

  constructor(private dialog : MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
  }


  openProductModal(productId: number | null = null): void {
    const dialogRef = this.dialog.open(ProductModalComponent, {
      width: '700px',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        console.log('ID del producto:', productId);
        if (productId) {
          this.updateProduct(productId, result);
        } else {
          this.addProduct(result);
        }
      }
    });
  }

  addProduct(productData: any) {
    // Generar un ID único corto para el nuevo producto
    const newId = (this.productService.products.length + 1).toString();
  
    // Crear un nuevo producto a partir de los datos del formulario
    const newProduct = {
      id: newId,
      name: productData.name,
      price: parseFloat(productData.price_1),
      img: 'assets/burguer_barbacoa.png', // La URL de la imagen que ya has obtenido
      familyId: productData.family, // Asumiendo que family es un ID o nombre que usas
      description: productData.description,
      customizations: [],
      customizationQuestions: [],
      allergens: this.getSelectedAllergens(productData.allergens) // Llama a la función para obtener alérgenos seleccionados
    };
  
    // Agregar el nuevo producto al array de productos
    this.productService.products.push(newProduct);
    this.productService.addProduct(newProduct).subscribe(
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
    // Lógica para actualizar el producto
    console.log('Actualizar producto', productId, productData);
  }
}
