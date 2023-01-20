import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/core/models/user.interface';
import { Course } from 'src/app/models/course';
import { Inscription } from 'src/app/models/Inscription';
import { InscriptionsService } from 'src/app/services/inscriptions/inscriptions.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})

export class UserDetailsComponent implements OnInit {

  userId: string;

  constructor(private readonly dialogRef: MatDialogRef<UserDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: User) {
    this.userId = data.id
  }
  ngOnInit(): void {}
}
