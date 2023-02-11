import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private authService: AuthService) {}

  getCurrentUser() {
    return this.authService.loggedUser().email;
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('loggedUser');
  }
}
