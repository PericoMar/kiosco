import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-devices-manager',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './devices-manager.component.html',
  styleUrl: './devices-manager.component.css'
})
export class DevicesManagerComponent {
  pageSizeOptions: number[] = [10, 20 ,50];

  heigth: string = '60%';

  displayedColumns: { columnId: string, columnName: string }[] = [
    { columnId: 'id', columnName: 'Codigo' },
    { columnId: 'name', columnName: 'Nombre' },
    { columnId: 'printer', columnName: 'Impresora / IP' },
    { columnId: 'area', columnName: 'Zona' },
    { columnId: 'desc', columnName: 'Descripción' },
    { columnId: 'status', columnName: 'Estado' },
  ];

  dataSource = new MatTableDataSource<any>([
    { id: 1, name: 'PASE', printer: 'XP-80C', area: 'Kiosco', desc: 'Impresora del kiosco', status: 'Habilitado' },
    { id: 2, name: 'FRIO', printer: '192.010.234.211', area: 'Cocina', desc: 'Impresora de la cocina', status: 'Habilitado' },
    
    // Nuevas impresoras
    { id: 3, name: 'CALIENTE', printer: 'HP-LaserJet-1018', area: 'Oficina', desc: 'Impresora de la oficina.', status: 'Deshabilitado' },
    { id: 4, name: 'RECEPCION', printer: 'Canon-iR-ADV-C3525', area: 'Recepción', desc: 'Impresora de la recepción', status: 'Habilitado' },
    { id: 5, name: 'ALMACEN', printer: 'Brother-HL-L2370DW', area: 'Almacén', desc: 'Impresora del almacén', status: 'Habilitado' },
    { id: 6, name: 'CAJA', printer: 'Epson-TM-T20II', area: 'Caja', desc: 'Impresora de tickets', status: 'Habilitado' },
    { id: 7, name: 'SOPORTE', printer: 'Samsung-CLP-365W', area: 'Soporte', desc: 'Impresora del equipo de soporte', status: 'Deshabilitado' },
    { id: 8, name: 'DIRECCION', printer: 'Lexmark-MS431dn', area: 'Dirección', desc: 'Impresora de la dirección', status: 'Habilitado' },
    
    // Nuevos datáfonos
    { id: 9, name: 'DAT-KIOSCO-1', printer: 'Verifone-VX680', area: 'Kiosco', desc: 'Datáfono del kiosco', status: 'Habilitado' },
    { id: 10, name: 'DAT-KIOSCO-2', printer: 'Ingenico-iWL250', area: 'Kiosco', desc: 'Datáfono del kiosco', status: 'Habilitado' },
    { id: 11, name: 'DAT-KIOSCO-3', printer: 'Pax-S920', area: 'Kiosco', desc: 'Datáfono del kiosco', status: 'Habilitado' },
    { id: 12, name: 'DAT-KIOSCO-4', printer: 'Verifone-VX520', area: 'Kiosco', desc: 'Datáfono del kiosco', status: 'Habilitado' }
]);


  openDeviceModal(productId: number | null = null): void {
    console.log('Abrir modal de producto con ID:', productId);
  }
}
