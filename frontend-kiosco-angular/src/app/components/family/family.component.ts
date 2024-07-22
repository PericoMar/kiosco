import { Component, Input } from '@angular/core';
import { Family } from '../../interfaces/family';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  @Input() family!: Family;
}
