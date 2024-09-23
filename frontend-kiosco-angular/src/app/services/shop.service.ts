import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  getLogo(){
    return 'assets/shop/Kairo.PNG';
  }
}
