import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

export type Article = {
  id: number;
  title: string;
  userId: number;
  content: string;
};

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  articlesContent: Article[] = [];
  currentArticles: Article[] = [];

  constructor(private http: HttpClient) {}

  getArticles() {
    this.http
      .get('http://localhost:3000/articles')
      .subscribe((articles: any) => {
        this.articlesContent = articles;
      });
  }

  getCurrentUserarticle(): void {
    const userId = localStorage.getItem('user');
    this.http
      .get<Article[]>(`http://localhost:3000/articles?userId=${userId}`)
      .subscribe((articles: any) => {
        console.log(articles);

        this.currentArticles = articles;
      });
  }

  getArticleById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/articles/${id}`);
  }

  addArticle(article: Article): Observable<any> {
    const userId = localStorage.getItem('user');

    return this.http.post('http://localhost:3000/articles', {
      ...article,
      userId,
    });
  }

  updateArticle(article: Article) {
    return this.http
      .patch(`http://localhost:3000/articles/${article.id}`, article)
      .subscribe();
  }

  deleteArticle(ficheId: number) {
    return this.http
      .delete(`http://localhost:3000/articles/${ficheId}`)
      .subscribe();
  }
}
