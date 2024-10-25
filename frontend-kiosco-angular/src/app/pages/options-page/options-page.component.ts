import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConsumptionOptionComponent } from '../../components/consumption-option/consumption-option.component';
import { ConsumptionOption } from '../../interfaces/consumption-option';
import { LanguageOption } from '../../interfaces/language-option';
import { LanguageOptionComponent } from '../../components/language-option/language-option.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AdvertComponent } from '../../components/advert/advert.component';
import { ScreenService } from '../../services/screen/screen.service';

@Component({
  selector: 'app-options-page',
  standalone: true,
  imports: [ConsumptionOptionComponent, LanguageOptionComponent,FooterComponent, AdvertComponent],
  templateUrl: './options-page.component.html',
  styleUrl: './options-page.component.css'
})
export class OptionsPageComponent {
  // constructor (private translate: TranslateService) {
  //   this.translate.setDefaultLang('es');
  // }

  showAdvert: boolean = true;

  constructor(public screenService: ScreenService) {      
    this.showAdvert = true;
  }
  

  advert : string = "¡Bienvenido a nuestro kiosco!";

  consumptionOptions : ConsumptionOption[] = [
    {
      name: "comer_aqui",
      title: "Comer aquí",
      img: "../../../assets/Fork_spoon_dish_icon__outline_style-removebg-preview.png"
    },
    {
      name: "llevar",
      title: "Llevar",
      img: "../../../assets/3479191-200.png"
    }
  ];

  languageOptions : LanguageOption[] = [
    {
      name: "Español",
      img: "../../../assets/flag-for-flag-spain.svg"
    },
    {
      name: "English",
      img: "../../../assets/flag-for-flag-united-kingdom.svg"
    }
  ]

  quitAdvert() {
    this.screenService.setDefaultScreenHeight();
    this.showAdvert = false;
  }
  
}
