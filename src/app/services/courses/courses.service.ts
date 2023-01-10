import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Course } from 'src/app/models/course';
import { ICrudService } from '../interfaces/ICrudService';

@Injectable({
  providedIn: 'root'
})
export class CoursesService implements ICrudService<Course>{

  public coursesData$: Observable<Course[]>;
  private coursesData = new BehaviorSubject<Course[]>([]);

  constructor() {
    this.coursesData$ = this.coursesData.asObservable();
    this.coursesData.next([
      new Course(1, 'Programacion I', 'Html, CSS, Javascript', true),
      new Course(2, 'Base de Datos I', 'Fundamentos de base de datos', true)
    ]);
  }

  add(item: Course): void {
    let coursesAux = this.coursesData.getValue();
    item.id = coursesAux[coursesAux.length - 1].id + 1;
    coursesAux.push(item);
    this.coursesData.next(coursesAux.sort(s => s.id));
  }

  update(item: Course, id: number) {
    let coursesAux = this.coursesData.getValue().filter(p => p.id !== id);
    item.id = id;
    coursesAux.push(item);
    this.coursesData.next(coursesAux);
  }
  delete(id: number): void {
    let coursesAux = this.coursesData.getValue().filter(p => p.id !== id);
    this.coursesData.next(coursesAux);
  }
}
