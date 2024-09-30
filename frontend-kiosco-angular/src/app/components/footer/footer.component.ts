import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScreenService } from '../../services/screen/screen.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  notAppears: boolean = false;

  constructor(
    public screenService : ScreenService) {}


  
}
