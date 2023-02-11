import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth/services/auth.service';
import { Inscription } from 'src/app/models/Inscription';
import { InscriptionsService } from 'src/app/services/inscriptions/inscriptions.service';
import { InscriptionDialogComponent } from './inscription-dialog/inscription-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {
  // Inscripciones
  public inscriptions: Inscription[];

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'studentId', 'student', 'courseId', 'course', 'isActive'];

  constructor(private readonly dialogService: MatDialog, public service: InscriptionsService, private authService: AuthService, private snackBar: MatSnackBar) { 
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }  
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getInscriptions().subscribe((inscriptions) => {
      this.inscriptions = inscriptions;
    });  
  }
  // Agrega un alumno
  addInscription() {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveInscription(value).subscribe({
          next: () => {
          this.getAll();
          this.snackBar.open('Inscripción realizada con éxito.', 'Done');
          }
        });
      }
    })
  }
  
  // Modifica un alumno
  editInscription(inscription: Inscription) {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { data: inscription, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.updateInscription(value, inscription.id).subscribe({
          next: () => {
            this.getAll();
            this.snackBar.open('Inscripción modificada con éxito.', 'Done');
          }
        });
      }
    })
  }

  // Elimina un alumno
  removeInscription(inscription: Inscription) {
    this.service.deleteInscriptionsById(inscription.id).subscribe({
      next: () => {
        this.getAll();
        this.snackBar.open('Inscripción eliminada con éxito.', 'Done');
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
