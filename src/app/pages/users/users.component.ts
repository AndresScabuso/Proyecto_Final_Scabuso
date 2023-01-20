import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { User } from 'src/app/core/models/user.interface';
import { UsersService } from 'src/app/services/users/users.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
// Usuarios
public users: User[];

// Columnas que se van a mostrar en la tabla
displayedColumns = ['id', 'details', 'email'];

constructor(private readonly dialogService: MatDialog, private service: UsersService, private authService: AuthService) {
  if(this.isAdmin()) {
    this.displayedColumns.push('edit');
    this.displayedColumns.push('delete');
  }
}

ngOnInit(): void {
  this.service.getUsers().subscribe((users) => {
    this.users = users;
  });
}

// Modifica un usuario
editUser(user: User) {
  const dialog = this.dialogService.open(UserDialogComponent, { data: user, width: '60%' });
  dialog.afterClosed().subscribe((value) => {
    if (value) {
      this.service.updateUser(value, user.id);
    }
  })
}

// Elimina un usuario
removeUser(user: User) {
  this.service.deleteUserById(user.id);
}

details(user: User) {
  this.dialogService.open(UserDetailsComponent, { data: user });
}

isAdmin(): boolean {
  return this.authService.isAdmin();
}
}
