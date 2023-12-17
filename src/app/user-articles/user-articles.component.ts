import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { Article, ArticlesService } from '../shared/services/articles.service';

@Component({
  selector: 'app-user-articles',
  templateUrl: './user-articles.component.html',
  styleUrls: ['./user-articles.component.scss'],
})
export class UserArticlesComponent implements OnInit {
  constructor(
    private articlesService: ArticlesService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.articlesService.getCurrentUserarticle();
  }

  get articles(): Article[] {
    return this.articlesService.currentArticles;
  }

  public deleteArticle(ficheId: number) {
    this.articlesService.deleteArticle(ficheId);
    this.articlesService.getCurrentUserarticle();
  }

  public updateFiche(article: Article) {
    this.modal.openModal({
      title: `Modifier la Fiche ${article.title}`,
      variant: 'ajout-article',
      context: { article },
    });
  }
}
