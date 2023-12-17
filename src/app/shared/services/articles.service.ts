import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export type Article = {
  id: number;
  title: string;
  content: string;
};

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

  addArticle(article: Article): Observable<any> {
    return this.http.post('http://localhost:3000/articles', { ...article });
  }

  updateArticle(article: Article) {
    return this.http
      .patch(`http://localhost:3000/fiches/${article.id}`, article)
      .subscribe();
  }
}
