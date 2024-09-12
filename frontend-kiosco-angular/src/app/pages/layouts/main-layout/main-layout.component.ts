import { Component } from '@angular/core';
import { SideBarComponent } from '../../../components/side-bar/side-bar.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from '../../../components/cart/cart.component';
import { InactivityService } from '../../../services/inactive-service/inactive.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SideBarComponent, FooterComponent, RouterModule, CartComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(private inactiveService : InactivityService) { }

    addedReducedMovility: boolean = false;
}
