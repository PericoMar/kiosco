import { Component, Input } from '@angular/core';
import { Family } from '../../interfaces/family';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-family',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './family.component.html',
  styleUrl: './family.component.css'
})
export class FamilyComponent {
  @Input() family!: Family;
  familyId: any = '';
  familyIsSelected: boolean = false;


  constructor(private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.router.events.subscribe(params => {
      this.familyIsSelected = this.route.snapshot.firstChild?.paramMap.get('id') == this.family.id;
    }); 
  }

}
