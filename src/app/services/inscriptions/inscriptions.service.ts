import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { Inscription } from 'src/app/models/Inscription';
import { query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService{

  constructor(private firestore: Firestore) {}

  // Get all inscriptions
  getInscriptions(): Observable<Inscription[]>{
    const placeRef = collection(this.firestore, 'inscriptions');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Inscription[]>;
  }

  // Get inscription by id
  getInscriptionById(id: string) {
    const placeDocRef = doc(this.firestore, `inscriptions/${id}`);
    return docData(placeDocRef, { idField: 'id' }) as Observable<Inscription>;
  }

  // Get inscription by Course id
  getInscriptionByCourseId(id: string): Observable<Inscription[]> {
    const placeRef = collection(this.firestore, `inscriptions`);
    const q = query(placeRef, where("course", "==", id));

    return collectionData(q, { idField: 'Id' }) as Observable<Inscription[]>;
  }

  // Get inscription by Student id
  getInscriptionByStudentId(id: string): Observable<Inscription[]> {
    const placeRef = collection(this.firestore, `inscriptions`);
    const q = query(placeRef, where("student", "==", id));

    return collectionData(q, { idField: 'studentId' }) as Observable<Inscription[]>;
  }

  // Save new inscription
  saveInscription(inscription: Inscription) {
    const placeRef = collection(this.firestore, 'inscriptions');
    return addDoc(placeRef, inscription);
  }

  // Update existing inscription
  updateInscription(inscription: Inscription, id: string) {
    const placeDocRef = doc(this.firestore, `inscriptions/${id}`);
    return updateDoc(placeDocRef, {...inscription});
  }

  // Delete existing user
  deleteInscriptionsById(id: string) {
    const placeDocRef = doc(this.firestore, `inscriptions/${id}`);
    return deleteDoc(placeDocRef);
  }

  // checkExists(id: number, studentId: string, inscriptionId: string, newItem: boolean): boolean {
  //   let inscriptionsAux = this.inscriptionsData.getValue();
  //   if(newItem)
  //     inscriptionsAux = inscriptionsAux.filter(p => p.student.id == studentId && p.inscription.id == inscriptionId);
  //   else
  //     inscriptionsAux = inscriptionsAux.filter(p => p.student.id == studentId && p.inscription.id == inscriptionId && p.id != id);
  //   console.log(inscriptionsAux)
  //   return inscriptionsAux.length > 0;
  // }

}
