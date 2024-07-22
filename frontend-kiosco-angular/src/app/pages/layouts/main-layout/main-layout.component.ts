import { Component } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SideBarComponent, FooterComponent, RouterModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  
}
