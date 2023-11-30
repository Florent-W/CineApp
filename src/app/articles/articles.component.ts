import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from "../shared/services/articles.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent {
  constructor(private articlesService: ArticlesService, private router: Router) { }

  ngOnInit(): void {
    this.articlesService.getArticles();
  }

  openArticle(articleId: number): void {
    this.router.navigate(['/articles', articleId]);
    console.log("Article ouvert :", articleId);
  }

  get articleContent(): any[] {
    return this.articlesService.articlesContent;
  }
}
