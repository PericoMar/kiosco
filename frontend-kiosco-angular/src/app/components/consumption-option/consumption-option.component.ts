import { Component, Input } from '@angular/core';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-consumption-option',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './consumption-option.component.html',
  styleUrl: './consumption-option.component.css'
})
export class ConsumptionOptionComponent {
  @Input() consumptionOption! : ConsumptionOption;
  noPhotoOptionSrc : string = "../../../assets/image.svg";

  constructor (private orderService : OrderService){
    
  }

  safeConsumptionOption(consumptionOption: string){
    this.orderService.setConsumptionOption(consumptionOption);
  }

}
