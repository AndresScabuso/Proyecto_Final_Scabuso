import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

constructor(private readonly dialogService: MatDialog, private service: UsersService, private authService: AuthService, private snackBar: MatSnackBar) {
  if(this.isAdmin()) {
    this.displayedColumns.push('edit');
    this.displayedColumns.push('delete');
  }
}

ngOnInit(): void {
  this.getAll();
}

getAll() {
  this.service.getUsers().subscribe((users) => {
    this.users = users;
  });
}

// Modifica un usuario
editUser(user: User) {
  const dialog = this.dialogService.open(UserDialogComponent, { data: user, width: '60%' });
  dialog.afterClosed().subscribe((value) => {
    if (value) {
      this.service.updateUser(value, user.id).subscribe({
        next: () => {
          this.getAll();
          this.snackBar.open('Usuario modificado con éxito.', 'Done');
        }
      });
    }
  })
}

// Elimina un usuario
removeUser(user: User) {
  this.service.deleteUserById(user.id).subscribe({
    next: () => {
      this.getAll();
      this.snackBar.open('Usuario eliminado con éxito.', 'Done');
    }
  });
}

details(user: User) {
  this.dialogService.open(UserDetailsComponent, { data: user });
}

isAdmin(): boolean {
  return this.authService.isAdmin();
}
}
