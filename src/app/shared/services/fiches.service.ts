import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FichesService {
  fichesContent: any[] = [];

  constructor(private http: HttpClient) { }

  getFiches() {
    this.http.get('http://localhost:3000/fiches').subscribe((fiches: any) => {
       this.fichesContent = fiches;
      }
    );
  }

  getFicheById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/fiches/${id}`);
  }

  addFiche(fiche: { title: string; image: string, category: string; duration: string; firstAired: string; genres: string; platforms: string; }) : Observable<any> {
    return this.http.post('http://localhost:3000/fiches', fiche);
  }
}
