import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  dropdownOpen = false;

  constructor(
    private authService: AuthService,
    private modalService: ModalService
  ) {}

  logout() {
    this.authService.logout();
  }

  get isUserConnected() {
    return this.authService.isUserConnected();
  }

  get getUsername() {
    return this.authService.user?.username || '';
  }

  get isUserAdmin() {
    return this.authService.user?.statut === 'administrateur';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  ajouterUneFiche() {
    this.modalService.openModal({
      title: 'Ajouter une nouvelle fiche',
      variant: 'ajout-fiche',
    });
  }
  ajouterUnArticle() {
    this.modalService.openModal({
      title: 'Ajouter un article',
      variant: 'ajout-article',
    });
  }
}
