import { Observable } from "rxjs";

export interface ICrudService<T> {
    getAll(): Observable<T[]>;
    add(item: T): Observable<number>;
    update(item: T, id: number): Observable<string>;
    delete(id: number): Observable<string>;
}