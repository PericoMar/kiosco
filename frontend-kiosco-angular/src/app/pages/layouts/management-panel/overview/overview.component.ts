import { Component } from '@angular/core';
import { OverviewGraphComponent } from './overview-graph/overview-graph.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewGraphComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
