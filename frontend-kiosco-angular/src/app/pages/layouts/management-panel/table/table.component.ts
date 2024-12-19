import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { ProductService } from '../../../../services/product.service';
import { FamilyService } from '../../../../services/family.service';
import { SpinnerComponent } from '../../../../components/spinner/spinner.component';
import { PaymentService } from '../../../../services/payment/payment.service';
import { KioskService } from '../../../../services/kiosk/kiosk.service';


export interface ColumnDef {
  columnId: string;
  columnName: string;
}


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatFormFieldModule, MatButtonModule, MatPaginatorModule, MatMenuModule, SpinnerComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() bigTable: boolean = false;

  @Input() loadingData: boolean = false;

  @Input() pageSizeOptions: number[] = [5, 10, 25];

  @Input() heigth: string = '320px';

  @Input() displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'productType', columnName: 'Tipo' },
    { columnId: 'name', columnName: 'Nombre / Texto' },
    // { columnId: 'price', columnName: 'Tarifa' },
    { columnId: 'family', columnName: 'Familia / Grupo / Producto' },
    { columnId: 'allergens', columnName: 'Alergenos' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  @Input() dataSource! : MatTableDataSource<any>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild('tableContainer') tableContainer!: ElementRef;

  // Para simplificar el acceso a los IDs de columnas
  get columnIds() {
    return this.displayedColumns.map(col => col.columnId).concat('actions');
  }

  // ngOnInit() {
  //   this.dataSource = new MatTableDataSource<any>([]);
  //   // Definir el filtro personalizado
  //   this.dataSource.filterPredicate = (data: any, filter: string) => {
  //     const dataStr = Object.values(data).join(' ').toLowerCase();
  //     return dataStr.includes(filter);
  //   };

  // }

  ngAfterViewInit() {
    // Asigna el paginator después de que las vistas hayan sido inicializadas
    this.dataSource.paginator = this.paginator;
    this.tableContainer.nativeElement.style.maxHeight = this.heigth;
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource) {
      console.log('Cambios en la fuente de datos');
      console.log(changes['dataSource']);
      console.log(this.dataSource);
      // Set Timeout de 1 segundo
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 100);
    }
  }

  constructor(
    private productService: ProductService,
    private familyService: FamilyService,
    private paymentService: PaymentService,
    private kioscoService: KioskService
  ) {
  }


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
      'huevos': 'assets/alergenos/huevos.png',
    };
    return allergenImages[allergen] || 'path/to/default-icon.png'; // Imagen por defecto si no se encuentra
  }
  

  editElement(element: any): void {
    switch (element.type) {
      case 'familia':
        this.familyService.openFamilyModal(element.id);
        break;
      case 'dispositivo':
        this.openDispositivoModal(element);
        break;
      case 'producto':
        this.productService.openProductModal(element);
        break;
      case 'datafono':
        this.paymentService.openDataphoneModal(element);
        break;
      case 'kiosco':
        this.kioscoService.openKioscoModal(element);
        break;
      default:
        console.error('Tipo de elemento desconocido');
    }
  }
  
  deleteElement(element: any): void {
    switch (element.type) {
      case 'familia':
        this.familyService.openDeleteFamilyModal(element);
        break;
      case 'dispositivo':
        this.deleteDispositivo(element);
        break;
      case 'producto':
        this.productService.openDeleteProductModal(element);
        break;
      case 'datafono':
        this.paymentService.openDeleteDataphoneModal(element);
        break;
      case 'kiosco':
        this.kioscoService.openDeleteKioscoModal(element);
        break;
      default:
        console.error('Tipo de elemento desconocido');
    }
  }

  openDispositivoModal(dispositivoId: number | null = null): void {
    // const dialogRef = this.dialog.open(ProductModalComponent, {
    //   width: '700px',
    //   data: { productId: dispositivoId }
    // });
  }

  deleteDispositivo(dispositivo: any): void {
    // this.productService.openDeleteProductModal(dispositivo);
  }
}
