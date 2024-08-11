import { Component, Inject, Injectable, Input } from '@angular/core';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';

@Injectable({
  providedIn: "root",
})

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

  constructor (private cartService : OrderService){
    
  }

  safeConsumptionOption(consumptionOption: string){
    this.cartService.setConsumptionOption(consumptionOption);
  }

}
