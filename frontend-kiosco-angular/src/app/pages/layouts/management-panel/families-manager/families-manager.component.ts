import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-families-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './families-manager.component.html',
  styleUrl: './families-manager.component.css'
})
export class FamiliesManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

  heigth: string = '60%';

  displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'name', columnName: 'Nombre' },
    { columnId: 'products', columnName: 'Nº productos' },
    { columnId: 'desc', columnName: 'Descripción' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource = new MatTableDataSource<any>([
    { id: 1, name: 'Hamburguesas', products: 3, desc: 'Todas las hamburguesas', status: 'Habilitado' },
    { id: 2, name: 'Pizzas', products: 6, desc: 'Todas las pizzas', status: 'Deshabilitado' },
    { id: 3, name: 'Complementos', products: 5, desc: 'Todos los complementos', status: 'Habilitado' },
    { id: 4, name: 'Bebidas', products: 3, desc: 'Todas las bebidas', status: 'Habilitado' },
    { id: 5, name: 'Ensaladas', products: 4, desc: 'Todas las ensaladas', status: 'Deshabilitado' },
    { id: 6, name: 'Postres', products: 4, desc: 'Todos los postres', status: 'Deshabilitado' },
    { id: 7, name: 'Pasta', products: 5, desc: 'Toda la pasta', status: 'Deshabilitado' },
    { id: 8, name: 'Café', products: 10, desc: 'Todos los cafés', status: 'Habilitado' },
    { id: 9, name: 'Cervezas', products: 6, desc: 'Todas las cervezas', status: 'Habilitado' },
    { id: 10, name: 'Vinos', products: 12, desc: 'Todos los vinos', status: 'Habilitado' },
    { id: 11, name: 'Licores', products: 10, desc: 'Todos los licores', status: 'Habilitado' },
  ]);

  openFamilyModal(productId: number | null = null): void {
    console.log('Abrir modal de producto con ID:', productId);
  }
}
