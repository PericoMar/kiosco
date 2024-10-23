import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';


export interface ColumnDef {
  columnId: string;
  columnName: string;
}


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatPaginatorModule, MatMenuModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() pageSizeOptions: number[] = [5, 10, 25];

  @Input() heigth: string = '275px';

  @Input() displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'name', columnName: 'Nombre' },
    { columnId: 'family', columnName: 'Familia' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  @Input() dataSource = new MatTableDataSource<any>([
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  // Para simplificar el acceso a los IDs de columnas
  get columnIds() {
    return this.displayedColumns.map(col => col.columnId).concat('actions');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.tableContainer.nativeElement.style.maxHeight = this.heigth;
  }

  constructor() {
    // Definir el filtro personalizado
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const dataStr = Object.values(data).join(' ').toLowerCase();
      return dataStr.includes(filter);
    };

  }


  // ngOnChanges(changes: SimpleChanges){
  //   if(changes['heigth']){
  //     this.tableContainer.nativeElement.style.maxHeight = this.heigth;
  //   }
  // }

  // Método para filtrar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  getStatusStyle(status: string) {
    if (status === 'Habilitado') {
      return {
        'background-color': '#c3e6cb',  // Fondo más oscuro
        'color': '#155724',            // Texto
        'padding': '5px 10px',         // Padding alrededor del texto
        'border-radius': '10px'         // Bordes redondeados
      };
    } else if (status === 'Deshabilitado') {
      return {
        'background-color': '#f5c6cb',
        'color': '#721c24',
        'padding': '5px 10px',
        'border-radius': '10px'
      };
    }
    return {};
  }
  
  getStatusIcon(status: string) {
    return status === 'Habilitado' ? 'bi bi-check-circle' : 'bi bi-x-circle';
  }

  getAllergenImage(allergen: string): any {
    const allergenImages: { [key: string]: string } = {
      'gluten': 'assets/alergenos/gluten.png',
      'lactosa': 'assets/alergenos/lacteo.png',
      'altramuces': 'assets/alergenos/altramuces.png',
      'apio': 'assets/alergenos/apio.png',
      'cacahuetes': 'assets/alergenos/cacahuetes.png',
      'crustaceos': 'assets/alergenos/crustaceos.png',
      'cascara': 'assets/alergenos/cascara.png',
      'mostaza': 'assets/alergenos/mostaza.png',
      'pescado': 'assets/alergenos/pescado.png',
      'sesamo': 'assets/alergenos/sesamo.png',
      'soja': 'assets/alergenos/soja.png',
      'dioxido-azufre': 'assets/alergenos/dioxido-azufre.png',
      'moluscos': 'assets/alergenos/moluscos.png',
    };
    return allergenImages[allergen] || 'path/to/default-icon.png'; // Imagen por defecto si no se encuentra
  }
  

  editElement(element: any) {
    // Lógica para editar el elemento
    console.log('Edit:', element);
  }

  deleteElement(element: any) {
    // Lógica para eliminar el elemento
    console.log('Delete:', element);
  }
}
