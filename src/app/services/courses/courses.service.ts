import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Course } from 'src/app/models/course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService{

  constructor(private firestore: Firestore) {}

  // Get all courses
  getCourses(): Observable<Course[]>{
    const placeRef = collection(this.firestore, 'courses');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Course[]>;
  }

  // Get course by id
  getCourseById(id: string) {
    const placeDocRef = doc(this.firestore, `courses/${id}`);
    return docData(placeDocRef, { idField: 'id' }) as Observable<Course>;
  }

  // Save new course
  saveCourse(course: Course) {
    const placeRef = collection(this.firestore, 'courses');
    return addDoc(placeRef, course);
  }

  // Update existing course
  updateCourse(course: Course, id: string) {
    const placeDocRef = doc(this.firestore, `courses/${id}`);
    return updateDoc(placeDocRef, {...course});
  }

  // Delete existing user
  deleteCoursesById(id: string) {
    const placeDocRef = doc(this.firestore, `courses/${id}`);
    return deleteDoc(placeDocRef);
  }
}
