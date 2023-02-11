import { createAction, props } from '@ngrx/store';
import { Student } from 'src/app/models/student';

export const LOAD_STUDENTS = createAction('[Student] Load Students');
export const LOAD_STUDENTS_SUCCESS = createAction('[Student] Load Students Success', props<{ data: Student[] }>());
export const LOAD_STUDENTS_FAILURE = createAction('[Student] Load Students Failure', props<{ error: any }>());