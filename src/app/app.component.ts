import { Component } from '@angular/core';
import { UtilisateursService } from './shared/services/utilisateurs.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CinéApp';
  userId : number | undefined;

  currentTheme: string | undefined;

  constructor(private utilisateursService: UtilisateursService, private authService: AuthService) {}

  ngOnInit() {
    const currentUserId = this.authService.getSavedUser(); 
    
    if(currentUserId) {
      this.userId = parseInt(currentUserId, 10);
      this.utilisateursService.getUserTheme(this.userId).subscribe(theme => {
        this.currentTheme = theme;
      })
    };
  }
}
