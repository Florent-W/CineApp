import { Component, OnInit } from '@angular/core';
import { Fiche, FichesService } from '../shared/services/fiches.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-user-fiche',
  templateUrl: './user-fiche.component.html',
  styleUrls: ['./user-fiche.component.scss'],
})
export class UserFicheComponent implements OnInit {
  constructor(
    private fichesService: FichesService,
    private modal: ModalService
  ) {}

  ngOnInit(): void {
    this.fichesService.getCurrentUserFiche();
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
