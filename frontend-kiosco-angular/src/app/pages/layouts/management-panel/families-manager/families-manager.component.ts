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

  
  openFamilyModal(productId: number | null = null): void {
    const dialogRef = this.dialog.open(FamilyModalComponent, {
      width: '700px',
      data: { productId: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Datos recibidos del modal:', result);
        console.log('ID de la familia:', productId);
        if (productId) {
          this.updateFamily(productId, result);
        } else {
          this.addFamily(result);
        }
      }
    });
  }

  addFamily(familyData: any) {
    // Generar un ID único corto para el nuevo producto
    const newId = (this.familyService.families.length + 1).toString();
  
    // Crear un nuevo producto a partir de los datos del formulario
    const newProduct = {
      id: newId,
      name: familyData.name,
      img: 'assets/sandwich.png', // La URL de la imagen que ya has obtenido
    };
  
    // Agregar el nuevo producto al array de productos
    this.familyService.families.push(newProduct);
    this.familyService.addFamily(newProduct).subscribe(
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

  updateFamily(familyId: number, familyData: any) {
    // this.familyService.updateFamily(familyId, familyData);
  }
}
