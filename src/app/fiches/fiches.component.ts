import { Component } from '@angular/core';
import { Fiche, FichesService } from '../shared/services/fiches.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';
import { ListsService } from '../shared/services/lists.service';

@Component({
  selector: 'app-fiches',
  templateUrl: './fiches.component.html',
  styleUrls: ['./fiches.component.scss'],
})
export class FichesComponent {
  categorieForm!: FormGroup;
  selectedSort = 'title-asc';
  sortField = 'title';
  sortOrder = 'asc';

  constructor(
    private fichesService: FichesService,
    private router: Router,
    private authService: AuthService,
    private modaleSarvice: ModalService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.fichesService.getFiches();
    this.categorieForm = new FormGroup({
      categorie: new FormControl('tous'),
      tri: new FormControl('title-asc')
    });
    this.categorieForm.get('categorie')?.valueChanges.subscribe((value) => {
      this.loadFiches(value);
    });
    this.categorieForm.get('tri')?.valueChanges.subscribe(selectedSort => {
      [this.sortField, this.sortOrder] = selectedSort.split('-');
    });
    this.listsService.getCurrentUserList();
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
      title: 'Ajouter une nouvelle fiche',
      variant: 'ajout-fiche',
    });
  }

  public manageList(ficheId: number) {
    this.modaleSarvice.openModal({
      title: 'Ajouter à une liste',
      variant: 'list-modal',
      context: {
        ficheId,
      },
    });
  }

  get fichesContent(): Fiche[] {
    return this.fichesService.fichesContent;
  }

  get allFavoriteId(): number[] {
    return this.listsService.currentUserLists.map((list) => list.items).flat();
  }
}
