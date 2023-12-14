import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { FichesComponent } from '../fiches/fiches.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  playerName = '';
  contentSelected = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
    this.showFiches();
  }

  showFiches(): void {
    this.contentSelected = 'fiches';
  }

  showArticles() : void {
    this.contentSelected = 'articles';
  }
}
