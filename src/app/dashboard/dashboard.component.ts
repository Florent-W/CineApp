import { Component } from '@angular/core';
import { UtilisateursService } from '../shared/services/utilisateurs.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  utilisateurs: any[] = [];

  constructor(private utilisateursService: UtilisateursService, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    if (!this.authService.isUserConnected() || this.authService.user?.statut !== 'administrateur') {
      this.router.navigate(['/']);
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    this.utilisateursService.getUsers().subscribe(
      (response) => {
        this.utilisateurs = response;
        console.log(this.utilisateurs);
      },
      (error) => {
        console.error('Erreur lors du chargement des utilisateurs:', error);
      }
    );
  }

  changeUserStatus(userId: number, nouveauStatut: string) {
    this.utilisateursService.changeStatutUserById(userId, nouveauStatut).subscribe(
      response => {
        console.log(`Statut de l'utilisateur changé à ${nouveauStatut}:`, response);
        this.loadUsers();
      },
      error => {
        console.error('Erreur pendant la mise à jour du statut:', error);
      }
    );
  }
}
