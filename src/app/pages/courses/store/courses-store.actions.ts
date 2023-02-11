import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/models/course';

export const LOAD_COURSES = createAction('[Course] Load Courses');
export const LOAD_COURSES_SUCCESS = createAction('[Course] Load Courses Success', props<{ data: Course[] }>());
export const LOAD_COURSES_FAILURE = createAction('[Course] Load Courses Failure', props<{ error: any }>());