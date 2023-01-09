import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html'
})
export class CourseDetailsComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<CourseDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: Course | null) {
    
  }
  
  ngOnInit(): void {
  }

}
