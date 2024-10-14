import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TranslateModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-kiosco-angular';

  @HostListener('document:contextmenu', ['$event'])
  onRightClick(event: MouseEvent): void {
    event.preventDefault();
  }
}
