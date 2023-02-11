import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCoursesStore from './courses-store.reducer';

export const selectCoursesStoreState = createFeatureSelector<fromCoursesStore.State>(
  fromCoursesStore.coursesStoreFeatureKey
);
export const getCoursesLoading = createSelector(selectCoursesStoreState, state => state.isLoading)
