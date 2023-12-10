import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

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

  getFichesByCategory(category: String) {
   this.http.get<any[]>(`http://localhost:3000/fiches`).pipe(
      map(fiches => fiches.filter(fiche => fiche.category === category))
    ).subscribe(fichesFiltrees => {
      this.fichesContent = fichesFiltrees;
    });  
  }

  addFiche(fiche: { title: string; image: string, category: string; duration: string; firstAired: string; genres: string; platforms: string; }) : Observable<any> {
    return this.http.post('http://localhost:3000/fiches', fiche);
  }

  addNote(note: Number, idFiche: Number, idUtilisateur: Number) : Observable<any> {
    return this.http.patch(`http://localhost:3000/fiches/${idFiche}`, {
      notes: [{ idUtilisateur: idUtilisateur, note: note }]
  });
  }
}
