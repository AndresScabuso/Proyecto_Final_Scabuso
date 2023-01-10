import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  public inscriptions$: Observable<Inscription[]>;

  // Columnas que se van a mostrar en la tabla
  displayedColumns = ['id', 'student', 'course', 'isActive', 'edit', 'delete'];

  constructor(private readonly dialogService: MatDialog, public service: InscriptionsService) { }

  ngOnInit(): void {
    this.inscriptions$ = this.service.inscriptionsData$;
  }

  // Agrega una inscripcion
  addInscription() {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.add(value);
      }
    })
  }

  // Modifica una inscripcion
  editInscription(inscription: Inscription) {
    const dialog = this.dialogService.open(InscriptionDialogComponent, { data: inscription, width: '60%' });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.service.update(value, inscription.id);
      }
    })
  }

  // Elimina una inscripcion
  removeInscription(inscription: Inscription) {
    console.log(inscription)
    this.service.delete(inscription.id);
  }
}
