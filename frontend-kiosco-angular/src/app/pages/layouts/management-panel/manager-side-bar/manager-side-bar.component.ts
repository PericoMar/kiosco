import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { User, UserWithoutPassword } from '../../../../interfaces/user';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-manager-side-bar',
  standalone: true,
  imports: [RouterModule, MatMenuModule],
  templateUrl: './manager-side-bar.component.html',
  styleUrl: './manager-side-bar.component.css'
})
export class ManagerSideBarComponent implements OnInit {
  user! : UserWithoutPassword;

  constructor(private userService : UserService,
    private router : Router
  ) { }

  ngOnInit() {
    this.user = this.userService.getUser()!;
  }

  logout() {
    this.userService.removeUser();
    this.router.navigate(['/login']);
  }
}
