import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Student } from 'src/app/models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private firestore: Firestore) {}

  // Get all students
  getStudents(): Observable<Student[]>{
    const placeRef = collection(this.firestore, 'students');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Student[]>;
  }

  // Get student by id
  getStudentById(id: string) {
    const placeDocRef = doc(this.firestore, `students/${id}`);
    return docData(placeDocRef, { idField: 'id' }) as Observable<Student>;
  }

  // Save new student
  saveStudent(student: Student) {
    const placeRef = collection(this.firestore, 'students');
    return addDoc(placeRef, student);
  }

  // Update existing student
  updateStudent(student: Student, id: string) {
    const placeDocRef = doc(this.firestore, `students/${id}`);
    return updateDoc(placeDocRef, {...student});
  }

  // Delete existing user
  deleteStudentsById(id: string) {
    const placeDocRef = doc(this.firestore, `students/${id}`);
    return deleteDoc(placeDocRef);
  }
}
