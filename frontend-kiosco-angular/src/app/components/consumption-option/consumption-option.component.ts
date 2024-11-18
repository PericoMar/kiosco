import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { FamilyService } from '../../services/family.service';
import { ProductService } from '../../services/product.service';

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
  noPhotoOptionSrc: string = '../../../assets/svg/image.svg';
  firstFamilyId!: string;

  constructor(
    private cartService: OrderService,
    public familyService: FamilyService,
  ) {}
  

  safeConsumptionOption(consumptionOption: string) {
    this.cartService.setConsumptionOption(consumptionOption);
  }
}
