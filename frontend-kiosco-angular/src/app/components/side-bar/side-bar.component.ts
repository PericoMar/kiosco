import { Component } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../interfaces/family';
import { FamilyComponent } from '../family/family.component';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FamilyComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  families!: Family[];
  idFamilySelected: any = '';
  logoImg: string;

  constructor(
    private familyService: FamilyService,
    private shopService: ShopService
  ) {
    this.familyService.getFamiliesObservable().subscribe({
      next: (response) => (this.families = response),
      error: (error) => console.log(error),
    });

    this.logoImg = this.shopService.getLogo();
  }
}
