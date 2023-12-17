import { Component, OnInit } from '@angular/core';
import { AuthService } from "../auth/auth.service";
import { UtilisateursService } from '../shared/services/utilisateurs.service';
import { ModalService } from '../modal/modal.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {
  dropdownOpen = false;
  theme: string = '';

  constructor(private authService: AuthService, private utilisateursService: UtilisateursService, private modalService: ModalService) {}

  ngOnInit(): void {
    this.fetchTheme();
  }

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

  get getTheme() {
    return this.theme;
  }

  fetchTheme() {
    const userId = parseInt(this.authService.getSavedUser()!, 10);
    this.utilisateursService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  changeTheme(newTheme: string) {
    const userId = parseInt(this.authService.getSavedUser()!, 10);

    // Mettez à jour le thème via le service de l'utilisateur
    this.utilisateursService.updateUserTheme(userId, newTheme).subscribe(
      () => {
        // Mettez à jour le thème localement après la mise à jour réussie
        this.theme = newTheme;
      },
      error => {
        console.error('Erreur lors de la mise à jour du thème :', error);
      }
    );
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
