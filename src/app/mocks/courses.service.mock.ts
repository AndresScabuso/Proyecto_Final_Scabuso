import { BehaviorSubject, Observable, of } from "rxjs";
import { Course } from "../models/course";


export class CoursesServiceMock {

  public data$ : Observable<Course[]>;
  private data = new BehaviorSubject<Course[]>([]);

  constructor() { 
    this.data$ = this.data.asObservable();
    this.getAll().subscribe(alumnos => {
      this.data.next(alumnos);
    });
  }

  public getAll() : Observable<Course[]> {
    var listAux: Course[] = [
      {  
        id: '1',
        name: 'name1',
        description: 'description1',
        isActive: true
      }];

    return of(listAux);
  }

  public add(course : Course){
    let newlist = this.data.getValue();
    newlist.push(course);
    this.data.next(newlist);
  }

  public update(course : Course) {
    let newlist = this.data.getValue().map(p => p.id === course.id ? course : p);
    this.data.next(newlist);
  }
  
  public remove(id: string) {
    let newlist = this.data.getValue().filter( p => p.id !== id);
    this.data.next(newlist);
  }
}
