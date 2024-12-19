import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FamilyService } from '../../services/family.service';
import { KioskService } from '../../services/kiosk/kiosk.service';
import { SnackbarService } from '../../services/snackBar/snackbar.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-consumption-option',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './consumption-option.component.html',
  styleUrl: './consumption-option.component.css',
})
export class ConsumptionOptionComponent {
  @Input() consumptionOption!: ConsumptionOption;

  @Input() dataLoaded!: boolean;
  
  noPhotoOptionSrc: string = '../../../assets/svg/image.svg';
  firstFamilyId!: string;

  constructor(
    private cartService: OrderService,
    public familyService: FamilyService,
    public kioscoService: KioskService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}
  

  selectConsumptionOption(consumptionOption: string) {
    if(this.dataLoaded){
      this.cartService.setConsumptionOption(consumptionOption);
      this.router.navigate(['/kiosco', this.kioscoService.num_serie, 'products-selection', 'family', this.familyService.getFirstFamilyId()])
    } else {
      this.snackbarService.openSnackBar('Espere a que se carguen los datos.', 'Cerrar');
    }
    
  }
}
