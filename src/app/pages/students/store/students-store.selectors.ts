import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudentsStore from './students-store.reducer';

export const selectStudentStoreState = createFeatureSelector<fromStudentsStore.State>(
  fromStudentsStore.studentsStoreFeatureKey
);
export const getStudentLoading = createSelector(selectStudentStoreState, state => state.isLoading)
