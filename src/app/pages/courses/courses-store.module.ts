import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/courses-store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { coursesStoreFeatureKey } from './store/courses-store.reducer';
import { CoursesStoreEffects } from './store/courses-store.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(coursesStoreFeatureKey, reducer),
    EffectsModule.forFeature([CoursesStoreEffects])
  ]
})
export class CoursesStoreModule { }
