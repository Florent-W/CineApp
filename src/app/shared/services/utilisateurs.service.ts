import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  utilisateursContent: any[] = [];
  private themeSubject = new BehaviorSubject<string>('#0000ff');
  theme$ = this.themeSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }

  changeStatutUserById(idUtilisateur: number, nouveauStatut: string): Observable<any> {
    const statutObjet = { statut: nouveauStatut}
    return this.http.patch(`http://localhost:3000/users/${idUtilisateur}`, statutObjet);
  }

  getUserTheme(idUtilisateur: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/users/${idUtilisateur}`).pipe(
      map(user => user.theme),
      tap((theme: any) => this.themeSubject.next(theme))
    );
  }

  updateUserTheme(idUtilisateur: number, theme: string): Observable<any> {
    const themeObject = { theme: theme };
    return this.http
      .patch(`http://localhost:3000/users/${idUtilisateur}`, themeObject)
      .pipe(
        tap(() => {
          this.themeSubject.next(theme);
        })
      );
  }  
}