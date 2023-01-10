import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivoPipe } from './pipes/activo.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotImageDirective } from './directives/not-image.directive';
import { CabeceraDirective } from './directives/cabecera.directive';

@NgModule({
  declarations: [
    ActivoPipe,
    NotImageDirective,
    CabeceraDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    ActivoPipe,
    NotImageDirective,
    CabeceraDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
