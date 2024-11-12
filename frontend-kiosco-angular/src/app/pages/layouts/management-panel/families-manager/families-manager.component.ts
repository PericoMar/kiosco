import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { FamilyModalComponent } from '../modals/family-modal/family-modal.component';
import { FamilyService } from '../../../../services/family.service';

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
    { columnId: 'printers', columnName: 'Impresoras' },
    // { columnId: 'products', columnName: 'Nº productos' },
    { columnId: 'desc', columnName: 'Descripción' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(private dialog : MatDialog,
    private familyService: FamilyService
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>(this.familyService.getFamiliesData());
  
  }

  openFamilyModal(){
    this.familyService.openFamilyModal();
  }
}
