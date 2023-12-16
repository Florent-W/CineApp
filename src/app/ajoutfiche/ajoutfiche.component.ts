import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Fiche, FichesService } from '../shared/services/fiches.service';

@Component({
  selector: 'app-ajoutfiche',
  templateUrl: './ajoutfiche.component.html',
  styleUrls: ['./ajoutfiche.component.scss'],
})
export class AjoutficheComponent {
  ficheForm!: FormGroup;
  errorMessage: string = '';
  genresContent: string[] = [
    'Action',
    'Comédie',
    'Drame',
    'Science-Fiction',
    'Romance',
    'Thriller',
    'Aventure',
    'Horreur',
    'Fantasy',
    'Mystère',
    'Animation',
    'Comédie romantique',
  ];
  @Input() fiche?: Fiche;

  constructor(
    private ficheService: FichesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.ficheForm = new FormGroup({
      title: new FormControl(this.fiche?.title, [
        // Validators.required,
        // lengthValidator(3, 100),
      ]),
      synopsis: new FormControl(this.fiche?.synopsis, [
        // Validators.required,
        // lengthValidator(1, 1500),
      ]),
      trailerUrl: new FormControl(this.fiche?.trailerUrl, [
        // Validators.required,
        // lengthValidator(15, 100),
      ]),
      image: new FormControl(this.fiche?.image, [
        // Validators.required,
        // lengthValidator(5, 1500),
      ]),
      category: new FormControl(this.fiche?.category, [
        // Validators.required,
        // minNumberValidator(4),
      ]),
      duration: new FormControl(this.fiche?.duration, [
        // Validators.required,
        // minNumberValidator(5),
      ]),
      firstAired: new FormControl(this.fiche?.firstAired),
      genres: new FormControl(this.fiche?.genres),
      platforms: new FormControl(this.fiche?.platforms),
    });
  }

  onSubmit(): void {
    if (this.ficheForm.valid) {
      if (this.fiche) {
        this.ficheService.updateFiche({
          ...this.fiche,
          ...this.ficheForm.value,
        });
        this.ficheService.getCurrentUserFiche();
      } else {
        this.ficheService.addFiche(this.ficheForm.value).subscribe(
          (response) => {},
          (error) => {
            this.errorMessage = error;
          }
        );
        this.ficheService.getFiches();
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
      const modalChild = appBar.querySelector('#modal-ajout-fiche');
      if (modalChild) {
        appBar.remove();
      }
    });
  }

  resetForm(): void {
    this.ficheForm.reset();
  }
}
