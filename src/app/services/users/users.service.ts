import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.interface';
import { Firestore, collection, collectionData, updateDoc, docData } from '@angular/fire/firestore'
import { Observable } from 'rxjs';
import { addDoc, deleteDoc, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore) {}

  // Get all users
  getUsers(): Observable<User[]>{
    const placeRef = collection(this.firestore, 'users');
    return collectionData(placeRef, { idField: 'id' }) as Observable<User[]>;
  }

  // Get user by id
  getUserById(id: string) {
    const placeDocRef = doc(this.firestore, `users/${id}`);
    return docData(placeDocRef, { idField: 'id' }) as Observable<User>;
  }

  // Save new user
  saveUser(user: User) {
    const placeRef = collection(this.firestore, 'users');
    return addDoc(placeRef, user);
  }

  // Update existing user
  updateUser(user: User, id: string) {
    const placeDocRef = doc(this.firestore, `users/${id}`);
    return updateDoc(placeDocRef, {...user});
  }

  // Delete existing user
  deleteUserById(id: string) {
    const placeDocRef = doc(this.firestore, `users/${id}`);
    return deleteDoc(placeDocRef);
  }
}
