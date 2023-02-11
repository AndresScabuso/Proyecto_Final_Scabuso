import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import {  of } from 'rxjs';
import * as CoursesStoreActions from './courses-store.actions';
import { CoursesService } from 'src/app/services/courses/courses.service';


@Injectable()
export class CoursesStoreEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesStoreActions.LOAD_COURSES),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map(data => CoursesStoreActions.LOAD_COURSES_SUCCESS({ data })),
          catchError(error => of(CoursesStoreActions.LOAD_COURSES_FAILURE({ error }))))
      )
    );
  });

  constructor(private actions$: Actions, private coursesService: CoursesService) {}
}
