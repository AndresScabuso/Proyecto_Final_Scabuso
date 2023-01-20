import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent {
    
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {}

  checkIsAdmin() {
    return this.authService.isAdmin();
  }
}
