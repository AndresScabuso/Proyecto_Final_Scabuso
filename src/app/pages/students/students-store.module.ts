import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer, studentsStoreFeatureKey } from './store/students-store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StudentsStoreEffects } from './store/students-store.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(studentsStoreFeatureKey, reducer),
    EffectsModule.forFeature([StudentsStoreEffects])
  ]
})
export class StudentsStoreModule { }
