import { Component, OnInit } from '@angular/core';
import { Fiche, FichesService } from '../shared/services/fiches.service';
import { ListsService } from '../shared/services/lists.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  constructor(
    private fichesService: FichesService,
    private listsService: ListsService
  ) {}

  ngOnInit(): void {
    this.fichesService.getFiches(); // Call getFiches() here
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
}
