import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { User, UserWithoutPassword } from '../../../../interfaces/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  incorrectUser: boolean = false;

  users : User[] = [
    { username: 'admin', password: 'admin', name: 'Admin', rol: 'admin' },
    { username: 'eduardokong', password: 'user12', name: 'Eduardo', rol: 'Comercial' },
  ];

  constructor(
    private router : Router,
    private userService : UserService
  ) { }

  // Método para cambiar el tipo de input de la contraseña
  changeInputType() {
    const input = document.getElementById("passwd") as HTMLInputElement;
    const imgEye = document.getElementById("eye") as HTMLImageElement;
    
    if (input.type === "password") {
      input.type = "text";
      imgEye.src = "assets/eye-slash-fill.svg";
    } else {
      input.type = "password";
      imgEye.src = "assets/eye-fill.svg";
    }
  }

  // Método para gestionar el inicio de sesión
  login(event: Event) {
    event.preventDefault();
    
    const foundUser : UserWithoutPassword = this.users.find(user => 
      user.username === this.username && user.password === this.password
    )!;


    
    if (foundUser) {
      // Si las credenciales son correctas
      this.incorrectUser = false;
      this.userService.saveUser(foundUser);
      // Aquí puedes redirigir a otro componente o realizar la acción que necesites
      this.router.navigate(['/management-panel']);
    } else {
      // Si las credenciales son incorrectas
      this.incorrectUser = true;
    }
  }
}
