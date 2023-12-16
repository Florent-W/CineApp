import { Component, OnInit } from '@angular/core';
import { Fiche, FichesService } from '../shared/services/fiches.service';
import { ListsService } from '../shared/services/lists.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  constructor(
    private fichesService: FichesService,
    private listsService: ListsService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.fichesService.getCurrentUserFiche();
    this.listsService.getCurrentUserList();
  }

  get lists(): any {
    const currentUserLists = this.listsService.currentUserLists;
    return currentUserLists;
  }

  get fiches(): Fiche[] {
    return this.fichesService.currentFiche;
  }

  public deleteFiche(ficheId: number) {
    this.fichesService.deleteFiche(ficheId);
    this.fichesService.getCurrentUserFiche();
  }

  public updateFiche(fiche: Fiche) {
    this.modal.openModal({
      title: `Modifier la Fiche ${fiche.title}`,
      variant: 'ajout-fiche',
      context: { fiche },
    });
  }
}
