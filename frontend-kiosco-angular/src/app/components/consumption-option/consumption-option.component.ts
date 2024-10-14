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
    //Se obtiene aqui porque es el inicio del flujo.
    this.getAllData();
  }

  getAllData():void{
    this.familyService.getFamiliesObservable().subscribe({
      next: (response) => {
        this.familyService.families = response;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () =>
        (this.firstFamilyId = this.familyService.getFirstFamilyId()),
    });

    this.productsService.getProductsObservable().subscribe({
      next: (response) => {
        console.log(response);
        this.productsService.products = response;
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
