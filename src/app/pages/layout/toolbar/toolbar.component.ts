import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private userService: UsersService, private authService: AuthService) {}

  getCurrentUser() {
    return this.authService.loggerUser().email;
  }

  logout() {
    this.authService.logout();
  }
}
