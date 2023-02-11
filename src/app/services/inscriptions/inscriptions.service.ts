import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Inscription } from 'src/app/models/Inscription';

@Injectable({
  providedIn: 'root'
})
export class InscriptionsService{

  private baseUrl = 'https://63e6fa769f914b4689d20937.mockapi.io/api/scabuso';

  constructor(private http: HttpClient) {}

  // Get all inscriptions
  getInscriptions(): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(this.baseUrl + 'inscriptions');
  }

  // Get inscription by id
  getInscriptionById(id: string) {
    return this.http.get<Inscription>(this.baseUrl + '/inscriptions/:' + id);
  }

  // Get inscription by Course id
  getInscriptionByCourseId(id: string): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(this.baseUrl + 'inscriptions')
    .pipe(map((value : Inscription[]) => 
      value.filter(e => e.course.id == id)));
  }

  // Get inscription by Student id
  getInscriptionByStudentId(id: number): Observable<Inscription[]> {
    return this.http.get<Inscription[]>(this.baseUrl + 'inscriptions')
      .pipe(map((value : Inscription[]) => 
        value.filter(e => e.student.id == id)));
  }

  // Save new inscription
  saveInscription(inscription: Inscription) {
    return this.http.post<Inscription>(this.baseUrl + '/inscriptions/', inscription);
  }

  // Update existing inscription
  updateInscription(inscription: Inscription, id: number) {
    return this.http.put<Inscription>(this.baseUrl + '/inscriptions/' + id, inscription);
  }

  // Delete existing inscription
  deleteInscriptionsById(id: number) {
    return this.http.delete<Inscription>(this.baseUrl + '/inscriptions/' + id);
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
