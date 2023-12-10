import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

export type TGenres = {
  id: string;
  name: string;
};

@Injectable({
  providedIn: "root",
})
export class GenresService {
  genresContent: TGenres[] = [];
  constructor(private http: HttpClient) {}

  getGenres() {
    this.http
      .get("http://localhost:3000/genres")
      .subscribe((genres: TGenres[] | any) => {
        this.genresContent = genres;
      });
  }

  addFiche(genres: TGenres) {
    return this.http.post("http://localhost:3000/genres", genres).subscribe();
  }
}
