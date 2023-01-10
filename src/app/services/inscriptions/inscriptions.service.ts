import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';
import { ICrudService } from '../interfaces/ICrudService';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService implements ICrudService<Inscription>{

  public inscriptionsData$: Observable<Inscription[]>;
  private inscriptionsData = new BehaviorSubject<Inscription[]>([]);

  constructor() {
    this.inscriptionsData$ = this.inscriptionsData.asObservable();
    this.inscriptionsData.next([])
  }

  add(item: Inscription): void {
    console.log(item)
    let inscriptionsAux = this.inscriptionsData.getValue();
    item.id = inscriptionsAux[inscriptionsAux.length - 1].id + 1;
    inscriptionsAux.push(item);
    this.inscriptionsData.next(inscriptionsAux.sort(s => s.id));
  }

  update(item: Inscription, id: number): void {
    let inscriptionsAux = this.inscriptionsData.getValue().filter(p => p.id == id);
    item.id = id;
    inscriptionsAux.push(item);
    this.inscriptionsData.next(inscriptionsAux);
  }

  delete(id: number): void {
    let inscriptionsAux = this.inscriptionsData.getValue().filter(p => p.id != id);
    this.inscriptionsData.next(inscriptionsAux);  
  }

  getByStudentId(id: number): Inscription[] {
    return this.inscriptionsData.getValue().filter(p => p.student.id == id); 
  }

  getByCourseId(id: number): Inscription[] {
    return this.inscriptionsData.getValue().filter(p => p.course.id == id);
  }

}
