import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as StudentsStoreActions from './students-store.actions';
import { StudentService } from 'src/app/services/student/student.service';


@Injectable()
export class StudentsStoreEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsStoreActions.LOAD_STUDENTS),
      concatMap(() =>
        this.studentService.getStudents().pipe(
          map(data => StudentsStoreActions.LOAD_STUDENTS_SUCCESS({ data })),
          catchError(error => of(StudentsStoreActions.LOAD_STUDENTS_FAILURE({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private studentService: StudentService) {}
}
