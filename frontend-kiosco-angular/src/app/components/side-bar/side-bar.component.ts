import { Component } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { Family } from '../../interfaces/family';
import { FamilyComponent } from '../family/family.component';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [FamilyComponent],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  families!: Family[];

  constructor (private familyService : FamilyService) {
    this.families = this.familyService.getFamilies()
  }
}
