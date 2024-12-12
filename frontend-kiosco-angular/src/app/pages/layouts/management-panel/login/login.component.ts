import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { User, UserWithoutPassword } from '../../../../interfaces/user';
import { ProductService } from '../../../../services/product.service';
import { FamilyService } from '../../../../services/family.service';
import { forkJoin } from 'rxjs';
import { GroupService } from '../../../../services/group/group.service';
import { ButtonSpinnerComponent } from '../../../../components/button-spinner/button-spinner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonSpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  incorrectUser: boolean = false;
  loadingLogin: boolean = false;

  constructor(
    private router : Router,
    private userService : UserService,
    private productsService : ProductService,
    private familyService : FamilyService,
    private groupsService : GroupService
  ) { }

  // Método para cambiar el tipo de input de la contraseña
  changeInputType() {
    const input = document.getElementById("passwd") as HTMLInputElement;
    const imgEye = document.getElementById("eye") as HTMLImageElement;
    
    if (input.type === "password") {
      input.type = "text";
      imgEye.src = "assets/svg/eye-slash-fill.svg";
    } else {
      input.type = "password";
      imgEye.src = "assets/svg/eye-fill.svg";
    }
  }

  // Método para gestionar el inicio de sesión
  login(event: Event) {
    this.loadingLogin = true;
    event.preventDefault();
    
    this.userService.login(this.username, this.password).subscribe({
      next: (response : any) => {
        const user: UserWithoutPassword = response.user;
        this.handleLogin(user);
      },
      error: (error) => {
        console.log(error);
        this.loadingLogin = false;
        this.incorrectUser = true;
      }
    });
  }

  handleLogin(user: UserWithoutPassword) {
     // Si las credenciales son correctas
     this.incorrectUser = false;
     this.userService.saveUser(user);
     this.userService.clienteId = user.cliente_id;
     forkJoin({
       products: this.productsService.getProductsObservable(user.cliente_id),
       families: this.familyService.getFamiliesObservable(user.cliente_id),
       groups: this.groupsService.getGroupsObservable()
     }).subscribe({
       next: ({ products, families, groups }) => {
         if (products) {
           this.productsService.products = products;
           console.log(products);
         }
         if (families) {
           this.familyService.families = families;
           console.log(families);
         }
         if(groups) {
           this.groupsService.groups = groups;
           console.log(groups);
         }
         
       },
       error: (error) => {
         console.log(error);
         this.router.navigate(['/management-panel']);
       },
       complete: () => {
         this.router.navigate(['/management-panel']);
       }
     });
  }
}
