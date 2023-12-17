import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article, ArticlesService } from '../shared/services/articles.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-ajoutarticle',
  templateUrl: './ajoutarticle.component.html',
  styleUrls: ['./ajoutarticle.component.scss']
})
export class AjoutarticleComponent {
  articleForm!: FormGroup;
  errorMessage: string = '';

  @Input() article?: Article;

  constructor(
    private articleService: ArticlesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article?.title, [
        // Validators.required,
        // lengthValidator(3, 100),
      ]),
      content: new FormControl(this.article?.content, [
        // Validators.required,
        // lengthValidator(1, 1500),
      ]),
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      if (this.article) {
        this.articleService.updateArticle({
          ...this.article,
          ...this.articleForm.value,
        });
      } else {
        this.articleService.addArticle(this.articleForm.value).subscribe(
          (response) => {},
          (error) => {
            this.errorMessage = error;
          }
        );
        this.articleService.getArticles();
      }
      this.resetForm();
      this.removeDomElement();
    }
  }

  private removeDomElement() {
    const appModal = this.document
      .querySelector('app-modal')
      ?.remove() as unknown as Element[];
    appModal?.forEach((appBar) => {
      const modalChild = appBar.querySelector('#modal-ajout-article');
      if (modalChild) {
        appBar.remove();
      }
    });
  }

  resetForm(): void {
    this.articleForm.reset();
  }
}
