import { Component } from '@angular/core';
import { ManagerSideBarComponent } from './manager-side-bar/manager-side-bar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-management-panel',
  standalone: true,
  imports: [ManagerSideBarComponent, RouterModule],
  templateUrl: './management-panel.component.html',
  styleUrl: './management-panel.component.css'
})
export class ManagementPanelComponent {



  ngOnInit(): void {

  }
}
