import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map, switchMap } from 'rxjs/operators';

export type Fiche = {
  id: number;
  title: string;
  category: string;
  duration: number;
  firstAired: string;
  genres: string[];
  platforms: string;
  image: string;
  userId: number;
  notes?: {
    idUtilisateur: number;
    note: number;
    commentaire: string;
  }[];
};

@Injectable({
  providedIn: 'root',
})
export class FichesService {
  fichesContent: Fiche[] = [];
  currentFiche: Fiche[] = [];

  constructor(private http: HttpClient) {}

  getFiches() {
    this.http.get('http://localhost:3000/fiches').subscribe((fiches: any) => {
      this.fichesContent = fiches;
    });
  }

  getFicheById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/fiches/${id}`);
  }

  getFichesByCategory(category: String) {
    this.http
      .get<any[]>(`http://localhost:3000/fiches`)
      .pipe(
        map((fiches) => fiches.filter((fiche) => fiche.category === category))
      )
      .subscribe((fichesFiltrees) => {
        this.fichesContent = fichesFiltrees;
      });
  }

  getNotesFiche(idFiche: number): Observable<any[]> {
    return forkJoin({
      fiche: this.getFicheById(idFiche),
      utilisateurs: this.getUsers(),
    }).pipe(
      map(({ fiche, utilisateurs }) => {

        const notes = fiche.notes || [];

        return notes.map((note: { idUtilisateur: any; }) => {
          const utilisateur = utilisateurs.find((utilisateur: { id: any; }) => utilisateur.id === note.idUtilisateur);
          return {
            ...note,
            pseudo: utilisateur ? utilisateur.username : 'Inconnu',
            imageProfil: utilisateur ? utilisateur.imageUrl : ''
          };
        });
      })
    );
  }

  getCurrentUserFiche(): void {
    const userId = localStorage.getItem('user');
    this.http
      .get<Fiche[]>(`http://localhost:3000/fiches?userId=${userId}`)
      .subscribe((fiches: any) => {
        this.currentFiche = fiches;
      });
  }

  private getUsers(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/users');
  }


  addFiche(fiche: { title: string; synopsis: string, trailerUrl: string, image: string, category: string; duration: string; firstAired: string; genres: string; platforms: string; }) : Observable<any> {
    return this.http.post('http://localhost:3000/fiches', fiche);
  }

  addNote(note: number, idFiche: number, idUtilisateur: number, commentaire: string) : Observable<any> {
    return this.getFicheById(idFiche).pipe(
      switchMap(fiche => {
        const notes = Array.isArray(fiche.notes) ? fiche.notes : [];
  
        const notesMisesAJour = [...notes, { idUtilisateur, note, commentaire }];
  
        return this.http.patch(`http://localhost:3000/fiches/${idFiche}`, {
          notes: notesMisesAJour
        });
      })
    );
  }  
}
