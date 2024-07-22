import { Component, Input } from '@angular/core';
import { LanguageOption } from '../../interfaces/language-option';

@Component({
  selector: 'app-language-option',
  standalone: true,
  imports: [],
  templateUrl: './language-option.component.html',
  styleUrl: './language-option.component.css'
})
export class LanguageOptionComponent {
  @Input() languageOption! : LanguageOption;

  
}
