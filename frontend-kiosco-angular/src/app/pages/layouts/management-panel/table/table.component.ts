import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

interface DataItem {
  id: number;
  name: string;
  status: string;
}


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource: DataItem[] = [
    { id: 1, name: 'Producto A', status: 'Disponible' },
    { id: 2, name: 'Producto B', status: 'No disponible' },
    { id: 3, name: 'Producto C', status: 'Disponible' },
  ];
}
