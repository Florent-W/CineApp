import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {

  utilisateursContent: any[] = [];

  constructor(private http: HttpClient) { }

  getUtilisateurs() {
    this.http.get('http://localhost:3000/users').subscribe((utilisateurs: any) => {
       this.utilisateursContent = utilisateurs;
      }
    );
  }
}
