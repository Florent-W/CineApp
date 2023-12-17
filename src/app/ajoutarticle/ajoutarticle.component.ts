import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalService } from '../modal/modal.service';
import { Article, ArticlesService } from '../shared/services/articles.service';

@Component({
  selector: 'app-ajoutarticle',
  templateUrl: './ajoutarticle.component.html',
  styleUrls: ['./ajoutarticle.component.scss'],
})
export class AjoutarticleComponent {
  articleForm!: FormGroup;
  errorMessage: string = '';

  @Input() article?: Article;

  constructor(
    private articleService: ArticlesService,
    private modalService: ModalService
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
        this.articleService.addArticle(this.articleForm.value).subscribe();
      }
      this.resetForm();
      this.articleService.getCurrentUserarticle();
      this.articleService.getArticles();
      this.modalService.closeModal('modal-ajout-article');
    }
  }

  resetForm(): void {
    this.articleForm.reset();
  }
}
