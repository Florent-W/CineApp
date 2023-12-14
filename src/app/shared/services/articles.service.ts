import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  articlesContent: any[] = [];

  constructor(private http: HttpClient) { }

  getArticles() {
    this.http.get('http://localhost:3000/articles').subscribe((articles: any) => {
       this.articlesContent = articles;
      }
    );
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/articles/${id}`);
  }
}
