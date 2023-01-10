import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';
import { SharedModule } from '../shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    PageWrapperComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule
  ],
  exports: [
    ToolbarComponent,
    PageWrapperComponent
  ]
}) 
export class CoreModule { }
