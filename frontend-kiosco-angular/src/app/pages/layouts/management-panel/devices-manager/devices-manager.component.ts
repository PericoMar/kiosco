import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';
import { MatDialog } from '@angular/material/dialog';
import { DeviceModalComponent } from '../modals/device-modal/device-modal.component';
import { CommonModule } from '@angular/common';
import { KioskModalComponent } from '../modals/kiosk-modal/kiosk-modal.component';
import { DataphoneModalComponent } from '../modals/dataphone-modal/dataphone-modal.component';
import { PaymentService } from '../../../../services/payment/payment.service';
import { Subscription } from 'rxjs';
import { KioskService } from '../../../../services/kiosk/kiosk.service';

@Component({
  selector: 'app-devices-manager',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './devices-manager.component.html',
  styleUrl: './devices-manager.component.css'
})
export class DevicesManagerComponent {
  pageSizeOptions: number[] = [10, 20, 50];
  heigth: string = '60%';

  private dataphoneChangesSubscription!: Subscription;

  displayedColumns!: { columnId: string, columnName: string }[];
  dataSource!: MatTableDataSource<any>;
  deviceName!: string;
  deviceType!: string;

  loadingData: boolean = false;

  constructor(
    private dialog: MatDialog,
    private paymentService: PaymentService,
    private kioscoService: KioskService
  ) {}

  ngOnInit() {
    const deviceType = this.getDeviceTypeFromRoute(); // Determina el tipo de dispositivo desde la ruta.
    this.refreshTable(deviceType);

    this.dataphoneChangesSubscription = this.paymentService.dataphoneChanged$.subscribe(changes => {
      this.refreshTable(changes.type);  // Llamar a la función para recargar la tabla
    });
  }

  // Método para determinar el tipo de dispositivo desde la ruta actual.
  getDeviceTypeFromRoute(): string {
    const currentRoute = window.location.pathname; // Ruta actual
    if (currentRoute.includes('printers')) return 'printer';
    if (currentRoute.includes('dataphones')) return 'dataphone';
    if (currentRoute.includes('kiosks')) return 'kiosk';
    return 'unknown';
  }

  refreshTable(deviceType: string) {
    console.log('Recargar tabla según el tipo de dispositivo:', deviceType);
    this.loadingData = true;
    this.deviceType = deviceType

    setTimeout(() => {
      if (deviceType === 'printer') {
        // Configuración de columnas y datos para impresoras
        this.deviceName = 'Impresoras';

        this.displayedColumns = [
          { columnId: 'id', columnName: 'Codigo' },
          { columnId: 'name', columnName: 'Nombre' },
          { columnId: 'printer', columnName: 'Impresora / IP' },
          { columnId: 'area', columnName: 'Zona' },
          { columnId: 'desc', columnName: 'Descripción' },
          { columnId: 'status', columnName: 'Estado' }
        ];

        this.dataSource = new MatTableDataSource<any>([
          { id: 1, name: 'PASE', printer: 'XP-80C', area: 'Kiosco', desc: 'Impresora del kiosco', status: 'Habilitado' },
          { id: 2, name: 'FRIO', printer: '192.010.234.211', area: 'Cocina', desc: 'Impresora de la cocina', status: 'Habilitado' }
        ]);
      } else if (deviceType === 'dataphone') {
        // Configuración de columnas y datos para datáfonos
        this.deviceName = 'Datafonos';

        this.displayedColumns = [
          { columnId: 'id', columnName: 'Código' },
          { columnId: 'nombre', columnName: 'Nombre' },
          { columnId: 'num_serie', columnName: 'Número de Serie' },
          { columnId: 'TID', columnName: 'TID' },
          { columnId: 'estado', columnName: 'Estado' },
          { columnId: 'supervisor', columnName: 'Cod. supervisor' },
          { columnId: 'devoluciones', columnName: 'Uso' },
          { columnId: 'descripcion', columnName: 'Descripción' }
        ];

        this.dataSource = new MatTableDataSource<any>(this.paymentService.getDataphonesData());
      } else if (deviceType === 'kiosk') {
        // Configuración de columnas y datos para kioscos
        this.deviceName = 'Kioscos';

        this.displayedColumns = [
          { columnId: 'id', columnName: 'Código' },
          { columnId: 'nombre', columnName: 'Nombre' },
          { columnId: 'num_serie', columnName: 'Número de Serie' },
          { columnId: 'datafono', columnName: 'Datáfono (Nombre - Nº serie)' },
          { columnId: 'estado', columnName: 'Estado' },
        ];

        const dataSource = this.kioscoService.getKioscosData();
        // Recorrer el dataSource y añadir el nombre y número de serie del datáfono
        dataSource.forEach((kiosco: any) => {
          kiosco.datafono = this.paymentService.dataphoneToString(kiosco.datafono_id);
        });
        this.dataSource = new MatTableDataSource<any>(dataSource);
      } else {
        // Caso por defecto
        console.warn('Tipo de dispositivo desconocido. No se cargaron datos.');
        this.displayedColumns = [];
        this.dataSource = new MatTableDataSource<any>([]);
      }

      this.loadingData = false;
    }, 1000);
  }

  openDeviceModal(productId: number | null = null): void {
    if(this.deviceType == 'printer'){
      const dialogRef = this.dialog.open(DeviceModalComponent, {
        width: '700px',
        data: { productId: productId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.reload) this.refreshTable(this.deviceType);
      });

    } else if(this.deviceType == 'dataphone'){
      const dialogRef = this.dialog.open(DataphoneModalComponent, {
        width: '700px',
        data: { productId: productId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.reload) this.refreshTable(this.deviceType);
      });

    } else if(this.deviceType == 'kiosk') {
      console.log('Abrir modal de kiosco');
      const dialogRef = this.dialog.open(KioskModalComponent, {
        width: '700px',
        data: { productId: productId }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.reload) this.refreshTable(this.deviceType);
      });

    }
  }
}
