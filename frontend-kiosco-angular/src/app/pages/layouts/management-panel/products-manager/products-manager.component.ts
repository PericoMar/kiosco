import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { MatTableDataSource } from '@angular/material/table';

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
    { columnId: 'name', columnName: 'Nombre' },
    { columnId: 'family', columnName: 'Familia' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource = new MatTableDataSource<any>([
    { id: 1, name: 'Cheeseburguer', family: 'Hamburguesas', status: 'Habilitado', allergens: ['gluten', 'lactosa'] },
    { id: 2, name: 'Margarita', family: 'Pizzas', status: 'Deshabilitado', allergens: [] },
    { id: 3, name: 'Patatas', family: 'Complementos', status: 'Habilitado', allergens: ['gluten'] },
    { id: 4, name: 'Coca-Cola', family: 'Bebidas', status: 'Habilitado', allergens: [] },
    { id: 5, name: 'Ensalada', family: 'Ensaladas', status: 'Deshabilitado', allergens: ['gluten'] },
    { id: 6, name: 'Cerveza', family: 'Bebidas', status: 'Habilitado', allergens: ['gluten'] },
    { id: 7, name: 'Pasta', family: 'Pasta', status: 'Deshabilitado', allergens: ['gluten'] },
    { id: 8, name: 'Hamburguesa de pollo', family: 'Hamburguesas', status: 'Habilitado', allergens: ['gluten'] },
    { id: 9, name: 'Tarta de queso', family: 'Postres', status: 'Deshabilitado', allergens: ['gluten', 'lactosa'] },
    { id: 10, name: 'Café', family: 'Bebidas', status: 'Habilitado', allergens: [] },
    { id: 11, name: 'Fishburguer', family: 'Hamburguesas', status: 'Habilitado', allergens: ['pescado', 'gluten', 'lactosa', 'moluscos', 'cacahuetes'] },
  ]);

  openProductModal(productId: number | null = null): void {
    console.log('Abrir modal de producto con ID:', productId);
  }
}
