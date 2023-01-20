import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ToolbarComponent } from './layout/toolbar/toolbar.component';
import { PageWrapperComponent } from './layout/page-wrapper/page-wrapper.component';
import { PagesComponent } from './pages.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    PageWrapperComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
