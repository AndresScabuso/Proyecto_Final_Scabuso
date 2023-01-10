import { Observable } from "rxjs";

export interface ICrudService<T> {
    add(item: T): void;
    update(item: T, id: number): void;
    delete(id: number): void;
}