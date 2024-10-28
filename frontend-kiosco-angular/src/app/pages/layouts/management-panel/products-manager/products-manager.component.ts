import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ProductModalComponent } from '../modals/product-modal/product-modal.component';
import { ProductService } from '../../../../services/product.service';
import { max, min } from 'rxjs';
import { ImportModalComponent } from '../modals/import-modal/import-modal.component';

@Component({
  selector: 'app-products-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './products-manager.component.html',
  styleUrl: './products-manager.component.css'
})
export class ProductsManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

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
        this.dataSource = new MatTableDataSource<any>(this.productService.getProductsData());
      }
    });
  }

  addProduct(productData: any) {
    // Generar un ID único corto para el nuevo producto
    const newId = (this.productService.products.length + 1).toString();

    switch (productData.productType) {
      case 'Producto':
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
        break;
      case 'Grupo de modificadores':
        // Crear un nuevo grupo de modificadores a partir de los datos del formulario
        const newCustomizationQuestion = {
          id: newId,
          name: productData.name,
          productId: productData.family, // Asumiendo que family es el ID del producto asociado
          max: parseInt(productData.max),
          min: parseInt(productData.min),
        };

        // Agregar el nuevo grupo de modificadores al array de productos
        this.productService.addCustomizationQuestion(newCustomizationQuestion).subscribe(
          {
            next: (response) => {
              console.log('Grupo de modificadores añadido correctamente', response);
            },
            error: (error) => {
              console.error('Error al añadir grupo de modificadores', error);
            }
          });
        break;
      case 'Modificador':
        // Crear un nuevo modificador a partir de los datos del formulario
        let img = productData.name === 'Sin nata' ? 'assets/no.png' : 'assets/nata.png';

        const newOption = {
          id: newId,
          name: productData.name,
          price: parseFloat(productData.price_1),
          img: img, // La URL de la imagen que ya has obtenido
          questionId: productData.family, // Asumiendo que family es un ID o nombre que usas
          description: productData.description,
        };
      
        this.productService.addOption(newOption).subscribe(
          {
            next: (response) => {
              console.log('Producto añadido correctamente', response);
            },
            error: (error) => {
              console.error('Error al añadir producto', error);
            }
          }
        );
        break;
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
    // Lógica para actualizar el producto
    console.log('Actualizar producto', productId, productData);
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
