import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  playerName = '';
  contentSelected = '';
  navigation = [
    { path: '/', label: 'Tout' },
    { path: '/fiches', label: 'Fiches' },
    { path: '/articles', label: 'Articles' },
  ];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserConnected();
    console.log(this.url);

    this.playerName = this.authService.user?.username || '';
  }

  get url() {
    return this.router.routerState.snapshot.url;
  }
}
