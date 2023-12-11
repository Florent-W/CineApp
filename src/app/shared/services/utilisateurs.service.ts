import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  utilisateursContent: any[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  changeStatutUserById(idUtilisateur: number, nouveauStatut: string): Observable<any> {
    const statutObjet = { statut: nouveauStatut}
    return this.http.patch(`http://localhost:3000/users/${idUtilisateur}`, statutObjet);
  }
}
