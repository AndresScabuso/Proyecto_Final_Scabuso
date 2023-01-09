import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './shared/layout/toolbar/toolbar.component';
import { PageWrapperComponent } from './shared/layout/page-wrapper/page-wrapper.component';
import { StudentsModule } from './pages/students/students.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoursesModule } from './pages/courses/courses.module';


@NgModule({
    declarations: [
        AppComponent,
        ToolbarComponent,
        PageWrapperComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        StudentsModule,
        CoursesModule,
        NgbModule
    ]
})
export class AppModule { }
