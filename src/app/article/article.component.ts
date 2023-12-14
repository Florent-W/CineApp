import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticlesService } from '../shared/services/articles.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent {
  article: any;

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const idArticle = +params['idArticle'];
      console.log(idArticle)
      if (idArticle) {
        this.articlesService.getArticleById(idArticle).subscribe(
          (article) => {
            this.article = article;
            console.log(this.article);
          },
          (error) => {
            console.error('Erreur sur la fiche :', error);
          }
        );
      }
    });
  }
}
