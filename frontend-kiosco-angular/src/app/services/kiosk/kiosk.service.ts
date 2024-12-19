import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../../config/app-config';
import { Observable, Subject } from 'rxjs';
import { Kiosco } from '../../interfaces/kiosco';
import { KioskModalComponent } from '../../pages/layouts/management-panel/modals/kiosk-modal/kiosk-modal.component';
import { DeleteModalComponent } from '../../pages/layouts/management-panel/modals/delete-modal/delete-modal.component';
import { SnackbarService } from '../snackBar/snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentService } from '../payment/payment.service';

@Injectable({
  providedIn: 'root'
})
export class KioskService {

  readonly KIOSCO_KEY = 'kiosco';
  readonly KIOSCOS_KEY = 'kioscos';
  
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
  ) { }
  
  private kioscoChangedSource = new Subject<any>();
  kioscoChanged$ = this.kioscoChangedSource.asObservable();
  
  emitKioscoChange(changes: any): void {
    this.kioscoChangedSource.next(changes);
  }

  getKioscoByNumSerie(numSerie: string): any {
    return this.http.get(`${AppConfig.API_URL}/kiosko/${numSerie}`);
  }

  get num_serie(): string {
    return this.kiosco.num_serie;
  }
  
  // Observables
  getKioscosObservable(cliente_id: number): Observable<Kiosco[]> {
    return this.http.get<Kiosco[]>(`${AppConfig.API_URL}/kioskos/${cliente_id}`);
  }
  
  addKioscoObservable(kiosco: Kiosco): Observable<any> {
    return this.http.post(`${AppConfig.API_URL}/kiosko`, { ...kiosco });
  }
  
  updateKioscoObservable(kiosco: Kiosco): Observable<any> {
    return this.http.put(`${AppConfig.API_URL}/kiosko/${kiosco.id}`, { ...kiosco });
  }
  
  deleteKioscoObservable(id: number): Observable<any> {
    return this.http.delete(`${AppConfig.API_URL}/kiosko/${id}`);
  }
  
  // Local Storage Handlers
  get kiosco(): Kiosco {
    return JSON.parse(localStorage.getItem(this.KIOSCO_KEY) || '{}');
  }
  
  set kiosco(kiosco: Kiosco) {
    localStorage.setItem(this.KIOSCO_KEY, JSON.stringify(kiosco));
  }
  
  get kioscos(): Kiosco[] {
    return JSON.parse(localStorage.getItem(this.KIOSCOS_KEY) || '[]');
  }
  
  set kioscos(kioscos: Kiosco[]) {
    localStorage.setItem(this.KIOSCOS_KEY, JSON.stringify(kioscos));
  }
  
  addKiosco(kiosco: Kiosco): void {
    this.kioscos = [...this.kioscos, kiosco];
  }
  
  updateKiosco(kiosco: Kiosco): void {
    this.deleteKiosco(kiosco.id);
    this.addKiosco(kiosco);
  }
  
  deleteKiosco(id: number): void {
    this.kioscos = this.kioscos.filter((k) => k.id !== id);
  }
  
  // Modales
  openKioscoModal(kiosco: Kiosco): void {
    const dialogRef = this.dialog.open(KioskModalComponent, {
      width: '700px',
      data: { ...kiosco },
    });
  
    dialogRef.afterClosed().subscribe((result : any) => {
      if (result?.reload) {
        this.emitKioscoChange({ type: 'kiosk' });
      }
    });
  }
  
  openDeleteKioscoModal(kiosco: Kiosco): void {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      width: '500px',
      data: { productType: 'Kiosco', name: kiosco.nombre, id: kiosco.id },
    });
  
    dialogRef.afterClosed().subscribe((result : any) => {
      if (result) {
        this.deleteKiosco(kiosco.id);
  
        this.deleteKioscoObservable(kiosco.id).subscribe({
          next: () => {
            this.emitKioscoChange({ type: 'kiosk' });
            this.snackbarService.openSnackBar(
              `Kiosco eliminado correctamente`,
              'Cerrar',
              3000,
              ['custom-snackbar', 'success-snackbar']
            );
          },
          error: (error) => {
            console.error('Error al eliminar kiosco', error);
          },
        });
      }
    });
  }
  
  // Mapeo de Kiosco Data
  getKioscosData(): any[] {
    return this.kioscos.map((kiosco) => ({
      id: kiosco.id,
      nombre: kiosco.nombre,
      num_serie: kiosco.num_serie,
      estado: kiosco.estado ? 'Habilitado' : 'Deshabilitado',
      zona: kiosco.zona,
      datafono_id: kiosco.datafono_id,
      type: 'kiosco',
    }));
  }
  
}
