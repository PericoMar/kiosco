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
export class ConsumptionOptionComponent implements OnInit {
  @Input() consumptionOption!: ConsumptionOption;
  noPhotoOptionSrc: string = '../../../assets/image.svg';
  firstFamilyId!: string;

  constructor(
    private cartService: OrderService,
    private familyService: FamilyService,
    private productsService: ProductService
  ) {}

  ngOnInit() {
    /* Se obtiene aquí porque es el inicio del flujo.
    Asi se evita llamar constantemente a la DB */
    this.getAllData();
  }

  getAllData(): void {
    this.familyService.getFamiliesObservable().subscribe({
      next: (response) => {
        if (response) {
          this.familyService.families = response;
          this.firstFamilyId = this.familyService.getFirstFamilyId();
        }
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.firstFamilyId = this.familyService.getFirstFamilyId();

    this.productsService.getProductsObservable().subscribe({
      next: (response) => {
        if (response) {
          this.productsService.products = response;
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  safeConsumptionOption(consumptionOption: string) {
    this.cartService.setConsumptionOption(consumptionOption);
  }
}
