import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ThemecolorDirective } from '../directive/themecolor.directive';
import { UtilisateursService } from '../shared/services/utilisateurs.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  @Input() selectedColor: string = '#9000ff';
  userId: number | undefined;

  navigation = [
    { path: '/profil', label: 'Mes Fiches' },
    { path: '/profil/listes', label: 'Mes Listes' },
  ];
  constructor(private router: Router, private themeDirective: ThemecolorDirective, private authService : AuthService, private utilisateursService: UtilisateursService) {}

  ngOnInit() {
    const currentUserId = this.authService.getSavedUser(); 
    
    if(currentUserId) {
      this.userId = parseInt(currentUserId, 10);
      this.utilisateursService.getUserTheme(this.userId).subscribe(theme => {
        this.selectedColor = theme; 
      })
    };
  }

  get url() {
    return this.router.routerState.snapshot.url;
  }
  
  changeTheme() {
    this.utilisateursService.updateUserTheme(this.userId!, this.selectedColor).subscribe(
      () => {
        console.log('Thème mis à jour');
      },
      error => {
        console.error('Erreur lors de la mise à jour du thème :', error);
      }
    );
  } 
}
