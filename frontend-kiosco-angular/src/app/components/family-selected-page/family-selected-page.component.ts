import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FamilyService } from '../../services/family.service';

@Component({
  selector: 'app-family-selected-page',
  standalone: true,
  imports: [],
  templateUrl: './family-selected-page.component.html',
  styleUrl: './family-selected-page.component.css'
})
export class FamilySelectedPageComponent {
  family: any;

  constructor(
    private route: ActivatedRoute,
    private familyService: FamilyService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // this.family = this.familyService.getFamilyById(id);
  }
}