import { Component } from '@angular/core';
import { Fiche, FichesService } from '../shared/services/fiches.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent {
  categorieForm!: FormGroup;

  constructor(
    private fichesService: FichesService,
    private router: Router,
    private authService: AuthService,
    private modaleSarvice: ModalService
  ) {}

  ngOnInit(): void {
    this.fichesService.getFiches();
    this.categorieForm = new FormGroup({
      categorie: new FormControl('tous'),
    });

    this.categorieForm.get('categorie')?.valueChanges.subscribe((value) => {
      this.loadFiches(value);
    });
  }

  openFiche(fichesId: number): void {
    this.router.navigate(['/fiches', fichesId]);
    console.log('Fiche ouverte :', fichesId);
  }

  loadFiches(category: string) {
    console.log(category);
    if (category === 'Série' || category === 'Film') {
      this.fichesService.getFichesByCategory(category);
    } else {
      this.fichesService.getFiches();
    }
  }

  isUserConnected() {
    return this.authService.isUserConnected();
  }

  ajouterUneFiche() {
    this.modaleSarvice.openModal({
      title: 'Titre',
      variant: 'ajout-fiche',
    });
  }

  get fichesContent(): Fiche[] {
    return this.fichesService.fichesContent;
  }
}
