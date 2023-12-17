import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  navigation = [
    { path: '/profil', label: 'Mes Fiches' },
    { path: '/profil/listes', label: 'Mes Listes' },
    { path: '/profil/articles', label: 'Mes Articles' },
  ];
  constructor(private router: Router) {}

  get url() {
    return this.router.routerState.snapshot.url;
  }
}
