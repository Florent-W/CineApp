import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FichesService } from '../shared/services/fiches.service';
import { lengthValidator, minNumberValidator } from '../custom-validators';
import { DOCUMENT } from '@angular/common';

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

  constructor(
    private ficheService: FichesService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.ficheForm = new FormGroup({
      title: new FormControl(null, [
        // Validators.required,
        // lengthValidator(3, 100),
      ]), 
      synopsis: new FormControl(null, [
        // Validators.required,
        // lengthValidator(1, 1500),
      ]),
      trailerUrl: new FormControl(null, [
        // Validators.required,
        // lengthValidator(15, 100),
      ]),
      image: new FormControl(null, [
        // Validators.required,
        // lengthValidator(5, 1500),
      ]),
      category: new FormControl(null, [
        // Validators.required,
        // minNumberValidator(4),
      ]),
      duration: new FormControl(null, [
        // Validators.required,
        // minNumberValidator(5),
      ]),
      firstAired: new FormControl(null),
      genres: new FormControl(null),
      platforms: new FormControl(null),
    });
  }

  onSubmit(): void {
    if (this.ficheForm.valid) {
      this.ficheService.addFiche(this.ficheForm.value).subscribe(
        (response) => {
          this.resetForm();
        },
        (error) => {
          this.errorMessage = error;
        }
      );
      this.ficheService.getFiches();
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
