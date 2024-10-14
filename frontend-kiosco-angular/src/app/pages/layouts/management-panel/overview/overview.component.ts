import { Component } from '@angular/core';
import { OverviewGraphComponent } from './overview-graph/overview-graph.component';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [OverviewGraphComponent, TableComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {

}
