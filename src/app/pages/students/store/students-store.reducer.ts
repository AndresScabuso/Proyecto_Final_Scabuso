import { Action, createReducer, on } from '@ngrx/store';
import { Student } from 'src/app/models/student';
import * as StudentsStoreActions from './students-store.actions';

export const studentsStoreFeatureKey = 'studentsStore';

export interface State {
  data: Student[],
  isLoading: boolean
}

export const initialState: State = {
  data: [],
  isLoading: true
};

export const reducer = createReducer(
  initialState,

  on(StudentsStoreActions.LOAD_STUDENTS, (state) => { return {...state, isLoading: true } }),
  on(StudentsStoreActions.LOAD_STUDENTS_SUCCESS, (state, action) => { return {...state, data: action.data, isLoading: false } }),
  on(StudentsStoreActions.LOAD_STUDENTS_FAILURE, (state, action) => { return {...state, data: action.error, isLoading: false } }),

);
