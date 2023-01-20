import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  displayedColumns = ['id', 'student', 'course', 'isActive'];

  constructor(private readonly dialogService: MatDialog, public service: InscriptionsService, private authService: AuthService) { 
    if(this.isAdmin()) {
      this.displayedColumns.push('edit');
      this.displayedColumns.push('delete');
    }  
  }

  ngOnInit(): void {
    this.service.getInscriptions().subscribe((inscriptions) => {
      this.inscriptions = inscriptions;
    });   
  }


  // Agrega un alumno
  addInscription() {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.saveInscription(value);
      }
    })
  }
  
  // Modifica un alumno
  editInscription(inscription: Inscription) {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { data: inscription, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.updateInscription(value, inscription.id);
      }
    })
  }

  // Elimina un alumno
  removeInscription(inscription: Inscription) {
    this.service.deleteInscriptionsById(inscription.id);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  // // Agrega una inscripcion
  // addInscription() {
  //   const dialog = this.dialogService.open(InscriptionDialogComponent, { width: '60%' });
  //   dialog.afterClosed().subscribe((value) => {
  //     if (value) {
  //       if(!this.checkExists(value, true))
  //         this.service.add(value);
  //       else
  //         alert("El alumno ya se encuentra inscripto al curso seleccionado"); // Implementar SnackBar de material!!!
  //     }
  //   })
  // }

  // // Modifica una inscripcion
  // editInscription(inscription: Inscription) {
  //   const dialog = this.dialogService.open(InscriptionDialogComponent, { data: inscription, width: '60%' });
  //   dialog.afterClosed().subscribe((value) => {
  //     if (value) {
  //       if(!this.checkExists(value, false))
  //         this.service.update(value, inscription.id);
  //       else
  //         alert("El alumno ya se encuentra inscripto al curso seleccionado"); // Implementar SnackBar de material!!!
  //     }
  //   })
  // }

  // // Elimina una inscripcion
  // removeInscription(inscription: Inscription) {
  //   this.service.delete(inscription.id);
  // }

  // checkExists(inscription: Inscription, newItem: boolean) {
  //   return this.service.checkExists(inscription.id, inscription.student.id, inscription.inscription.id, newItem);
  // }
}
