import { Action, createReducer, on } from '@ngrx/store';
import { Course } from 'src/app/models/course';
import * as CoursesStoreActions from './courses-store.actions';

export const coursesStoreFeatureKey = 'coursesStore';

export interface State {
  data: Course[],
  isLoading: boolean
}

export const initialState: State = {
  data: [],
  isLoading: true
};

export const reducer = createReducer(
  initialState,

  on(CoursesStoreActions.LOAD_COURSES, (state) => { return {...state, isLoading: true } }),
  on(CoursesStoreActions.LOAD_COURSES_SUCCESS, (state, action) => { return {...state, data: action.data, isLoading: false } }),
  on(CoursesStoreActions.LOAD_COURSES_FAILURE, (state, action) => { return {...state, data: action.error, isLoading: false } }),

);
