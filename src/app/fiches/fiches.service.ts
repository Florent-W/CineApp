import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Fiche } from "./fiches.component";

@Injectable({
  providedIn: "root",
})
export class FichesService {
  fichesContent: any[] = [];
  constructor(private http: HttpClient) {}

  getFiches() {
    this.http.get("http://localhost:3000/fiches").subscribe((fiches: any) => {
      this.fichesContent = fiches;
    });
  }

  addFiche(fiche: Fiche) {
    return this.http.post("http://localhost:3000/fiches", fiche).subscribe();
  }
}
